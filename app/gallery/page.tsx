'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, Heart, Share2, Eye, Upload, Sparkles, ImageIcon, Grid3X3, Grid2X2, X } from 'lucide-react'

interface GalleryImage {
  id: string
  original: string
  converted: string
  title: string
  createdAt: string
  likes: number
  views: number
  isLiked: boolean
}

// Demo data - in real app this would come from API
const demoImages: GalleryImage[] = [
  {
    id: '1',
    original: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    title: 'Mountain Landscape',
    createdAt: '2024-01-15',
    likes: 245,
    views: 1200,
    isLiked: false,
  },
  {
    id: '2',
    original: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    title: 'Portrait Study',
    createdAt: '2024-01-14',
    likes: 189,
    views: 890,
    isLiked: true,
  },
  {
    id: '3',
    original: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    title: 'Sunset Beach',
    createdAt: '2024-01-13',
    likes: 312,
    views: 1450,
    isLiked: false,
  },
  {
    id: '4',
    original: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    title: 'Forest Path',
    createdAt: '2024-01-12',
    likes: 167,
    views: 780,
    isLiked: false,
  },
  {
    id: '5',
    original: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    title: 'City Lights',
    createdAt: '2024-01-11',
    likes: 203,
    views: 950,
    isLiked: true,
  },
  {
    id: '6',
    original: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    converted: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    title: 'Ocean Waves',
    createdAt: '2024-01-10',
    likes: 278,
    views: 1100,
    isLiked: false,
  },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(demoImages)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [filter, setFilter] = useState<'all' | 'liked'>('all')

  const filteredImages = images.filter(image => 
    filter === 'all' || (filter === 'liked' && image.isLiked)
  )

  const toggleLike = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { 
            ...img, 
            isLiked: !img.isLiked,
            likes: img.isLiked ? img.likes - 1 : img.likes + 1
          }
        : img
    ))
  }

  const downloadImage = (url: string, title: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `oil-painting-${title.toLowerCase().replace(/\s+/g, '-')}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Oil Painting: ${image.title}`,
          text: 'Check out this beautiful oil painting created with AI!',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium mb-4">
            <ImageIcon className="h-4 w-4 mr-2" />
            Community Gallery
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Oil Painting Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover beautiful oil paintings created by our AI. Get inspired and create your own masterpiece.
          </p>
          
          <Link
            href="/upload"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Upload className="h-5 w-5 mr-2" />
            Create Your Own
          </Link>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-700 font-medium">View:</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'masonry'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Filter:</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                All Images
              </button>
              <button
                onClick={() => setFilter('liked')}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  filter === 'liked'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                Liked
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'liked' ? 'You haven\'t liked any images yet.' : 'No images in the gallery yet.'}
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload First Image
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-amber-200 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.converted}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <Eye className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => downloadImage(image.converted, image.title)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <Download className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {image.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {image.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className={`h-4 w-4 mr-1 ${image.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        {image.likes}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleLike(image.id)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        image.isLiked
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${image.isLiked ? 'fill-current' : ''}`} />
                      {image.isLiked ? 'Liked' : 'Like'}
                    </button>
                    <button
                      onClick={() => shareImage(image)}
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-amber-100 hover:text-amber-600 transition-all"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for full-size view */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Original Image */}
                <div className="relative aspect-square">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                    Original
                  </div>
                  <Image
                    src={selectedImage.original}
                    alt="Original"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Converted Image */}
                <div className="relative aspect-square">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-amber-500 text-white text-sm rounded-full">
                    Oil Painting
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <Image
                    src={selectedImage.converted}
                    alt="Oil Painting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
                    <p className="text-gray-600">Created on {new Date(selectedImage.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      <Eye className="h-5 w-5 mr-1" />
                      {selectedImage.views}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Heart className={`h-5 w-5 mr-1 ${selectedImage.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      {selectedImage.likes}
                    </div>
                    <button
                      onClick={() => downloadImage(selectedImage.converted, selectedImage.title)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}