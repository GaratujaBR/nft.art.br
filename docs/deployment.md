# Deployment Guide

## Overview
This guide covers deployment options and configurations for Atelier Digital.

## Build Process

### Production Build
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build process will:
- Compile and optimize all assets
- Generate minified CSS and JavaScript
- Optimize images and fonts
- Create a `dist/` directory with production files

## Deployment Options

### 1. Vercel (Recommended)

#### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Environment Variables
Set these in Vercel dashboard:
```
VITE_ENVIRONMENT=production
VITE_API_URL=https://api.atelier.digital
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### 2. Netlify

#### Automatic Deployment
1. Connect repository to Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Redirects Configuration
Create `public/_redirects`:
```
# SPA fallback
/*    /index.html   200

# API proxy
/api/*  https://api.atelier.digital/:splat  200
```

### 3. GitHub Pages

#### Setup GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Custom Server

#### Requirements
- Node.js 18+
- Web server (Nginx, Apache, etc.)
- SSL certificate

#### Build and Upload
```bash
# Build locally
npm run build

# Upload dist/ contents to server
rsync -avz dist/ user@server:/var/www/atelier/
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name atelier.digital;
    
    root /var/www/atelier;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

## Environment Configuration

### Production Environment Variables
```env
VITE_ENVIRONMENT=production
VITE_API_URL=https://api.atelier.digital
VITE_WALLET_CONNECT_PROJECT_ID=production_project_id
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_ENABLE_ANALYTICS=true
```

### Staging Environment Variables
```env
VITE_ENVIRONMENT=staging
VITE_API_URL=https://staging-api.atelier.digital
VITE_WALLET_CONNECT_PROJECT_ID=staging_project_id
VITE_DEBUG_MODE=true
```

## Performance Optimization

### Build Optimizations
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image compression and format conversion
- **Bundle Analysis**: Use `npm run build -- --analyze`

### CDN Configuration
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
});
```

### Caching Strategy
- **Static Assets**: 1 year cache with hash-based filenames
- **HTML**: No cache or short cache (5 minutes)
- **API Responses**: Appropriate cache headers based on content

## Monitoring and Analytics

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Error Tracking**: Implement error reporting
- **User Analytics**: Track user interactions and flows

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

## Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://api.atelier.digital;">
```

### HTTPS Configuration
- Force HTTPS redirects
- Use HSTS headers
- Implement proper SSL certificate

## Rollback Strategy

### Version Management
- Tag releases in Git
- Keep previous build artifacts
- Implement blue-green deployment for zero downtime

### Quick Rollback
```bash
# Rollback to previous version
git checkout v1.0.0
npm run build
# Deploy previous build
```

## Troubleshooting

### Common Issues
1. **Build Failures**: Check Node.js version and dependencies
2. **Asset Loading**: Verify base URL configuration
3. **API Connectivity**: Check CORS and environment variables
4. **Performance**: Analyze bundle size and optimize imports

### Debug Mode
Enable debug mode for troubleshooting:
```env
VITE_DEBUG_MODE=true
```

This will enable:
- Detailed error messages
- Performance metrics
- Development tools in production