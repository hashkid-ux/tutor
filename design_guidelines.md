# Design Guidelines: AI-Powered Gamified Education Platform

## Design Approach
**Reference-Based Approach** drawing inspiration from:
- **Duolingo** - Gamification, achievement systems, vibrant color psychology
- **Discord** - Real-time communication UI, dark mode aesthetics
- **Linear** - Modern minimalist UI with sophisticated interactions
- **Gaming UI Patterns** - Progress systems, level displays, reward animations

**Design Principles:**
1. **Engaging but Sophisticated** - Game-like without being childish (age 16-18 audience)
2. **Clarity Through Hierarchy** - Complex features organized intuitively
3. **Reward-Driven Progress** - Visual feedback for every learning milestone
4. **Multimodal Excellence** - Seamless integration of voice, video, image, text interactions

## Color Palette

**Dark Mode Primary (Default):**
- Background Base: 222 20% 12%
- Surface Elevated: 222 18% 16%
- Primary Brand: 265 85% 65% (vibrant purple - education/knowledge)
- Secondary Accent: 195 100% 50% (cyan - technology/AI)
- Success: 145 70% 50%
- Warning: 38 95% 60%
- Error: 0 75% 60%

**Light Mode Alternative:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 265 75% 55%
- Text: 222 20% 20%

**Subject-Specific Accent Colors:**
- Physics: 220 90% 60% (blue)
- Chemistry: 165 75% 50% (green)
- Mathematics: 265 85% 65% (purple)
- Biology: 145 70% 55% (teal)
- CS/IP: 195 100% 50% (cyan)
- Agriculture: 90 60% 50% (earth green)

## Typography

**Fonts (Google Fonts):**
- Display: 'Space Grotesk' 700-800 (headers, game UI elements)
- Body: 'Inter' 400-600 (content, chat)
- Mono: 'JetBrains Mono' 400-500 (code, derivations)

**Scale:**
- Hero/Level Display: text-6xl to text-8xl font-bold
- Section Headers: text-3xl to text-4xl font-bold
- Card Titles: text-xl to text-2xl font-semibold
- Body Text: text-base font-normal
- Captions: text-sm font-medium

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 8, 12, 16, 20
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, m-4, gap-4
- Section spacing: py-8, px-8
- Major sections: py-12 to py-20

**Grid System:**
- Dashboard: 12-column grid with sidebar (64-72 units)
- Main content: max-w-7xl centered
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Chat/derivation split: 60/40 or 50/50 responsive split

## Component Library

**Navigation:**
- Persistent sidebar with subject icons, progress indicators, achievement badges
- Top bar: Real-time status (online/offline), voice indicator, quick actions
- Subject switcher: Tab-style with colored indicators
- Minimized sidebar option for focus mode

**AI Interaction Hub:**
- Multimodal input bar (text, voice toggle, image upload, screen share)
- Real-time chat bubbles with AI avatar (animated orb/icon)
- Voice activity indicator with waveform animation
- Screen share preview thumbnail with annotation tools

**3D Visualization Canvas:**
- Full-screen immersive mode option
- Interactive controls overlay (rotate, zoom, layers)
- Step-by-step animation timeline scrubber
- Annotation layer for AI explanations

**Derivation Canvas:**
- Interactive mathematical workspace
- Step-by-step reveal with smooth transitions
- Highlight changed elements in each step
- Manipulable variables with slider controls
- AI commentary sidebar

**Gamification Elements:**
- XP progress bar (gradient fill with pulse animation)
- Level badge (geometric shield/badge with number)
- Achievement popups (slide-in from top-right with celebration particles)
- Streak counter with flame icon
- Daily quest cards with progress rings

**Progress Dashboard:**
- Subject mastery radial charts (donut charts with percentages)
- Learning style indicator (visual/verbal/kinesthetic breakdown)
- Strength/weakness heatmap
- Study time graph (area chart)
- Recent activity feed

**Quiz/Challenge Cards:**
- Question cards with difficulty indicator
- Interactive answer options (multiple choice, drag-drop, draw)
- Timer with urgency color shift
- Instant feedback with explanation modal
- Reward animation on correct answer

**Story/Quest Interface:**
- Chapter navigation with locked/unlocked states
- Character progression visual (avatar with gear/skills)
- Narrative text overlay on chapter backgrounds
- Quest objectives checklist

## Interactions & Animations

**Micro-interactions:**
- Button hover: scale-105 with subtle shadow increase
- Card hover: lift effect (shadow-lg transform -translate-y-1)
- Achievement unlock: scale burst with particle effect
- Progress bar fill: smooth transition-all duration-700

**Page Transitions:**
- Fade + slight slide on route changes
- Skeleton loaders for content (pulse animation)
- Staggered entry for list items (delay-100, delay-200)

**AI Feedback:**
- Thinking indicator: pulsing dots animation
- Voice active: waveform visualization
- Screen share: border pulse effect
- Image processing: shimmer overlay

## Images & Visual Assets

**Hero Section:**
- Vibrant 3D rendered scene showing AI brain/neural network interacting with subject icons (molecules, equations, circuits)
- Gradient overlay from background color for text readability
- Floating geometric shapes with subtle parallax

**Subject Cards:**
- Custom illustrated icons for each subject (physics waves, chemical bonds, math symbols)
- Background patterns using subject-specific accent colors at 10% opacity

**Achievement Badges:**
- Use icon library (Heroicons) with custom SVG borders/frames
- Metallic gradient overlays (bronze, silver, gold tiers)

**AI Avatar:**
- Animated gradient orb that responds to voice input
- Subject-specific color shift based on active topic

**Character/Avatar System:**
- Customizable student avatar (simple geometric style)
- Equipment/badges unlock visual progression

## Responsive Breakpoints

- Mobile: Single column, bottom navigation, full-screen modals
- Tablet (md): 2-column grids, slide-out sidebar
- Desktop (lg): Full multi-column dashboard, persistent sidebar
- Large (xl): Expanded visualizations, side-by-side derivations

## Accessibility & UX

- High contrast ratios (4.5:1 minimum for text)
- Focus states: ring-2 ring-primary ring-offset-2
- Voice feedback for screen reader users
- Keyboard shortcuts for power users (cmd+k command palette)
- Haptic feedback on mobile for achievements
- Reduced motion mode (disable particles/complex animations)