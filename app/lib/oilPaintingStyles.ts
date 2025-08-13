export interface OilPaintingStyle {
  id: string
  name: string
  description: string
  icon: string
  preview?: string
  positive_prompt: string
  negative_prompt: string
  cfg_scale: number
  denoising_strength: number
  steps: number
  sampler: string
}

export const oilPaintingStyles: OilPaintingStyle[] = [
  {
    id: 'classical_renaissance',
    name: 'Classical Renaissance',
    description: 'Leonardo da Vinci and Raphael style with refined techniques',
    icon: '🎨',
    positive_prompt: '((oil painting on canvas:1.3)), ((Renaissance masterpiece:1.2)), sfumato technique, chiaroscuro lighting, ((fine glazing layers:1.1)), smooth blending, idealized beauty, ((anatomically perfect:1.2)), golden ratio composition, ((subtle gradations:1.1)), luminous skin tones, ((egg tempera underpainting:0.8)), refined brushwork, ((classical portraiture:1.2)), museum quality, old master painting',
    negative_prompt: 'digital art, 3d render, photograph, anime, cartoon, ((rough brushstrokes)), ((impasto)), modern art, abstract, pixelated, low quality, blurry, ((harsh contrasts)), neon colors, oversaturated',
    cfg_scale: 7.5,
    denoising_strength: 0.45,
    steps: 30,
    sampler: 'DPM++ 2M Karras'
  },
  {
    id: 'baroque_drama',
    name: 'Baroque Drama',
    description: 'Caravaggio and Rembrandt style with dramatic lighting',
    icon: '🕯️',
    positive_prompt: '((oil on canvas:1.4)), ((Baroque masterpiece:1.3)), ((dramatic chiaroscuro:1.4)), tenebrism, ((deep shadows and bright highlights:1.3)), ((Rembrandt lighting:1.2)), emotional intensity, ((rich impasto:1.1)), golden brown palette, ((theatrical composition:1.2)), ((dramatic gestures:1.1)), old master technique, ((glazing and scumbling:1.1)), museum piece',
    negative_prompt: 'flat lighting, pastel colors, anime, digital art, 3d render, photograph, ((even illumination)), cartoon, low contrast, modern minimalist, watercolor, pencil drawing',
    cfg_scale: 8.0,
    denoising_strength: 0.5,
    steps: 35,
    sampler: 'DPM++ 2M Karras'
  },
  {
    id: 'impressionist_light',
    name: 'Impressionist Light',
    description: 'Monet and Renoir style with loose brushwork',
    icon: '🌻',
    positive_prompt: '((impressionist oil painting:1.4)), ((loose brushstrokes:1.3)), ((dappled light:1.2)), plein air painting, ((broken color technique:1.2)), ((visible canvas texture:1.1)), ((vibrant palette:1.2)), ((capturing fleeting moment:1.1)), alla prima technique, ((sun-drenched scene:1.2)), ((optical color mixing:1.1)), French impressionism, ((feathery brushwork:1.2))',
    negative_prompt: 'tight detail, photorealistic, smooth blending, digital art, 3d render, anime, ((hard edges)), ((precise lines)), monochrome, dark palette, gothic, harsh lighting',
    cfg_scale: 7.0,
    denoising_strength: 0.55,
    steps: 25,
    sampler: 'Euler a'
  },
  {
    id: 'post_impressionist',
    name: 'Post-Impressionist Expression',
    description: 'Van Gogh and Cézanne style with expressive strokes',
    icon: '🌌',
    positive_prompt: '((post-impressionist oil painting:1.4)), ((expressive brushstrokes:1.4)), ((Van Gogh style swirls:1.3)), ((bold impasto technique:1.3)), ((emotional color palette:1.2)), ((dynamic movement:1.2)), ((textured paint application:1.3)), ((passionate brushwork:1.2)), thick paint layers, ((vibrant complementary colors:1.2)), ((rhythmic patterns:1.1))',
    negative_prompt: 'photographic, smooth, flat, digital art, anime, 3d render, ((subdued colors)), minimal texture, precise details, watercolor, pencil sketch',
    cfg_scale: 8.5,
    denoising_strength: 0.6,
    steps: 40,
    sampler: 'DPM++ 2M Karras'
  },
  {
    id: 'romantic_landscape',
    name: 'Romantic Landscape',
    description: 'Turner and Constable style with atmospheric effects',
    icon: '🌅',
    positive_prompt: '((romantic landscape oil painting:1.3)), ((atmospheric perspective:1.3)), ((Turner-esque luminosity:1.2)), ((dramatic skies:1.3)), sublime nature, ((golden hour lighting:1.2)), ((misty atmosphere:1.1)), ((sweeping vistas:1.2)), emotional landscape, ((glowing light effects:1.2)), ((loose atmospheric brushwork:1.1)), masterful cloudscapes',
    negative_prompt: 'urban, industrial, modern architecture, digital art, anime, 3d render, hard edges, geometric shapes, neon colors, flat lighting',
    cfg_scale: 7.5,
    denoising_strength: 0.5,
    steps: 30,
    sampler: 'DPM++ SDE Karras'
  },
  {
    id: 'portrait_master',
    name: 'Portrait Master',
    description: 'John Singer Sargent style with confident brushwork',
    icon: '👤',
    positive_prompt: '((masterful portrait oil painting:1.4)), ((John Singer Sargent style:1.2)), ((confident brushstrokes:1.3)), ((alla prima technique:1.2)), ((brilliant highlights:1.2)), society portrait, ((elegant composition:1.1)), ((virtuoso paint handling:1.3)), ((fresh wet-on-wet:1.1)), ((sophisticated color harmony:1.2)), bravura brushwork',
    negative_prompt: 'amateur, hesitant strokes, muddy colors, overworked, digital art, 3d render, anime, cartoon, flat lighting, dull colors',
    cfg_scale: 7.0,
    denoising_strength: 0.4,
    steps: 30,
    sampler: 'DPM++ 2M Karras'
  },
  {
    id: 'modern_abstract',
    name: 'Modern Abstract',
    description: 'Abstract expressionist style in oil',
    icon: '🎭',
    positive_prompt: '((abstract oil painting:1.4)), ((bold gestural strokes:1.3)), ((color field painting:1.2)), ((emotional expression:1.3)), ((layered paint application:1.2)), non-representational, ((dynamic composition:1.2)), ((spontaneous mark-making:1.3)), ((rich texture:1.2)), contemporary oil technique',
    negative_prompt: 'photorealistic, detailed, representational, traditional, digital art, 3d render, precise, geometric, symmetrical',
    cfg_scale: 9.0,
    denoising_strength: 0.7,
    steps: 35,
    sampler: 'Euler a'
  },
  {
    id: 'photorealistic_oil',
    name: 'Photorealistic Oil',
    description: 'Chuck Close style hyperdetailed oil painting',
    icon: '🔍',
    positive_prompt: '((photorealistic oil painting:1.5)), ((hyperdetailed brushwork:1.4)), ((Chuck Close technique:1.2)), meticulous detail, ((smooth oil blending:1.3)), ((precise color matching:1.3)), ((invisible brushstrokes:1.2)), ((layered glazing:1.1)), museum quality, ((extreme realism:1.4))',
    negative_prompt: 'loose brushwork, impressionistic, abstract, rough texture, visible strokes, sketch, watercolor, digital artifacts',
    cfg_scale: 6.5,
    denoising_strength: 0.35,
    steps: 50,
    sampler: 'DPM++ 2M Karras'
  }
]

export function getStyleById(id: string): OilPaintingStyle | undefined {
  return oilPaintingStyles.find(style => style.id === id)
}

export function getDefaultStyle(): OilPaintingStyle {
  return oilPaintingStyles[0]
}