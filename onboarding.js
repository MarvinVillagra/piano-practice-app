// Piano Master - Onboarding & Tutorial System

class Onboarding {
    constructor() {
        this.steps = [
            {
                id: 'welcome',
                title: 'Welcome to Piano Master! 🎹',
                content: 'Let\'s get you started on your piano journey. I\'ll guide you through the basics.',
                action: 'next',
                highlight: null
            },
            {
                id: 'scales',
                title: 'Learn Scales',
                content: 'Start with scales to build finger strength and muscle memory. Tap "Scales" in the navigation to practice all 24 major and minor scales.',
                action: 'next',
                highlight: '[data-section="scales"]'
            },
            {
                id: 'drills',
                title: 'Practice Drills',
                content: 'Improve your technique with targeted exercises. Hanon, finger independence, speed drills, and rhythm exercises.',
                action: 'next',
                highlight: '[data-section="drills"]'
            },
            {
                id: 'songs',
                title: 'Play Songs',
                content: 'Apply what you\'ve learned with real songs! Choose from classical, pop, jazz, and hip-hop tracks.',
                action: 'next',
                highlight: '[data-section="songs"]'
            },
            {
                id: 'ear-training',
                title: 'Train Your Ear',
                content: 'Develop your musical ear with interval recognition, chord identification, and pitch matching exercises.',
                action: 'next',
                highlight: '[data-section="ear-training"]'
            },
            {
                id: 'audio',
                title: 'Audio Detection',
                content: 'The app listens to your piano through the microphone. Make sure to allow microphone access when prompted!',
                action: 'next',
                highlight: null
            },
            {
                id: 'midi',
                title: 'MIDI Support',
                content: 'Have a digital keyboard? Connect it via USB and the app will detect your playing automatically! No microphone needed.',
                action: 'next',
                highlight: null
            },
            {
                id: 'practice',
                title: 'Daily Practice',
                content: 'Consistency is key! Even 15 minutes a day will lead to noticeable improvement. Track your streak and earn XP!',
                action: 'start',
                highlight: null
            }
        ];
        
        this.currentStep = 0;
        this.overlay = null;
        this.tooltip = null;
    }

    init() {
        // Check if onboarding was already completed
        if (localStorage.getItem('onboardingComplete') === 'true') {
            return false;
        }
        
        this.createOverlay();
        this.showStep(0);
        return true;
    }

