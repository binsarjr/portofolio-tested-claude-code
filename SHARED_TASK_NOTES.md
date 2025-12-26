# Shared Task Notes - Portfolio Binsar

## Current Status
✅ Requirements analysis COMPLETE - See `REQUIREMENTS_ANALYSIS.md`

## Next Iteration: Phase 1 - Design System Foundation

### What to Do Next
Build the foundational design system with shadcn-inspired dark theme:

1. **Setup color palette in `layout.css`**
   - Use Tailwind 4 `@theme` syntax
   - Implement dark theme colors (zinc-950 base)
   - Add accent colors (blue for links/highlights)

2. **Typography configuration**
   - Import Inter font (or use system fonts)
   - Set up heading styles (h1-h6)
   - Configure body text styles

3. **Build UI components in `src/lib/components/ui/`**
   - `Button.svelte` - Primary, secondary, ghost variants with hover effects
   - `Card.svelte` - For project cards with border styling
   - `Badge.svelte` - For tech stack tags (rounded, muted colors)
   - `Input.svelte` + `Textarea.svelte` - For contact form

4. **Create layout components in `src/lib/components/`**
   - `Navigation.svelte` - Sticky header with blur effect
   - `Footer.svelte` - Social links + copyright
   - Wire them up in `src/routes/+layout.svelte`

### Key Technical Notes
- **Svelte 5 runes enabled** - Use `$state`, `$derived`, `$props` syntax
- **Tailwind CSS 4** - Already configured via `@tailwindcss/vite`
- **TypeScript** - All components should be `.svelte` with `<script lang="ts">`
- Use `svelte-autofixer` tool before finalizing components

### Design Reference
- Background: `#09090b` (zinc-950)
- Card: Slightly lighter with subtle border
- Text: `#fafafa` high contrast
- Accent: Blue for links/highlights
- Shadows: Minimal - prefer borders over shadows
- Borders: `#27272a` (zinc-800) subtle

### GitHub Data
- User: `binsarjr`
- Top projects: chatbot-indonesia (37★), node-email-extractor (18★), svelte-lazyimage-cache (11★)
- Stats: 259 repos, 144 followers
- Bio: "KNTL (Keep Never Tired Learning)"

### Files to Create Next
```
src/lib/components/ui/Button.svelte
src/lib/components/ui/Card.svelte
src/lib/components/ui/Badge.svelte
src/lib/components/ui/Input.svelte
src/lib/components/Navigation.svelte
src/lib/components/Footer.svelte
```

### Test Your Work
- Use `bun run dev` to preview
- Check mobile responsiveness (375px+)
- Verify dark theme contrast
- Test keyboard navigation

## Don't Forget
- Keep components simple and reusable
- Use TypeScript for props
- Follow Svelte 5 runes syntax
- Run svelte-autofixer before committing
