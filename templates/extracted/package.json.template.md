# Template: package.json

## File Info
- **Source:** `package.json`
- **Type:** Node.js Project Configuration
- **Framework:** React + Vite + TailwindCSS

## Template Content

```json
{
  "name": "{{PROJECT_NAME}}",
  "private": true,
  "version": "{{VERSION}}",
  "type": "module",
  "scripts": {
    "dev": "{{DEV_SERVER}}",
    "build": "{{BUILD_COMMAND}}",
    "preview": "{{PREVIEW_COMMAND}}"
  },
  "dependencies": {
    "clsx": "^{{CLSX_VERSION}}",
    "framer-motion": "^{{FRAMER_MOTION_VERSION}}",
    "lucide-react": "^{{LUCIDE_VERSION}}",
    "react": "^{{REACT_VERSION}}",
    "react-dom": "^{{REACT_DOM_VERSION}}",
    "react-router-dom": "^{{ROUTER_VERSION}}",
    "tailwind-merge": "^{{TAILWIND_MERGE_VERSION}}"
  },
  "devDependencies": {
    "@types/react": "^{{TYPES_REACT_VERSION}}",
    "@types/react-dom": "^{{TYPES_REACT_DOM_VERSION}}",
    "@vitejs/plugin-react": "^{{VITE_PLUGIN_VERSION}}",
    "autoprefixer": "^{{AUTOPREFIXER_VERSION}}",
    "postcss": "^{{POSTCSS_VERSION}}",
    "tailwindcss": "^{{TAILWIND_VERSION}}",
    "tailwindcss-animate": "^{{TAILWIND_ANIMATE_VERSION}}",
    "vite": "^{{VITE_VERSION}}"
  }
}
```

## Variable Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PROJECT_NAME` | Project name (kebab-case) | `magwarm-flow` |
| `VERSION` | Initial version | `0.0.0` |
| `DEV_SERVER` | Development server command | `vite` |
| `BUILD_COMMAND` | Production build command | `vite build` |
| `PREVIEW_COMMAND` | Preview build command | `vite preview` |
| `CLSX_VERSION` | clsx utility version | `2.1.1` |
| `FRAMER_MOTION_VERSION` | Framer Motion version | `11.15.0` |
| `LUCIDE_VERSION` | Lucide React icons version | `0.469.0` |
| `REACT_VERSION` | React version | `18.3.1` |
| `REACT_DOM_VERSION` | React DOM version | `18.3.1` |
| `ROUTER_VERSION` | React Router version | `7.13.0` |
| `TAILWIND_MERGE_VERSION` | tailwind-merge version | `2.6.0` |
| `TYPES_REACT_VERSION` | React types version | `18.3.18` |
| `TYPES_REACT_DOM_VERSION` | React DOM types version | `18.3.5` |
| `VITE_PLUGIN_VERSION` | Vite React plugin version | `5.1.4` |
| `AUTOPREFIXER_VERSION` | Autoprefixer version | `10.4.20` |
| `POSTCSS_VERSION` | PostCSS version | `8.4.49` |
| `TAILWIND_VERSION` | Tailwind CSS version | `3.4.17` |
| `TAILWIND_ANIMATE_VERSION` | tailwindcss-animate version | `1.0.7` |
| `VITE_VERSION` | Vite version | `7.3.1` |

## Key Dependencies Explained

### Animation & Effects
- **framer-motion**: React animation library for smooth transitions
- **tailwindcss-animate**: CSS animation utilities for Tailwind

### Icons & UI
- **lucide-react**: Modern icon library
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes without conflicts

### Routing
- **react-router-dom**: Client-side routing for React

## Notes
- Uses `"type": "module"` for ES modules
- ESM-first configuration (no CommonJS)
- Optimized for React + Vite + TailwindCSS stack