    createOverlay() {
        // Overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'onboarding-overlay';
        this.overlay.innerHTML = `
            <div class="onboarding-tooltip" id="onboarding-tooltip">
                <button class="onboarding-skip" onclick="onboarding.skip()">Skip Tutorial</button>
                <h3 class="onboarding-title" id="onboarding-title"></h3>
                <p class="onboarding-content" id="onboarding-content"></p>
                <div class="onboarding-progress">
                    ${this.steps.map((_, i) => `<span class="step-dot ${i === 0 ? 'active' : ''}" data-step="${i}"></span>`).join('')}
                </div>
                <button class="neon-btn" id="onboarding-action" onclick="onboarding.next()">Next</button>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        this.tooltip = document.getElementById('onboarding-tooltip');
    }

    showStep(index) {
        if (index >= this.steps.length) {
            this.complete();
            return;
        }
        
        const step = this.steps[index];
        this.currentStep = index;
        
        // Update content
        document.getElementById('onboarding-title').textContent = step.title;
        document.getElementById('onboarding-content').textContent = step.content;
        
        // Update button
        const actionBtn = document.getElementById('onboarding-action');
        actionBtn.textContent = step.action === 'start' ? 'Start Practicing!' : 'Next';
        
        // Update progress dots
        document.querySelectorAll('.step-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.classList.toggle('completed', i < index);
        });
        
        // Position tooltip
        this.positionTooltip(step.highlight);
    }

    positionTooltip(selector) {
        if (!selector) {
            // Center of screen
            this.tooltip.style.left = '50%';
            this.tooltip.style.top = '50%';
            this.tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        const target = document.querySelector(selector);
        if (target) {
            const rect = target.getBoundingClientRect();
            this.tooltip.style.left = rect.left + rect.width / 2 + 'px';
            this.tooltip.style.top = rect.bottom + 20 + 'px';
            this.tooltip.style.transform = 'translateX(-50%)';
            
            // Highlight target
            target.style.position = 'relative';
            target.style.zIndex = '10001';
            target.classList.add('onboarding-highlight');
        }
    }

    next() {
        // Remove previous highlight
        document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight');
            el.style.zIndex = '';
        });
        
        const step = this.steps[this.currentStep];
        
        if (step.action === 'start') {
            this.complete();
        } else {
            this.showStep(this.currentStep + 1);
        }
    }

    skip() {
        this.complete();
    }

    complete() {
        localStorage.setItem('onboardingComplete', 'true');
        
        if (this.overlay) {
            this.overlay.remove();
        }
        
        // Remove any highlights
        document.querySelectorAll('.onboarding-highlight').forEach(el => {
            el.classList.remove('onboarding-highlight');
            el.style.zIndex = '';
        });
        
        showToast('🎉 Welcome! Let\'s start practicing!', 'success');
    }
}

// ============== LESSON SYSTEM ==============
class LessonSystem {
    constructor() {
        this.lessons = [
            {
                id: 'basics-1',
                title: 'Your First Notes',
                category: 'Basics',
                difficulty: 1,
                duration: 10,
                objectives: [
                    'Learn to find Middle C on the piano',
                    'Play C, D, E with correct finger numbers',
                    'Understand basic rhythm'
                ],
                exercises: [
                    { type: 'info', content: 'Middle C is the C note in the middle of the piano. It\'s usually marked with a sticker or is just below the brand name.' },
                    { type: 'practice', notes: ['C4'], instruction: 'Play Middle C with your right thumb (finger 1)' },
                    { type: 'practice', notes: ['D4'], instruction: 'Play D with your right index finger (finger 2)' },
                    { type: 'practice', notes: ['E4'], instruction: 'Play E with your right middle finger (finger 3)' },
                    { type: 'sequence', notes: ['C4', 'D4', 'E4', 'D4', 'C4'], instruction: 'Play this sequence: C-D-E-D-C' },
                    { type: 'quiz', question: 'Which finger plays D in the right hand?', options: ['Thumb (1)', 'Index (2)', 'Middle (3)'], answer: 'Index (2)' }
                ],
                xpReward: 50
            },
            {
                id: 'basics-2',
                title: 'Five-Finger Pattern',
                category: 'Basics',
                difficulty: 1,
                duration: 15,
                objectives: [
                    'Learn all five right-hand finger positions',
                    'Play the C major five-finger pattern',
                    'Play simple melodies'
                ],
                exercises: [
                    { type: 'info', content: 'The five-finger pattern places each finger on consecutive white keys, starting from C.' },
                    { type: 'practice', notes: ['C4', 'D4', 'E4', 'F4', 'G4'], instruction: 'Play C through G with fingers 1-2-3-4-5' },
                    { type: 'sequence', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4', 'C4'], instruction: 'Play up and down: C-D-E-F-G-F-E-D-C' },
                    { type: 'melody', notes: ['C4', 'E4', 'G4', 'E4', 'C4'], instruction: 'Play this melody: C-E-G-E-C' }
                ],
                xpReward: 75
            },
            {
                id: 'scales-1',
                title: 'C Major Scale',
                category: 'Scales',
                difficulty: 2,
                duration: 20,
                objectives: [
                    'Understand the C major scale structure',
                    'Learn the finger crossover technique',
                    'Play one octave ascending and descending'
                ],
                exercises: [
                    { type: 'info', content: 'The C major scale uses only white keys: C-D-E-F-G-A-B-C. The pattern is: whole-whole-half-whole-whole-whole-half.' },
                    { type: 'practice', notes: ['C4', 'D4', 'E4'], instruction: 'Start with fingers 1-2-3 on C-D-E' },
                    { type: 'info', content: 'Now cross your thumb (1) under to play F, then continue with fingers 2-3-4-5' },
                    { type: 'sequence', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], instruction: 'Play C major scale ascending' },
                    { type: 'sequence', notes: ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'], instruction: 'Play C major scale descending' }
                ],
                xpReward: 100
            },
            {
                id: 'chords-1',
                title: 'Basic Chords',
                category: 'Chords',
                difficulty: 2,
                duration: 15,
                objectives: [
                    'Understand what a chord is',
                    'Play C major and G major chords',
                    'Switch between chords'
                ],
                exercises: [
                    { type: 'info', content: 'A chord is three or more notes played together. C major = C-E-G' },
                    { type: 'chord', notes: ['C4', 'E4', 'G4'], instruction: 'Play C major chord with fingers 1-3-5' },
                    { type: 'chord', notes: ['G3', 'B3', 'D4'], instruction: 'Play G major chord: G-B-D' },
                    { type: 'progression', chords: [['C4', 'E4', 'G4'], ['G3', 'B3', 'D4']], instruction: 'Switch between C and G chords' }
                ],
                xpReward: 100
            }
        ];
        
        this.currentLesson = null;
        this.currentExercise = 0;
        this.completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    }

    getLessonsByCategory() {
        const categories = {};
        this.lessons.forEach(lesson => {
            if (!categories[lesson.category]) {
                categories[lesson.category] = [];
            }
            categories[lesson.category].push({
                ...lesson,
                completed: this.completedLessons.includes(lesson.id)
            });
        });
        return categories;
    }

    startLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return false;
        
        this.currentLesson = lesson;
        this.currentExercise = 0;
        
        return lesson;
    }

    getCurrentExercise() {
        if (!this.currentLesson) return null;
        return this.currentLesson.exercises[this.currentExercise];
    }

    nextExercise() {
        if (!this.currentLesson) return null;
        
        this.currentExercise++;
        
        if (this.currentExercise >= this.currentLesson.exercises.length) {
            return this.completeLesson();
        }
        
        return this.getCurrentExercise();
    }

    completeLesson() {
        if (!this.currentLesson) return null;
        
        if (!this.completedLessons.includes(this.currentLesson.id)) {
            this.completedLessons.push(this.currentLesson.id);
            localStorage.setItem('completedLessons', JSON.stringify(this.completedLessons));
            
            // Award XP
            const xp = this.currentLesson.xpReward;
            if (typeof addXP === 'function') {
                addXP(xp, 'Completed lesson: ' + this.currentLesson.title);
            }
        }
        
        return {
            completed: true,
            xp: this.currentLesson.xpReward,
            nextLessons: this.getNextLessons()
        };
    }

    getNextLessons() {
        const currentIndex = this.lessons.findIndex(l => l.id === this.currentLesson?.id);
        return this.lessons.slice(currentIndex + 1, currentIndex + 3);
    }

    getProgress() {
        const total = this.lessons.length;
        const completed = this.completedLessons.length;
        return {
            total,
            completed,
            percent: (completed / total) * 100
        };
    }
}

// Export
if (typeof window !== 'undefined') {
    window.Onboarding = Onboarding;
    window.LessonSystem = LessonSystem;
    window.onboarding = new Onboarding();
    window.lessons = new LessonSystem();
}
