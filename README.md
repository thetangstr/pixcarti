# 🎨 Oil Painting Converter - Transform Photos into Art

[![Deploy Beta](https://github.com/YOUR_USERNAME/oil-painting-app/actions/workflows/deploy-beta.yml/badge.svg)](https://github.com/YOUR_USERNAME/oil-painting-app/actions/workflows/deploy-beta.yml)
[![Deploy Production](https://github.com/YOUR_USERNAME/oil-painting-app/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/YOUR_USERNAME/oil-painting-app/actions/workflows/deploy-production.yml)

Transform your photos into stunning oil painting masterpieces using advanced AI technology. This web application leverages Stable Diffusion through Automatic1111 to create beautiful, artistic renditions of your images.

## ✨ Features

- **🎨 8 Professional Oil Painting Styles**
  - Classical Renaissance (Leonardo/Raphael style)
  - Baroque Drama (Caravaggio/Rembrandt style)
  - Impressionist Light (Monet/Renoir style)
  - Post-Impressionist Expression (Van Gogh style)
  - Romantic Landscape (Turner style)
  - Portrait Master (Sargent style)
  - Modern Abstract
  - Photorealistic Oil

- **🔐 Complete Authentication System**
  - Email/Password registration
  - Google OAuth integration
  - Facebook OAuth integration
  - Apple Sign In support
  - Secure session management

- **🚀 Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for beautiful styling
  - Prisma ORM for database
  - NextAuth for authentication
  - Firebase Hosting for deployment

- **📱 Responsive Design**
  - Mobile-first approach
  - Works on all devices
  - Touch-friendly interface

## 🖼️ Demo

[Live Demo](https://your-firebase-app.web.app) | [Beta Version](https://your-project--beta.web.app)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Automatic1111 WebUI (for local AI processing)
- PostgreSQL or SQLite database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/oil-painting-app.git
   cd oil-painting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Automatic1111** (for AI processing)
   ```bash
   cd stable-diffusion-webui
   ./webui.sh --api --listen --cors-allow-origins="http://localhost:3000"
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
APPLE_ID=your-apple-service-id
APPLE_SECRET=your-apple-private-key

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/oilpainting"

# A1111 API
A1111_BASE_URL=http://localhost:7860
```

### OAuth Setup

See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed OAuth configuration instructions.

## 📦 Project Structure

```
oil-painting-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   ├── upload/            # Upload page
│   └── gallery/           # Gallery page
├── prisma/                # Database schema
├── public/                # Static assets
├── .github/workflows/     # CI/CD pipelines
└── tests/                 # Test files
```

## 🚀 Deployment

### Automatic Deployment

The project includes GitHub Actions workflows for automatic deployment:

- **Push to `beta` branch** → Deploys to beta environment
- **Push to `main` branch** → Deploys to production
- **Pull Requests** → Creates preview deployments

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   npm run deploy:production
   ```

See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for complete deployment instructions.

## 🧪 Testing

Run tests with:

```bash
npm test                 # Run all tests
npm run test:unit       # Unit tests
npm run test:e2e        # E2E tests with Playwright
npm run lint            # Linting
npm run type-check      # TypeScript checking
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) for Stable Diffusion WebUI
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Firebase](https://firebase.google.com/) for hosting

## 📞 Support

For support, email support@yourdomain.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add more oil painting styles
- [ ] Implement batch processing
- [ ] Add image editing tools
- [ ] Create mobile app
- [ ] Add social sharing features
- [ ] Implement marketplace for prints
- [ ] Add AI style transfer training

## 📊 Status

- ✅ Core functionality complete
- ✅ Authentication system
- ✅ 8 painting styles
- ✅ CI/CD pipeline
- 🚧 OAuth provider setup needed
- 🚧 Production database configuration needed

---

Made with ❤️ using Next.js and AI