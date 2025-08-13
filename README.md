# Oil Painting Converter

A beautiful Next.js application that transforms your photos into stunning oil painting masterpieces using AI technology via Automatic1111 (A1111).

## Features

- 🎨 Convert photos to oil paintings using AI
- 🖼️ Beautiful, modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Fast image processing
- 🖥️ Gallery to view converted images
- 💾 Download converted images
- 🔄 Real-time conversion status

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Backend**: Automatic1111 (Stable Diffusion WebUI)
- **Image Processing**: Canvas API, Base64 encoding

## Prerequisites

1. **Node.js**: Version 18 or higher
2. **Automatic1111**: Running Stable Diffusion WebUI with API enabled

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd /Users/Kailor/Desktop/Projects/pixcart_v2/oil-painting-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Automatic1111 Setup

For the image conversion to work, you need to have Automatic1111 running with API access:

1. **Install Automatic1111:**
   Follow the official installation guide at [https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

2. **Start with API enabled:**
   ```bash
   ./webui.sh --api --listen --cors-allow-origins="http://localhost:3000"
   ```

3. **Verify API access:**
   The API should be accessible at `http://localhost:7860`

## Pages

### Homepage (`/`)
- Hero section with call-to-action
- Features showcase
- Step-by-step process explanation

### Upload Page (`/upload`)
- Drag & drop image upload
- File validation and preview
- Real-time conversion with progress
- Before/after image comparison
- Download functionality

### Gallery Page (`/gallery`)
- Grid/masonry view options
- Like and share functionality
- Full-screen image preview
- Filter options (all/liked)

## API Endpoints

### POST `/api/convert`
Converts an uploaded image to oil painting style.

**Request:**
- Form data with `image` file

**Response:**
- Success: Returns converted image as JPEG
- Error: Returns JSON error message

**Features:**
- File validation (type, size)
- A1111 integration with img2img
- Fallback error handling
- Progress tracking

## Customization

### Oil Painting Style
Edit the prompt in `/app/api/convert/route.ts`:

```typescript
const OIL_PAINTING_PROMPT = `masterpiece oil painting, thick brush strokes, impasto technique, textured canvas, rich colors, classical painting style...`
```

### Color Scheme
The app uses an amber-orange gradient theme. Modify colors in:
- `tailwind.config.js` for global colors
- Component files for specific styling

### A1111 Configuration
Update the API settings in `/app/api/convert/route.ts`:

```typescript
const A1111_BASE_URL = 'http://localhost:7860'
const img2imgPayload = {
  steps: 20,
  cfg_scale: 7.5,
  denoising_strength: 0.75,
  // ... other parameters
}
```

## Deployment

### Build for production:
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for production:

```env
A1111_BASE_URL=http://your-a1111-server:7860
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Development

### Project Structure
```
app/
├── components/          # Shared React components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── Footer.tsx       # Site footer
│   └── LoadingSpinner.tsx # Loading component
├── upload/              # Upload page
├── gallery/             # Gallery page  
├── api/                 # API routes
│   └── convert/         # Image conversion endpoint
├── globals.css          # Global styles
└── layout.tsx           # Root layout

```

### Key Components

- **Navigation**: Responsive navbar with active states
- **Upload**: Drag & drop with preview and conversion
- **Gallery**: Grid layout with modal view
- **API**: A1111 integration with error handling

## Troubleshooting

### A1111 Connection Issues
- Ensure A1111 is running with `--api --listen` flags
- Check CORS settings if accessing from different domains
- Verify the API URL in the code matches your setup

### Image Upload Issues
- Check file size limits (max 10MB)
- Ensure supported formats: JPG, PNG, GIF, WebP
- Verify browser permissions for file access

### Performance Issues
- Images are processed on A1111 server
- Larger images take more time to process
- Consider resizing images for faster processing

## License

This project is for educational and personal use. Please respect the licenses of all dependencies and AI models used.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review A1111 documentation
3. Open an issue on the repository