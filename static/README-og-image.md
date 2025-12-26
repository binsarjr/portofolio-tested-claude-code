# OG Image Instructions

## Current Status
- `og-image.svg` - SVG template for the Open Graph image

## To Generate PNG Version

Social media platforms prefer PNG format (1200x630px). You can convert the SVG to PNG using:

### Option 1: Online Tools
1. Open https://cloudconvert.com/svg-to-png
2. Upload `og-image.svg`
3. Set width to 1200px (height will auto-scale to 630px)
4. Download and rename to `og-image.png`

### Option 2: Using Figma/Design Tools
1. Import `og-image.svg` into Figma
2. Export as PNG at 1200x630px
3. Save as `og-image.png`

### Option 3: Command Line (requires Inkscape or ImageMagick)
```bash
# Using Inkscape
inkscape og-image.svg -w 1200 -h 630 -o og-image.png

# Using ImageMagick
convert -background none -resize 1200x630 og-image.svg og-image.png
```

### Option 4: Screenshot Tool
1. Open `og-image.svg` in a browser
2. Zoom to fit 1200x630 viewport
3. Take screenshot
4. Save as `og-image.png`

## Customization Tips

Edit `og-image.svg` to customize:
- **Name**: Line 30 - Update "Binsar Dwi Jasuma"
- **Title**: Line 35 - Update "Software Engineer"
- **Motto**: Line 40 - Update "KNTL - Keep Never Tired Learning"
- **Stats**: Lines 45-68 - Update numbers (repos, followers, etc.)
- **Colors**: Lines 7-9 - Change gradient colors
- **Background**: Line 5 - Change from `#09090b` for different theme

## Validation

Test your OG image at:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: Share the link and preview
