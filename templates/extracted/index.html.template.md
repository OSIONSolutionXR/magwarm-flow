# Template: index.html

**Source:** `index.html` (Root)
**Framework:** Vite + React
**Language:** German (de)

## Structure

```html
<!doctype html>
<html lang="[LANGUAGE]" class="[THEME]">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="[FAVICON_PATH]" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[APP_TITLE]</title>
  </head>
  <body>
    <div id="[ROOT_ELEMENT_ID]"></div>
    <script type="module" src="[MAIN_ENTRY]"></script>
  </body>
</html>
```

## Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `[LANGUAGE]` | HTML lang attribute | `de` |
| `[THEME]` | Theme class (dark/light) | `dark` |
| `[FAVICON_PATH]` | Path to favicon | `/favicon.svg` |
| `[APP_TITLE]` | Application title | `magwarm-flow` |
| `[ROOT_ELEMENT_ID]` | React root element ID | `root` |
| `[MAIN_ENTRY]` | Main JS entry point | `/src/main.jsx` |

## Notes

- Standard Vite + React setup
- Dark mode by default via class on html element
- SVG favicon for scalability