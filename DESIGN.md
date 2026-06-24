# Design Specification: Image Watermark Tool

## 1. Visual Theme & Atmosphere

**Design Philosophy**: Professional, trustworthy, and efficient. A tool that respects user privacy and delivers results without distraction.

**Atmosphere Keywords**: Clean, Modern, Focused, Reliable, Minimal

**One-line Tone**: A professional workspace for image watermarking that feels both capable and approachable.

---

## 2. Color Palette & Roles

```css
:root {
  /* Neutral Base - Light Mode */
  --color-background: #F7F5F1;
  --color-background-rgb: 247, 245, 241;
  --color-surface: #FFFFFF;
  --color-surface-rgb: 255, 255, 255;
  --color-border: #E7E3DA;
  --color-border-rgb: 231, 227, 218;
  
  /* Text */
  --color-text-primary: #1E2227;
  --color-text-primary-rgb: 30, 34, 39;
  --color-text-secondary: #6B7077;
  --color-text-secondary-rgb: 107, 112, 119;
  
  /* Accent - Muted Slate Blue */
  --color-accent: #3C5A78;
  --color-accent-rgb: 60, 90, 120;
  --color-accent-hover: #2E4760;
  --color-accent-hover-rgb: 46, 71, 96;
  
  /* Functional */
  --color-success: #2D7A4F;
  --color-success-rgb: 45, 122, 79;
  --color-error: #C84030;
  --color-error-rgb: 200, 64, 48;
  --color-warning: #D97706;
  --color-warning-rgb: 217, 119, 6;
}

[data-theme="dark"] {
  /* Neutral Base - Dark Mode */
  --color-background: #1A1D21;
  --color-background-rgb: 26, 29, 33;
  --color-surface: #242830;
  --color-surface-rgb: 36, 40, 48;
  --color-border: #363A42;
  --color-border-rgb: 54, 58, 66;
  
  /* Text */
  --color-text-primary: #E8E6E3;
  --color-text-primary-rgb: 232, 230, 227;
  --color-text-secondary: #9BA1A6;
  --color-text-secondary-rgb: 155, 161, 166;
  
  /* Accent - Brightened for dark mode */
  --color-accent: #5B7FA1;
  --color-accent-rgb: 91, 127, 161;
  --color-accent-hover: #4A6A8A;
  --color-accent-hover-rgb: 74, 106, 138;
  
  /* Functional */
  --color-success: #3BA565;
  --color-success-rgb: 59, 165, 101;
  --color-error: #E74C3C;
  --color-error-rgb: 231, 76, 60;
  --color-warning: #F59E0B;
  --color-warning-rgb: 245, 158, 11;
}
```

---

## 3. Typography Rules

**Font Families**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
}
```

**Type Scale**:
| Level | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| Display | 2.25rem (36px) | 700 | 1.2 | Page title |
| H1 | 1.875rem (30px) | 600 | 1.3 | Section headers |
| H2 | 1.5rem (24px) | 600 | 1.4 | Subsections |
| H3 | 1.25rem (20px) | 600 | 1.4 | Card titles |
| Body Large | 1rem (16px) | 500 | 1.6 | Primary content |
| Body | 0.9375rem (15px) | 400 | 1.6 | Standard text |
| Small | 0.875rem (14px) | 400 | 1.5 | Captions, labels |
| Tiny | 0.8125rem (13px) | 400 | 1.4 | Fine print |

**Rules**:
- All body text uses Inter 400 or 500
- Headings use Inter 600 or 700
- Letter spacing: -0.01em for sizes ≥ 24px
- Use tabular numbers for data: `font-variant-numeric: tabular-nums`

**Forbidden**:
- Do not use font weights below 400
- Do not use italic for UI text (only for placeholder or helper text)
- Do not use all-caps for body text

---

## 4. Component Stylings

### Button - Primary
```css
.btn-primary {
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: #FFFFFF;
  background: var(--color-accent);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: 0 4px 8px rgba(var(--color-accent-rgb), 0.2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### Button - Secondary
```css
.btn-secondary {
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-surface);
  border-color: var(--color-text-secondary);
}

.btn-secondary:active {
  background: rgba(var(--color-border-rgb), 0.5);
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Input Fields
```css
.input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  font-family: var(--font-sans);
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.input:hover {
  border-color: var(--color-text-secondary);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.1);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(var(--color-border-rgb), 0.3);
}

.input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}
```

### Card
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.card-interactive:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}
```

### Slider (Range Input)
```css
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  outline: none;
  transition: background 0.2s ease;
}

.slider:hover {
  background: rgba(var(--color-border-rgb), 1.2);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--color-accent);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-thumb:hover {
  background: var(--color-accent-hover);
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(var(--color-accent-rgb), 0.3);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: var(--color-accent);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb:hover {
  background: var(--color-accent-hover);
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(var(--color-accent-rgb), 0.3);
}

.slider:focus::-webkit-slider-thumb {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.slider:focus::-moz-range-thumb {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Toggle Switch
```css
.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-border);
  border-radius: 24px;
  transition: all 0.3s ease;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.toggle input:checked + .toggle-slider {
  background: var(--color-accent);
}

.toggle input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

.toggle input:focus + .toggle-slider {
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.2);
}

