"""
Oil Painting Style Preset Manager for Stable Diffusion with A1111
Provides structured presets for converting photos to various oil painting styles
while preserving subject geometry.
"""

import json
from typing import Dict, Any, Optional, List
from dataclasses import dataclass
from enum import Enum

class OilPaintingStyle(Enum):
    """Available oil painting style presets"""
    CLASSICAL_RENAISSANCE = "classical_renaissance"
    BAROQUE_DRAMA = "baroque_drama"
    IMPRESSIONIST_LIGHT = "impressionist_light"
    POST_IMPRESSIONIST = "post_impressionist_expression"
    ROMANTIC_LANDSCAPE = "romantic_landscape"
    PORTRAIT_MASTER = "portrait_master"
    MODERN_ABSTRACT = "modern_abstract"
    PHOTOREALISTIC_OIL = "photorealistic_oil"

@dataclass
class ControlNetConfig:
    """ControlNet configuration for a style"""
    model: str
    weight: float
    guidance_start: float = 0.0
    guidance_end: float = 1.0

@dataclass
class StylePreset:
    """Complete configuration for an oil painting style"""
    name: str
    description: str
    positive_prompt: str
    negative_prompt: str
    cfg_scale: float
    denoising_strength: float
    steps: int
    sampler: str
    controlnet_config: Optional[ControlNetConfig] = None
    tips: List[str] = None

