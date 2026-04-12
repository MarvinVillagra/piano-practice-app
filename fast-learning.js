// Piano Master - Accelerated Learning Module
// Implements: Spaced Repetition, Micro Practice, Interleaved Practice, Backward Chaining

// ============== SPACED REPETITION SYSTEM ==============
class SpacedRepetition {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('sr_items') || '{}');
        this.config = {
            easy: 2.5,    // Multiplier for easy items
            good: 2.0,    // Multiplier for good items  
            hard: 1.2,    // Multiplier for hard items
            minInterval: 1,
            maxInterval: 365
        };
    }

    // Add new item to review
    addItem(id, type, data) {
        this.items[id] = {
            id,
            type,
            data,
            interval: 1,      // Days until next review
            easeFactor: 2.5,  // Difficulty adjustment
            repetitions: 0,   // Number of successful reviews
            nextReview: Date.now(),
            lastReview: null,
            created: Date.now()
        };
        this.save();
        return this.items[id];
    }

    // Get items due for review today
    getDueItems() {
        const now = Date.now();
        return Object.values(this.items).filter(item => 
            item.nextReview <= now
        ).sort((a, b) => a.nextReview - b.nextReview);
    }

    // Rate the recall quality (1-5 scale)
    reviewItem(id, quality) {
        const item = this.items[id];
        if (!item) return null;

        item.lastReview = Date.now();
        item.repetitions++;

        // Quality: 1=complete failure, 2=hard, 3=good, 4=easy, 5=perfect
        if (quality < 3) {
            // Failed - reset
            item.repetitions = 0;
            item.interval = 1;
        } else {
            // Success - calculate next interval
            if (item.repetitions === 1) {
                item.interval = 1;
            } else if (item.repetitions === 2) {
                item.interval = 6;
            } else {
                item.interval = Math.round(item.interval * item.easeFactor);
            }

            // Adjust ease factor
            item.easeFactor = Math.max(1.3, 
                item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
            );
        }

        // Apply multiplier based on quality
        if (quality === 5) item.interval = Math.round(item.interval * this.config.easy);
        else if (quality === 4) item.interval = Math.round(item.interval * this.config.good);
        else if (quality === 2) item.interval = Math.round(item.interval * this.config.hard);

        // Clamp interval
        item.interval = Math.max(this.config.minInterval, 
            Math.min(this.config.maxInterval, item.interval));

        // Set next review date
        item.nextReview = Date.now() + (item.interval * 24 * 60 * 60 * 1000);

        this.save();
        return item;
    }

    save() {
        localStorage.setItem('sr_items', JSON.stringify(this.items));
    }

    getStats() {
        const items = Object.values(this.items);
        const now = Date.now();
        return {
            total: items.length,
            due: items.filter(i => i.nextReview <= now).length,
            learned: items.filter(i => i.repetitions >= 3).length,
            mastered: items.filter(i => i.repetitions >= 7).length,
            dueToday: items.filter(i => i.nextReview <= now + 24*60*60*1000).length
        };
    }
}

// ============== MICRO PRACTICE SESSIONS ==============
const microPractice = {
    sessions: [
        { id: '5min', name: 'Quick 5', duration: 5, focus: 'single skill', description: 'Perfect for busy days' },
        { id: '10min', name: 'Power 10', duration: 10, focus: 'two skills', description: 'Most popular' },
        { id: '15min', name: 'Deep 15', duration: 15, focus: 'full routine', description: 'Maximum progress' }
    ],

    generateSession(minutes) {
        const plans = {
            5: {
                warmup: 1,
                drills: [{ type: 'scale', minutes: 2, desc: 'Run through one scale at tempo' }],
                practice: [{ type: 'piece', minutes: 2, desc: 'Focus on ONE problem section' }],
                cooldown: 0
            },
            10: {
                warmup: 2,
                drills: [
                    { type: 'scale', minutes: 2, desc: 'Two scales, hands together' },
                    { type: 'technique', minutes: 2, desc: 'One Hanon or drill exercise' }
                ],
                practice: [
                    { type: 'piece', minutes: 3, desc: 'Work on 2-4 bar section' },
                    { type: 'sight-read', minutes: 1, desc: 'Quick sight reading exercise' }
                ],
                cooldown: 0
            },
            15: {
                warmup: 3,
                drills: [
                    { type: 'scales', minutes: 3, desc: '3 scales with different articulations' },
                    { type: 'arpeggios', minutes: 2, desc: 'Arpeggios in same keys' },
                    { type: 'technique', minutes: 2, desc: 'Hanon or Czerny exercise' }
                ],
                practice: [
                    { type: 'piece-section', minutes: 4, desc: 'Deep work on difficult section' },
                    { type: 'piece-run', minutes: 1, desc: 'Run through from where you stopped' }
                ],
                cooldown: 0
            }
        };
        return plans[minutes] || plans[5];
    }
};