.toggle:hover .toggle-slider {
  opacity: 0.9;
}
```

---

## 5. Layout Principles

**Grid System**:
- Base unit: 8px (0.5rem)
- Container max-width: 1200px
- Gutter: 24px (1.5rem)

**Spacing Scale**:
| Name | Value | Use |
|------|-------|-----|
| xs | 0.25rem (4px) | Tight spacing |
| sm | 0.5rem (8px) | Close elements |
| md | 1rem (16px) | Standard gap |
| lg | 1.5rem (24px) | Section spacing |
| xl | 2rem (32px) | Major sections |
| 2xl | 3rem (48px) | Page sections |
| 3xl | 4rem (64px) | Hero spacing |

**Breakpoints**:
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**Container**:
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}
```

---

## 6. Depth & Elevation

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12);
}

[data-theme="dark"] {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.6);
}
```

**Elevation Levels**:
- Level 0 (base): No shadow
- Level 1 (sm): Subtle cards, inputs
- Level 2 (md): Hover states, dropdowns
- Level 3 (lg): Modals, popovers
- Level 4 (xl): Overlays, toasts

---

## 7. Animation & Interaction

**Interaction Level**: L1 (Elegant Static)

**Timing Functions**:
```css
:root {
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Duration Scale**:
- Fast: 150ms (hover feedback)
- Normal: 200ms (standard transitions)
- Slow: 300ms (page transitions)
- Slower: 500ms (entrance animations)

### Entrance Animations
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s var(--ease-out) forwards;
}

.fade-in-delay-1 {
  animation-delay: 0.1s;
  opacity: 0;
}

.fade-in-delay-2 {
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-in-delay-3 {
  animation-delay: 0.3s;
  opacity: 0;
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale {
  transition: transform 0.2s var(--ease-spring);
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

### Loading Spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Do's and Don'ts

### Do's ✓
1. **Use consistent spacing** - Stick to the 8px spacing scale
2. **Provide clear visual feedback** - Every interaction should have a visible response
3. **Show loading states** - Use spinners or progress indicators during processing
4. **Maintain high contrast** - Text should always be readable in both themes
5. **Use semantic HTML** - Proper elements for accessibility

### Don'ts ✗
1. **Never use pure black (#000000)** - Use --color-text-primary instead
2. **Avoid mixing border styles** - Stick to the defined border radius (0.5rem or 0.75rem)
3. **Don't hard-code colors** - Always use CSS variables
4. **Never skip focus states** - All interactive elements must show focus
5. **Don't use more than 3 font weights** - Stick to 400, 500, 600, 700
6. **Avoid aggressive animations** - Keep transitions subtle and purposeful
7. **Don't use icon-only buttons without labels** - Always provide text or aria-label
8. **Never exceed 2 accent colors** - This design uses one primary accent
9. **Don't create new spacing values** - Use the defined spacing scale
10. **Avoid complex nested shadows** - Use defined elevation levels only

---

## 9. Responsive Behavior

### Breakpoint Strategy
- **Mobile (< 640px)**: Single column, full-width controls, simplified canvas
- **Tablet (640px - 1023px)**: Two-column layout where appropriate
- **Desktop (≥ 1024px)**: Full layout with sidebars and toolbars

### Touch Targets
- Minimum size: 44×44px for all interactive elements
- Adequate spacing between touch targets (min 8px)

### Mobile Adaptations
```css
/* Stack controls vertically on mobile */
@media (max-width: 639px) {
  .controls-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .btn {
    width: 100%;
  }
  
  /* Larger touch targets */
  .slider {
    height: 8px;
  }
  
  .slider::-webkit-slider-thumb {
    width: 24px;
    height: 24px;
  }
  
  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
  }
}
```

### Image Upload Area
```css
.upload-area {
  min-height: 200px;
  border: 2px dashed var(--color-border);
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.upload-area.dragover {
  border-color: var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.05);
}

@media (max-width: 639px) {
  .upload-area {
    min-height: 160px;
  }
}
```

### Canvas Preview
```css
.canvas-container {
  max-width: 100%;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: repeating-conic-gradient(
    rgba(var(--color-border-rgb), 0.3) 0% 25%,
    transparent 0% 50%
  ) 50% / 20px 20px;
}

.canvas-container canvas {
  display: block;
  max-width: 100%;
  height: auto;
}

@media (max-width: 639px) {
  .canvas-container {
    margin: 0 -1.5rem;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
```

### Typography Scaling
```css
@media (max-width: 639px) {
  :root {
    font-size: 15px; /* Slightly smaller base for mobile */
  }
}
```

---

## Design Dependencies

**Fonts**: 
- Google Fonts (Inter)

**Icons**: 
- Use Lucide Icons or inline SVG

**No external UI libraries required** - All components defined in this spec

---

## 10. Batch Processing Features

### Core Requirements
- **Multiple image upload**: Support drag & drop or file picker for multiple files
- **Unified watermark settings**: Apply same watermark configuration to all images
- **Grid view**: Display all uploaded images in a responsive grid
- **Batch processing**: Process all images with one click
- **Individual controls**: Preview and download each image separately
- **Batch download**: Download all processed images as ZIP file

### UI Layout for Batch Mode
```
┌─────────────────────────────────────────┐
│  Upload Area (supports multiple files)  │
├─────────────────────────────────────────┤
│  Watermark Controls (applies to all)    │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ IMG1 │  │ IMG2 │  │ IMG3 │  (Grid)  │
│  └──────┘  └──────┘  └──────┘          │
├─────────────────────────────────────────┤
│  [Process All] [Download All as ZIP]    │
└─────────────────────────────────────────┘
```

### Image Grid Card
```css
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.image-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.image-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.image-card-preview {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  background: repeating-conic-gradient(
    rgba(var(--color-border-rgb), 0.3) 0% 25%,
    transparent 0% 50%
  ) 50% / 20px 20px;
}

.image-card-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}

@media (max-width: 639px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}
```