class OilPaintingPresetManager:
    """Manages oil painting style presets for SD img2img conversion"""
    
    def __init__(self, preset_file: str = "oil_painting_presets.json"):
        """Initialize the preset manager with a JSON preset file"""
        self.preset_file = preset_file
        self.presets = self._load_presets()
        self.global_settings = self.presets.get("global_settings", {})
        
    def _load_presets(self) -> Dict[str, Any]:
        """Load presets from JSON file"""
        try:
            with open(self.preset_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Preset file {self.preset_file} not found")
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in preset file: {e}")
    
    def get_style_preset(self, style: OilPaintingStyle) -> StylePreset:
        """Get a specific style preset"""
        style_key = style.value
        if style_key not in self.presets["presets"]:
            raise ValueError(f"Style {style_key} not found in presets")
        
        preset_data = self.presets["presets"][style_key]
        
        # Parse ControlNet settings if available
        controlnet_config = None
        if "controlnet_settings" in preset_data:
            cn_data = preset_data["controlnet_settings"]
            controlnet_config = ControlNetConfig(
                model=cn_data["recommended_model"],
                weight=cn_data["weight"],
                guidance_start=cn_data.get("guidance_start", 0.0),
                guidance_end=cn_data.get("guidance_end", 1.0)
            )
        
        return StylePreset(
            name=preset_data["name"],
            description=preset_data["description"],
            positive_prompt=preset_data["positive_prompt"],
            negative_prompt=preset_data["negative_prompt"],
            cfg_scale=preset_data["cfg_scale"],
            denoising_strength=preset_data["denoising_strength"],
            steps=preset_data["steps"],
            sampler=preset_data["sampler"],
            controlnet_config=controlnet_config,
            tips=preset_data.get("tips", [])
        )
    
    def build_prompt(self, 
                    style: OilPaintingStyle,
                    base_prompt: str = "",
                    preserve_subject: bool = True) -> Dict[str, str]:
        """
        Build complete positive and negative prompts for a style
        
        Args:
            style: The oil painting style to use
            base_prompt: User's base prompt describing the image
            preserve_subject: Whether to add subject preservation keywords
        
        Returns:
            Dictionary with 'positive' and 'negative' prompts
        """
        preset = self.get_style_preset(style)
        
        # Build positive prompt
        positive_parts = []
        if base_prompt:
            positive_parts.append(base_prompt)
        positive_parts.append(preset.positive_prompt)
        
        if preserve_subject:
            # Add subject preservation keywords based on global settings
            face_settings = self.global_settings.get("face_preservation", {})
            positive_parts.append("((preserve facial features:1.1))")
        
        # Build negative prompt
        negative_parts = [
            preset.negative_prompt,
            self.global_settings.get("universal_negative", "")
        ]
        
        return {
            "positive": ", ".join(filter(None, positive_parts)),
            "negative": ", ".join(filter(None, negative_parts))
        }
    
    def get_img2img_params(self, 
                          style: OilPaintingStyle,
                          preserve_level: str = "medium") -> Dict[str, Any]:
        """
        Get complete img2img parameters for a style
        
        Args:
            style: The oil painting style to use
            preserve_level: Subject preservation level ('low', 'medium', 'high')
        
        Returns:
            Dictionary of img2img parameters
        """
        preset = self.get_style_preset(style)
        
        # Adjust denoising based on preservation level
        denoising_adjustments = {
            "high": -0.15,  # Lower denoising for high preservation
            "medium": 0.0,   # Use preset default
            "low": 0.1       # Higher denoising for more artistic freedom
        }
        
        adjusted_denoising = max(0.2, min(0.8, 
            preset.denoising_strength + denoising_adjustments.get(preserve_level, 0.0)))
        
        params = {
            "denoising_strength": adjusted_denoising,
            "cfg_scale": preset.cfg_scale,
            "steps": preset.steps,
            "sampler_name": preset.sampler,
            "restore_faces": preserve_level in ["medium", "high"],
            "width": 512,  # Default, should be overridden with actual image dimensions
            "height": 512  # Default, should be overridden with actual image dimensions
        }
        
        # Add ControlNet parameters if available
        if preset.controlnet_config:
            params["controlnet_units"] = [{
                "model": preset.controlnet_config.model,
                "weight": preset.controlnet_config.weight,
                "guidance_start": preset.controlnet_config.guidance_start,
                "guidance_end": preset.controlnet_config.guidance_end,
                "control_mode": "Balanced",
                "pixel_perfect": True
            }]
        
        return params
    
    def get_style_recommendations(self, 
                                 subject_type: str) -> List[OilPaintingStyle]:
        """
        Get recommended styles based on subject type
        
        Args:
            subject_type: Type of subject ('portrait', 'landscape', 'pet', 'object', 'group')
        
        Returns:
            List of recommended style enums
        """
        recommendations = {
            "portrait": [
                OilPaintingStyle.PORTRAIT_MASTER,
                OilPaintingStyle.CLASSICAL_RENAISSANCE,
                OilPaintingStyle.BAROQUE_DRAMA
            ],
            "landscape": [
                OilPaintingStyle.ROMANTIC_LANDSCAPE,
                OilPaintingStyle.IMPRESSIONIST_LIGHT,
                OilPaintingStyle.POST_IMPRESSIONIST
            ],
            "pet": [
                OilPaintingStyle.PORTRAIT_MASTER,
                OilPaintingStyle.CLASSICAL_RENAISSANCE,
                OilPaintingStyle.PHOTOREALISTIC_OIL
            ],
            "object": [
                OilPaintingStyle.PHOTOREALISTIC_OIL,
                OilPaintingStyle.IMPRESSIONIST_LIGHT,
                OilPaintingStyle.MODERN_ABSTRACT
            ],
            "group": [
                OilPaintingStyle.CLASSICAL_RENAISSANCE,
                OilPaintingStyle.BAROQUE_DRAMA,
                OilPaintingStyle.IMPRESSIONIST_LIGHT
            ]
        }
        
        return recommendations.get(subject_type, list(OilPaintingStyle))
    
    def get_workflow_tips(self, experience_level: str = "beginner") -> Dict[str, Any]:
        """Get workflow recommendations based on experience level"""
        if "workflow_recommendations" in self.presets:
            return self.presets["workflow_recommendations"].get(
                experience_level, 
                self.presets["workflow_recommendations"]["beginner"]
            )
        return {}
    
    def list_all_styles(self) -> List[Dict[str, str]]:
        """List all available styles with names and descriptions"""
        styles = []
        for style in OilPaintingStyle:
            preset = self.get_style_preset(style)
            styles.append({
                "key": style.value,
                "name": preset.name,
                "description": preset.description
            })
        return styles


# Example usage and integration with A1111 API
class StableDiffusionOilPainter:
    """Integration class for using presets with SD WebUI API"""
    
    def __init__(self, api_url: str = "http://localhost:7860"):
        self.api_url = api_url
        self.preset_manager = OilPaintingPresetManager()
    
    def convert_to_oil_painting(self,
                               image_path: str,
                               style: OilPaintingStyle,
                               base_prompt: str = "",
                               preserve_level: str = "medium") -> Dict[str, Any]:
        """
        Convert an image to oil painting using specified style
        
        This is a template method - actual API integration would go here
        """
        # Get prompts
        prompts = self.preset_manager.build_prompt(style, base_prompt, True)
        
        # Get img2img parameters
        params = self.preset_manager.get_img2img_params(style, preserve_level)
        
        # Add prompts to parameters
        params["prompt"] = prompts["positive"]
        params["negative_prompt"] = prompts["negative"]
        
        # Here you would:
        # 1. Load and encode the image
        # 2. Send request to SD WebUI API
        # 3. Process and return the result
        
        return {
            "style_used": style.value,
            "parameters": params,
            "tips": self.preset_manager.get_style_preset(style).tips
        }


if __name__ == "__main__":
    # Example usage
    manager = OilPaintingPresetManager()
    
    # Get a specific style
    impressionist = manager.get_style_preset(OilPaintingStyle.IMPRESSIONIST_LIGHT)
    print(f"Style: {impressionist.name}")
    print(f"Description: {impressionist.description}")
    print(f"CFG Scale: {impressionist.cfg_scale}")
    print(f"Steps: {impressionist.steps}")
    
    # Build prompts for a portrait
    prompts = manager.build_prompt(
        OilPaintingStyle.PORTRAIT_MASTER,
        base_prompt="elegant woman in red dress",
        preserve_subject=True
    )
    print(f"\nPositive prompt: {prompts['positive'][:100]}...")
    
    # Get recommendations for a landscape photo
    landscape_styles = manager.get_style_recommendations("landscape")
    print(f"\nRecommended styles for landscape: {[s.value for s in landscape_styles]}")