// ============== INTERLEAVED PRACTICE ==============
class InterleavedPractice {
    constructor() {
        this.currentRotation = [];
        this.currentIndex = 0;
    }

    // Create interleaved session that mixes different skills
    createSession(skills, totalMinutes) {
        const slots = Math.floor(totalMinutes / 2); // 2-minute blocks
        const session = [];
        
        // Shuffle and distribute skills across slots
        const shuffled = this.shuffle([...skills]);
        let skillIndex = 0;
        
        for (let i = 0; i < slots; i++) {
            const skill = shuffled[skillIndex % shuffled.length];
            session.push({
                order: i + 1,
                skill: skill.name,
                duration: 2,
                instruction: skill.instructions[i % skill.instructions.length] || skill.instructions[0],
                type: skill.type
            });
            skillIndex++;
        }
        
        return session;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Get next practice item (interleaved)
    getNext(currentSkill, allSkills) {
        const otherSkills = allSkills.filter(s => s.name !== currentSkill.name);
        return otherSkills[Math.floor(Math.random() * otherSkills.length)];
    }
}

// ============== BACKWARD CHAINING ==============
const backwardChaining = {
    // Learn piece from end to beginning
    learnBackward(songId, totalMeasures) {
        const sections = [];
        
        // Create sections from end to beginning
        for (let end = totalMeasures; end > 0; end -= 4) {
            const start = Math.max(1, end - 3);
            sections.push({
                measures: `${start}-${end}`,
                order: sections.length + 1,
                instruction: `Learn measures ${start}-${end} (section ${Math.ceil(totalMeasures/4) - sections.length})`,
                why: 'Learning backwards ensures you never stop at hard parts'
            });
        }
        
        // Reverse so we practice end first
        return sections.reverse();
    },

    // Get current learning section
    getCurrentSection(songId, progress) {
        const sections = this.learnBackward(songId, progress.totalMeasures);
        return sections[progress.currentSectionIndex];
    }
};

// ============== CHUNK PRACTICE ==============
const chunkPractice = {
    // Break piece into tiny chunks (2-4 bars)
    createChunks(songId, measures, difficulty = 'normal') {
        const chunkSize = difficulty === 'hard' ? 2 : difficulty === 'normal' ? 4 : 8;
        const chunks = [];
        
        for (let i = 1; i <= measures; i += chunkSize) {
            const end = Math.min(i + chunkSize - 1, measures);
            chunks.push({
                id: `chunk-${i}-${end}`,
                start: i,
                end: end,
                size: end - i + 1,
                instructions: [
                    `Right hand alone, measures ${i}-${end}`,
                    `Left hand alone, measures ${i}-${end}`,
                    `Both hands, slow tempo`,
                    `Both hands, gradually faster`
                ],
                currentStep: 0,
                mastered: false,
                repetitions: 0
            });
        }
        
        return chunks;
    },

    // Mastery check - can play cleanly at tempo 3 times in a row?
    checkMastery(chunk, attempts) {
        const cleanAttempts = attempts.filter(a => a.errors === 0 && a.atTempo);
        return cleanAttempts.length >= 3;
    }
};

// ============== FAST TRACK CURRICULUM ==============
const fastTrackCurriculum = {
    // Accelerated learning path - learn the essentials fast
    weeks: [
        {
            week: 1,
            title: 'Foundation Week',
            focus: 'Keyboard geography and basic coordination',
            goals: [
                'Find any note on keyboard in under 3 seconds',
                'Play C major scale hands together',
                'Coordinate both hands with simple 5-finger patterns',
                'Play 3 beginner songs'
            ],
            dailyDrills: ['Note finder', '5-finger patterns', 'C major scale'],
            estimatedHours: 3
        },
        {
            week: 2,
            title: 'Coordination Week',
            focus: 'Hand independence and rhythm',
            goals: [
                'Play C, G, and F major scales',
                'Play chords in left hand while melody in right',
                'Master quarter and eighth note rhythms',
                'Play 2 songs with chord accompaniment'
            ],
            dailyDrills: ['Scale rotation', 'Chord progressions', 'Rhythm drills'],
            estimatedHours: 4
        },
        {
            week: 3,
            title: 'Speed Week',
            focus: 'Finger strength and velocity',
            goals: [
                'Play scales at 80+ BPM',
                'Execute clean trills',
                'Play arpeggios fluently',
                'Perform 1 piece at performance tempo'
            ],
            dailyDrills: ['Hanon exercises', 'Speed bursts', 'Metronome work'],
            estimatedHours: 5
        },
        {
            week: 4,
            title: 'Expression Week',
            focus: 'Dynamics and musicality',
            goals: [
                'Control dynamics (pp to ff)',
                'Play with phrasing and breathing',
                'Use pedal correctly',
                'Perform 2 pieces expressively'
            ],
            dailyDrills: ['Dynamic scales', 'Phrasing exercises', 'Pedal practice'],
            estimatedHours: 5
        }
    ],

    // Get personalized next steps based on current ability
    getNextSteps(assessment) {
        const week = this.determineCurrentWeek(assessment);
        return this.fastTrackCurriculum[week - 1]?.goals || this.fastTrackCurriculum[0].goals;
    },

    determineCurrentWeek(assessment) {
        let score = 0;
        if (assessment.canFindNotes) score++;
        if (assessment.canPlayScale) score++;
        if (assessment.canCoordinateHands) score++;
        if (assessment.canPlayChords) score++;
        if (assessment.canPlayAtTempo) score++;
        
        return Math.min(4, Math.ceil(score / 1.5));
    }
};

// ============== QUICK ASSESSMENT ==============
const quickAssessment = {
    questions: [
        {
            id: 'note-find',
            question: 'Can you find C, F, and G on the keyboard without looking?',
            options: ['Yes, instantly', 'Yes, with a pause', 'Need to look', 'Not sure'],
            scores: [3, 2, 1, 0]
        },
        {
            id: 'scale-play',
            question: 'Can you play C major scale hands together?',
            options: ['Yes, smoothly', 'Yes, but slow', 'Hands separate only', 'Not yet'],
            scores: [3, 2, 1, 0]
        },
        {
            id: 'chord-play',
            question: 'Can you play C, F, and G major chords?',
            options: ['Yes, with inversions', 'Yes, root position', 'With difficulty', 'Not yet'],
            scores: [3, 2, 1, 0]
        },
        {
            id: 'rhythm',
            question: 'Can you play quarter and eighth notes evenly?',
            options: ['Yes, perfectly steady', 'Mostly steady', 'Sometimes uneven', 'Struggling'],
            scores: [3, 2, 1, 0]
        },
        {
            id: 'hands-together',
            question: 'Can you play simple melodies with both hands?',
            options: ['Yes, easily', 'Yes, with effort', 'Sometimes', 'Not yet'],
            scores: [3, 2, 1, 0]
        }
    ],

    calculate(results) {
        const total = results.reduce((sum, r, i) => {
            const q = this.questions[i];
            return sum + q.scores[q.options.indexOf(r)];
        }, 0);

        const level = total >= 12 ? 'intermediate' : total >= 6 ? 'beginner' : 'starter';
        const week = Math.max(1, 5 - Math.floor(total / 3));

        return { total, level, recommendedWeek: week };
    }
};

// ============== SPEED DRILLS ==============
const speedDrills = [
    {
        id: 'rapid-note-find',
        name: 'Rapid Note Finder',
        description: 'Find notes as fast as possible',
        type: 'speed',
        drill: (duration) => {
            const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const octaves = [3, 4, 5];
            let count = 0;
            
            return {
                start: () => {
                    // Generate random notes for duration
                    const challenges = [];
                    for (let i = 0; i < Math.floor(duration / 3); i++) {
                        challenges.push(notes[Math.floor(Math.random() * notes.length)] + 
                                       octaves[Math.floor(Math.random() * octaves.length)]);
                    }
                    return challenges;
                },
                scoring: 'count correct in time limit'
            };
        }
    },
    {
        id: 'quick-chord-switch',
        name: 'Quick Chord Switcher',
        description: 'Switch between chords as fast as possible',
        type: 'speed',
        drill: {
            progressions: [
                ['C', 'G', 'Am', 'F'],
                ['C', 'F', 'G', 'C'],
                ['Am', 'F', 'C', 'G']
            ],
            goal: 'Play progression in under 10 seconds'
        }
    },
    {
        id: 'scale-sprint',
        name: 'Scale Sprint',
        description: 'Play scale ascending and descending as fast as clean',
        type: 'speed',
        drill: {
            scales: ['C', 'G', 'D', 'A', 'F'],
            goal: 'Complete 2 octaves under 5 seconds'
        }
    }
];

// ============== DAILY MISSIONS ==============
const dailyMissions = [
    { id: 'scales-3', name: 'Scale Master', task: 'Play 3 different scales', xp: 50, type: 'scales' },
    { id: 'drills-5', name: 'Drill Sergeant', task: 'Complete 5 drill exercises', xp: 30, type: 'drills' },
    { id: 'song-1', name: 'Song Learner', task: 'Learn a new song section', xp: 40, type: 'songs' },
    { id: 'practice-15', name: 'Dedicated', task: 'Practice for 15 minutes', xp: 25, type: 'time' },
    { id: 'sight-3', name: 'Sight Reader', task: 'Complete 3 sight reading exercises', xp: 35, type: 'sight' },
    { id: 'ear-5', name: 'Golden Ear', task: 'Correctly identify 5 intervals', xp: 45, type: 'ear' },
    { id: 'perfect-play', name: 'Perfectionist', task: 'Play a section with zero mistakes', xp: 60, type: 'quality' },
    { id: 'tempo-up', name: 'Speed Demon', task: 'Increase tempo on any piece by 10 BPM', xp: 40, type: 'speed' }
];

function getTodaysMissions() {
    // Get 3 random missions each day (seeded by date)
    const today = new Date().toDateString();
    const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const shuffled = [...dailyMissions].sort((a, b) => ((seed + a.id.charCodeAt(0)) % 8) - ((seed + b.id.charCodeAt(0)) % 8));
    return shuffled.slice(0, 3).map(m => ({
        ...m,
        progress: 0,
        completed: false
    }));
}

// ============== XP & LEVELING ==============
class XPSystem {
    constructor() {
        this.xp = parseInt(localStorage.getItem('total_xp') || '0');
        this.level = this.calculateLevel(this.xp);
    }

