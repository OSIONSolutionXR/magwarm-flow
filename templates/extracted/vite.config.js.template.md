# Template: vite.config.js

## File Information
- **Source**: `vite.config.js`
- **Project**: magwarm-flow
- **Type**: Vite Configuration
- **Purpose**: Build tool configuration for React project

## Template Structure

```javascript
import { defineConfig } from 'vite'
import {{FRAMEWORK_PLUGIN}} from '{{PLUGIN_PACKAGE}}'

// https://vite.dev/config/
export default defineConfig({
  plugins: [{{FRAMEWORK_PLUGIN}}()],
})
```

## Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{FRAMEWORK_PLUGIN}}` | The framework plugin to use | `react` |
| `{{PLUGIN_PACKAGE}}` | Package name for the plugin | `@vitejs/plugin-react` |

## Usage Notes

- This is the minimal Vite configuration for a React application
- Additional plugins can be added to the `plugins` array
- For more configuration options, see: https://vite.dev/config/

## Original Implementation

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

## Extraction Metadata
- **Extracted**: 2026-04-11
- **Tool**: magwarm-template-extractor
