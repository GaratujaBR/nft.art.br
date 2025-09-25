# Atelier Digital - NFT Art Gallery

A contemporary digital art exhibition platform built with modern web technologies, featuring immersive gallery experiences and blockchain integration.

## 🎨 Features

- **Immersive Gallery Experience**: Full-screen artwork browsing with smooth animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern Architecture**: Built with Vite, ES6 modules, and component-based structure
- **Performance Optimized**: Lazy loading, efficient animations, and optimized assets
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support
- **Blockchain Integration**: Web3 wallet connectivity and NFT marketplace features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/atelier-digital/nft-gallery.git
cd nft-gallery

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
nft.art.br/
├── README.md                    # Project documentation
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Build tool configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── 
├── public/                      # Static assets served directly
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
│
├── src/                         # Source code
│   ├── index.html              # Main entry point
│   ├── pages/                  # HTML pages
│   │   ├── gallery.html
│   │   ├── artwork.html
│   │   └── about.html
│   ├── assets/                 # Media and static files
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   ├── styles/                 # CSS files
│   │   ├── main.css
│   │   ├── base/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── utilities/
│   ├── scripts/                # JavaScript files
│   │   ├── main.js
│   │   ├── components/
│   │   ├── utils/
│   │   └── modules/
│   └── data/                   # Static data files
│
├── docs/                       # Project documentation
│   ├── design.md
│   ├── interaction.md
│   └── deployment.md
│
└── dist/                       # Built files (generated)
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in the `src/` directory
3. **Test Changes**: Use browser dev tools and automated tests
4. **Build**: `npm run build` for production builds
5. **Deploy**: Use `npm run preview` to test production build locally

## 🎯 Architecture

### CSS Architecture

- **Modular CSS**: Component-based organization
- **Tailwind CSS**: Utility-first framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach

### JavaScript Architecture

- **ES6 Modules**: Modern module system
- **Component-Based**: Reusable JavaScript components
- **Event-Driven**: Centralized event management
- **Performance Optimized**: Lazy loading and code splitting

### Build System

- **Vite**: Fast build tool with HMR
- **PostCSS**: CSS processing and optimization
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## 🎨 Design System

### Colors

- **Deep Gray**: `#1a1a1a` - Primary background
- **Accent Blue**: `#4a90e2` - Primary accent
- **Accent Amber**: `#f5a623` - Secondary accent
- **Accent Violet**: `#9013fe` - Tertiary accent

### Typography

- **Primary**: Inter - Clean, modern sans-serif
- **Monospace**: JetBrains Mono - Technical content

### Components

- **Living Cards**: 3D hover effects
- **Glass Effect**: Backdrop blur with transparency
- **Gradient Text**: Multi-color gradient text effects

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.atelier.digital
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_ENVIRONMENT=development
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'deep-gray': '#1a1a1a',
        'accent-blue': '#4a90e2',
        // ... more colors
      }
    }
  }
}
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop `dist/` folder or connect repository
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Custom Server**: Upload `dist/` contents to web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anime.js](https://animejs.com/) - Animation library
- [p5.js](https://p5js.org/) - Creative coding library
- [ECharts](https://echarts.apache.org/) - Data visualization
- [Splide](https://splidejs.com/) - Slider library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/atelier-digital/nft-gallery/issues)
- **Email**: hello@atelier.digital
- **Discord**: [Join our community](https://discord.gg/atelier-digital)

---

Built with ❤️ by the Atelier Digital team