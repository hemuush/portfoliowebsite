# Anime-Themed Portfolio Website

A professional portfolio website with anime-inspired design elements from Demon Slayer, Jujutsu Kaisen, Attack on Titan, Death Note, and Solo Leveling.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Interactive UI elements with smooth animations
- Anime-themed styling with elements from popular anime series
- Sections for showcasing skills, work experience, and contact information
- Project display with tabbed interface
- Contact form for easy communication

## File Structure

- `index.html` - Main HTML structure for the website
- `styles.css` - Main stylesheet containing core styling
- `anime-theme.css` - Additional CSS for anime-themed elements and animations
- `main.js` - JavaScript functionality for interactivity

## Anime Influences

The website incorporates design elements inspired by the following anime:

1. **Demon Slayer**
   - Color palette (purple accents)
   - Flowing animations
   - Gradient elements

2. **Jujutsu Kaisen**
   - Blue accent colors
   - Geometric patterns
   - Card design

3. **Attack on Titan**
   - Grid patterns
   - Bold typography
   - Orange-red accents

4. **Death Note**
   - Dark theme
   - Elegant borders
   - Serif font elements

5. **Solo Leveling**
   - Glowing effects
   - Minimalist UI
   - Power level animations

## Setup Instructions

1. Download all files to your local machine
2. Make sure all files are in the same directory
3. Open `index.html` in a web browser to view the website

## Customization

### Changing Colors

The main color scheme is defined in the `:root` section of `styles.css`. You can modify these variables to change the entire color scheme:

```css
:root {
    --primary-color: #6a0dad; /* Purple (Demon Slayer) */
    --secondary-color: #ff4500; /* Orange Red (Attack on Titan) */
    --accent-color: #1e90ff; /* Dodger Blue (Jujutsu Kaisen) */
    --dark-color: #1a1a2e; /* Dark Blue (Death Note) */
    --light-color: #f8f9fa; /* Light Gray (Solo Leveling) */
}
```

### Adding Projects

To add more projects to the Experience section:

1. Add new tab buttons in the `project-tabs` div
2. Create corresponding content divs with matching IDs
3. Update the JavaScript event listeners if necessary

### Profile Image

Replace the placeholder image in the About section with your actual profile photo for a more personalized touch.

## Credits

- FontAwesome icons
- Google Fonts (Poppins)
- Anime inspiration from:
  - Demon Slayer
  - Jujutsu Kaisen
  - Attack on Titan
  - Death Note
  - Solo Leveling

---

Created by Hemant Sharma | 2025