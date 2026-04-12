# Piano Master - Practice App

A web-based piano practice app focused on drills and exercises to improve technique.

## Features

### 🎯 Drills Section
- **Finger Independence** - Hanon exercises, finger lifting, trills
- **Hand Coordination** - Mirror scales, contrary motion, different rhythms
- **Speed & Agility** - Scale sprints, arpeggio runs, metronome ladder
- **Rhythm Training** - Off-beat accents, swing vs straight, polyrhythms

Each drill includes:
- Duration and tempo recommendations
- Detailed instructions
- Built-in timer
- Completion tracking

### 🎼 Scales Section
- Major, Minor, Harmonic Minor, and Melodic Minor scales
- All 14 key signatures
- Visual piano keyboard with highlighted notes
- 7 scale exercises (straight, thirds, sixths, contrary motion, etc.)

### 📚 Songs Section
- Beginner: Twinkle Twinkle, Ode to Joy
- Intermediate: Für Elise, Canon in D, River Flows in You
- Advanced: Moonlight Sonata

Each song includes:
- Chord progressions by section
- Practice tips
- Difficulty badges

### 📊 Progress Tracking
- Total practice time
- Drills completed
- Scales and songs learned
- Practice streak with calendar view
- Recent activity log

## How to Use

1. Open `index.html` in any web browser
2. Navigate between sections using the top nav
3. Click on any drill/scale/song to practice
4. Use the timer during drills
5. Mark items complete to track progress
6. Check your progress in the Progress section

## Data Storage

All progress is saved to localStorage in your browser. Your data persists between sessions.

## Customization Ideas

Want to add more drills or songs? Edit the `app.js` file:
- Add new drills to the `drills` object
- Add new songs to the `songs` array
- Add new scales to the `scales` object

## To Run Locally

```bash
cd /home/radxa/.openclaw/workspace/piano-practice-app
# Open in browser (if you have a GUI)
xdg-open index.html
# Or use a simple server
python3 -m http.server 8080
# Then visit http://localhost:8080
```
