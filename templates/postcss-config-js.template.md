# PostCSS Configuration Template

## File: `postcss.config.js`

## Purpose
PostCSS configuration for processing Tailwind CSS and autoprefixer in a Vite-based React project.

## Template

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Explanation

| Plugin | Purpose |
|--------|---------|
| `tailwindcss` | Processes Tailwind directives and utility classes |
| `autoprefixer` | Adds vendor prefixes for browser compatibility |

## Context (MagWarm Flow)

- **Vite Project**: Used alongside `vite.config.js`
- **Tailwind Setup**: Works with `tailwind.config.js` and `src/index.css`
- **Standard Config**: Minimal, default PostCSS setup for Tailwind v3+

## Variations

### With Custom Tailwind Config Path
```javascript
export default {
  plugins: {
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: {},
  },
}
```

### With Additional Plugins
```javascript
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Related Files
- `tailwind.config.js` - Tailwind CSS configuration
- `src/index.css` - Main CSS file with Tailwind directives
- `vite.config.js` - Vite build configuration