    addXP(amount, reason) {
        this.xp += amount;
        const oldLevel = this.level;
        this.level = this.calculateLevel(this.xp);
        
        localStorage.setItem('total_xp', this.xp.toString());
        
        // Log the XP gain
        const log = JSON.parse(localStorage.getItem('xp_log') || '[]');
        log.push({ amount, reason, timestamp: Date.now() });
        localStorage.setItem('xp_log', JSON.stringify(log.slice(-100)));

        return {
            gained: amount,
            newTotal: this.xp,
            leveledUp: this.level > oldLevel,
            newLevel: this.level
        };
    }

    calculateLevel(xp) {
        // Level up every 500 XP, max level 50
        return Math.min(50, Math.floor(xp / 500) + 1);
    }

    getXPForNextLevel() {
        return this.level * 500;
    }

    getProgressToNextLevel() {
        const currentLevelXP = (this.level - 1) * 500;
        const nextLevelXP = this.level * 500;
        return (this.xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
    }

    getStats() {
        return {
            xp: this.xp,
            level: this.level,
            progress: this.getProgressToNextLevel(),
            xpToNext: this.getXPForNextLevel() - this.xp
        };
    }
}

// ============== STREAK BONUSES ==============
function getStreakBonus(streak) {
    if (streak >= 30) return { multiplier: 2.0, name: 'Legendary', icon: '👑' };
    if (streak >= 14) return { multiplier: 1.75, name: 'Dedicated', icon: '🔥' };
    if (streak >= 7) return { multiplier: 1.5, name: 'Consistent', icon: '⭐' };
    if (streak >= 3) return { multiplier: 1.25, name: 'Building', icon: '🌱' };
    return { multiplier: 1.0, name: 'Starting', icon: '💡' };
}

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.SpacedRepetition = SpacedRepetition;
    window.microPractice = microPractice;
    window.InterleavedPractice = InterleavedPractice;
    window.backwardChaining = backwardChaining;
    window.chunkPractice = chunkPractice;
    window.fastTrackCurriculum = fastTrackCurriculum;
    window.quickAssessment = quickAssessment;
    window.speedDrills = speedDrills;
    window.dailyMissions = dailyMissions;
    window.getTodaysMissions = getTodaysMissions;
    window.XPSystem = XPSystem;
    window.getStreakBonus = getStreakBonus;
}