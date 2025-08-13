'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Upload, X, Download, Loader2, ImageIcon, Sparkles, ArrowRight, Palette, Info, CheckCircle } from 'lucide-react'
import { oilPaintingStyles, type OilPaintingStyle } from '../lib/oilPaintingStyles'

interface ConvertedImage {
  original: string
  converted: string
  originalName: string
  style: OilPaintingStyle
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<OilPaintingStyle>(oilPaintingStyles[0])
  const [conversionProgress, setConversionProgress] = useState(0)
  const [triedStyles, setTriedStyles] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setConversionProgress(0)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const simulateProgress = () => {
    setConversionProgress(10)
    const interval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 1000)
    return interval
  }

  const convertImage = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    const progressInterval = simulateProgress()
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('style', selectedStyle.id)
      formData.append('cfg_scale', selectedStyle.cfg_scale.toString())
      formData.append('denoising_strength', selectedStyle.denoising_strength.toString())
      formData.append('steps', selectedStyle.steps.toString())

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setConversionProgress(100)

      if (response.ok) {
        const blob = await response.blob()
        const convertedUrl = URL.createObjectURL(blob)
        
        const newConvertedImage: ConvertedImage = {
          original: previewUrl!,
          converted: convertedUrl,
          originalName: selectedFile.name,
          style: selectedStyle
        }
        
        setConvertedImages(prev => [newConvertedImage, ...prev])
        setTriedStyles(prev => new Set([...prev, selectedStyle.id]))
        
        // Don't clear the selection - allow user to try another style
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Conversion failed:', errorData)
        
        let errorMessage = 'Conversion failed. Please try again.'
        if (errorData.message) {
          errorMessage = errorData.message
        }
        
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Error converting image:', error)
      alert('An error occurred during conversion. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setIsConverting(false)
      setConversionProgress(0)
    }
  }

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `oil-painting-${filename}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearSelection = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setConversionProgress(0)
    setTriedStyles(new Set())
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Oil Painting Converter
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Photos into Art
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from 8 masterful oil painting styles to transform your photos into museum-quality artwork
          </p>
        </div>

        {/* Style Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Palette className="h-6 w-6 mr-2 text-amber-500" />
            Choose Your Oil Painting Style
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {oilPaintingStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                  selectedStyle.id === style.id
                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                }`}
              >
                {selectedStyle.id === style.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                  </div>
                )}
                {triedStyles.has(style.id) && selectedStyle.id !== style.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
                <div className="text-3xl mb-2">{style.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{style.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{style.description}</p>
                {triedStyles.has(style.id) && (
                  <p className="text-xs text-green-600 mt-1 font-medium">Already tried</p>
                )}
              </button>
            ))}
          </div>

          {/* Style Details */}
          <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">{selectedStyle.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedStyle.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-white rounded-full">
                    Intensity: {(selectedStyle.denoising_strength * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs px-2 py-1 bg-white rounded-full">
                    Detail: {selectedStyle.steps} steps
                  </span>
                  <span className="text-xs px-2 py-1 bg-white rounded-full">
                    Style: {selectedStyle.cfg_scale.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {!selectedFile ? (
            <div
              className={`relative p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
                dragActive
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full w-fit mx-auto mb-6">
                  <Upload className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Drop your image here
                </h3>
                <p className="text-gray-500 mb-6 text-lg">
                  or click to browse your files
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-400 mt-4">
                  Supports: JPG, PNG, GIF, WebP (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="relative">
                {!isConverting && (
                  <button
                    onClick={clearSelection}
                    className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  )}
                  
                  {/* Progress Overlay */}
                  {isConverting && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
                        <div className="flex items-center justify-center mb-4">
                          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                          Creating Your Masterpiece
                        </h3>
                        <p className="text-sm text-gray-600 text-center mb-4">
                          Applying {selectedStyle.name} style...
                        </p>
                        <div className="relative bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500"
                            style={{ width: `${conversionProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          {conversionProgress.toFixed(0)}% Complete
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedFile.name}</h3>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedStyle.name} Style
                      </p>
                    </div>
                    {convertedImages.length > 0 && (
                      <button
                        onClick={clearSelection}
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                      >
                        Upload Different Image
                      </button>
                    )}
                  </div>
                  
                  {!isConverting && (
                    <div className="flex gap-3">
                      <button
                        onClick={convertImage}
                        disabled={isConverting}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        {convertedImages.length > 0 ? 'Try This Style' : 'Convert to Oil Painting'}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  )}
                  
                  {convertedImages.length > 0 && !isConverting && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Success! Select a different style above to create another version, or scroll down to see your gallery.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Converted Images Gallery */}
        {convertedImages.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Your Oil Painting Gallery
            </h2>
            
            {convertedImages.map((image, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{image.style.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{image.style.name} Style</h3>
                        <p className="text-sm text-gray-500">{image.originalName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadImage(image.converted, image.originalName)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-md"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Original */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Original Photo</h4>
                      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={image.original}
                          alt="Original"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Converted */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Oil Painting Result</h4>
                      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={image.converted}
                          alt="Converted Oil Painting"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips for Best Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="text-amber-500 mr-2">👤</span> 
                For Portraits
              </h4>
              <p className="text-sm">Use "Portrait Master" or "Classical Renaissance" styles for best facial preservation. These styles maintain details while adding artistic flair.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="text-amber-500 mr-2">🌄</span>
                For Landscapes
              </h4>
              <p className="text-sm">Try "Romantic Landscape" or "Impressionist Light" styles for stunning natural scenes with atmospheric effects.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="text-amber-500 mr-2">🐾</span>
                For Pets
              </h4>
              <p className="text-sm">"Classical Renaissance" or "Photorealistic Oil" work wonderfully for pet portraits, preserving their unique features.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <span className="text-amber-500 mr-2">🎨</span>
                For Artistic Effect
              </h4>
              <p className="text-sm">"Post-Impressionist" or "Modern Abstract" styles create bold, expressive artwork with dramatic transformations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}