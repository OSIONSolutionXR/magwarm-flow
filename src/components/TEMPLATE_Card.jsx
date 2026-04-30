/**
 * TEMPLATE: Card.jsx
 * 
 * Zweck: Wiederverwendbare Card-Komponente mit Content-Subkomponente
 * Struktur: Utility-Funktion + Hauptkomponente + Content-Komponente
 * 
 * PLATZHALTER:
 * - {{COMPONENT_NAME}}: Name der Hauptkomponente (z.B. "Card")
 * - {{SUB_COMPONENT_NAME}}: Name der Subkomponente (z.B. "CardContent")
 * - {{UTILITY_FN}}: Name der Utility-Funktion (z.B. "cn")
 * - {{STYLE_CLASSES}}: Tailwind CSS-Klassen für Styling
 * - {{CONTENT_CLASSES}}: Tailwind CSS-Klassen für Content-Bereich
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility-Funktion: Kombiniert Tailwind-Klassen mit twMerge
 * VERWENDUNG: Zusammenführen von Basis- und benutzerdefinierten Klassen
 * @param {...string} inputs - Beliebige Klassen-Strings
 * @returns {string} - Zusammengeführte und bereinigte Tailwind-Klassen
 */
export function {{UTILITY_FN}}(...inputs) {
  return twMerge(clsx(...inputs));
}

/**
 * Hauptkomponente: {{COMPONENT_NAME}}
 * Struktur: Container-Div mit kindern
 * Props:
 *   - children: React-Knoten (Inhalt)
 *   - className: Zusätzliche Tailwind-Klassen
 *   - ...props: Weitere HTML-Attribute
 * Styling: 
 *   - Abgerundete Ecken (rounded-[1.2rem])
 *   - Hintergrund mit Transparenz (bg-white/70)
 *   - Dark-Mode-Support (dark:bg-[...])
 *   - Backdrop-Blur für Glas-Effekt
 *   - Schatten (shadow-[...])
 *   - Border mit Transparenz
 */
export function {{COMPONENT_NAME}}({ children, className, ...props }) {
  return (
    <div
      className={{
        UTILITY_FN
      }}(
        '{{STYLE_CLASSES}}',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Subkomponente: {{SUB_COMPONENT_NAME}}
 * Zweck: Padding-Wrapper für Card-Inhalt
 * Props:
 *   - children: React-Knoten
 *   - className: Zusätzliche Tailwind-Klassen
 *   - ...props: Weitere HTML-Attribute
 */
export function {{SUB_COMPONENT_NAME}}({ children, className, ...props }) {
  return (
    <div className={{
      UTILITY_FN
    }}('{{CONTENT_CLASSES}}', className)} {...props}>
      {children}
    </div>
  );
}

/*
 * VERWENDUNGSBEISPIEL:
 * 
 * import { Card, CardContent } from './Card';
 * 
 * <Card className="max-w-md">
 *   <CardContent>
 *     <h2>Titel</h2>
 *     <p>Inhalt hier...</p>
 *   </CardContent>
 * </Card>
 */
