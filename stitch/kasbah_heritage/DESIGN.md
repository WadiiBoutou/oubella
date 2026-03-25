# Design System Document: The Artisanal Terroir

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built to evoke the tactile, sun-drenched atmosphere of Moroccan landscapes. We are moving away from the "generic e-commerce" aesthetic toward a **High-End Editorial** experience. 

**The Creative North Star: The Digital Curator.** 
The UI should feel like a curated gallery or a premium lifestyle magazine. We achieve this through "Organic Asymmetry"—breaking the rigid 12-column grid with overlapping elements, generous white space (breathing room), and a "High-Contrast Scale" where massive serif display type meets delicate, functional sans-serif utility text. This system is not just a container for products; it is a storyteller.

---

## 2. Colors: Tonal Depth over Borders
The palette is rooted in the earth. We avoid "digital" aesthetics in favor of pigment-inspired tones.

### Color Palette Reference
- **Primary (`#B3543D` / `primary`):** Terracotta Clay. Use for high-impact brand moments.
- **Secondary (`#5F6F52` / `secondary`):** Muted Olive. Use for nature-inspired accents and secondary actions.
- **Tertiary (`#D4A373` / `tertiary`):** An additional accent color for highlights, badges, or decorative elements.
- **Neutral (`#2e2e2e` / `neutral`):** A neutral base for backgrounds, surfaces, and non-chromatic elements.
- **Surface/Background (`#FBF9F5` / `surface`):** Warm Paper. This is our canvas; it should never feel stark white.

### The "No-Line" Rule
To maintain a premium, seamless feel, **1px solid borders are prohibited for sectioning.** 
- **The Technique:** Define boundaries solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation the eye needs without the "cheapness" of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, handmade paper.
1.  **Base Layer:** `surface` (#FBF9F5)
2.  **Inset Content:** `surface-container-low` (#F5F3EF) for subtle grouping.
3.  **Elevated Elements:** `surface-container-lowest` (#FFFFFF) for cards or floating menus to create a soft, natural lift.

### The "Glass & Gradient" Rule
For the sticky navigation and floating elements, use **Glassmorphism**. 
- **Spec:** Apply `surface` at 80% opacity with a `backdrop-filter: blur(12px)`. This allows the rich terracotta and olive tones to bleed through as the user scrolls, creating an integrated, sophisticated depth.
- **CTAs:** Use a subtle linear gradient from `primary` (#B3543D) to `primary-container` (#B3543D) to give buttons a "fired clay" dimensionality.

---

## 3. Typography: Editorial Authority
We pair the traditional weight of a Serif with the modern precision of a Sans-Serif.

*   **Display & Headlines (Noto Serif):** These are your "hooks." Use `display-lg` (3.5rem) for hero sections with tight letter-spacing (-0.02em) to create a sophisticated, editorial impact.
*   **Body & Utility (Inter):** Clean, legible, and modern. Use `body-md` (0.875rem) for descriptions. Increase line-height to 1.6 for a relaxed, premium reading experience.
*   **Labels (Inter Bold):** Use `label-md` in all-caps with increased letter-spacing (0.05em) for category tags or small metadata to distinguish them from body copy.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "software-like." We use light and tone to imply height.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-high` background. The contrast in warmth creates a natural "lift."
*   **Ambient Shadows:** When a float is required (e.g., a sticky cart), use a shadow tinted with the `on-surface` color: `rgba(27, 28, 26, 0.06)` with a 30px blur and 10px Y-offset.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#DCC1BA) at 20% opacity. **Never use 100% opaque borders.**

---

## 5. Components

### Navigation (Sticky)
- **Style:** Glassmorphic `surface` with a `backdrop-blur`. 
- **Detail:** No bottom border. Use a subtle `surface-dim` shadow if the scroll position is > 0.

### Buttons
- **Primary:** Terracotta gradient, `rounded-sm` (0.125rem). The sharp, slight radius feels more "architectural" than fully rounded buttons.
- **Secondary:** `secondary-container` background with `on-secondary-container` text. No border.

### Cards & Product Lists
- **Rule:** **Forbid divider lines.** 
- **Layout:** Use `spacing-8` (2.75rem) to separate items. 
- **Card Surface:** Use `surface-container-lowest` with a "Ghost Border" (20% opacity) for a whisper-light container.

### Elegant Form Fields
- **Background:** `surface-container-low`.
- **Active State:** Border transitions to `primary` (Terracotta) but only 1px.
- **Label:** `label-md` floating above the field in `on-surface-variant`.

### Signature Component: "The Terroir Chip"
- Used for ingredients or origins. `secondary-fixed` background, `on-secondary-fixed` text, `rounded-full` for an organic, pebble-like feel.

---

## 6. Do's and Don'ts

### Do
- **Use Intentional Asymmetry:** Let images bleed off the edge of the container or overlap text.
- **Embrace White Space:** Use `spacing-16` and `spacing-20` for section margins. Premium brands "breathe."
- **Use High-Quality Imagery:** Photos should have warm, natural lighting and earthy textures.

### Don't
- **Don't use 1px solid black or grey lines.** They break the organic flow of the brand.
- **Don't use "System" blue for links.** Use `primary` (Terracotta) or `secondary` (Olive).
- **Don't crowd the content.** If a section feels busy, increase the background-color contrast instead of adding lines or boxes.
- **Don't use `rounded-lg` or `rounded-xl` for everything.** Keep the primary radius at `sm` (0.125rem) or `none` to maintain a traditional, high-end feel. Use `rounded-full` only for small interactive chips.