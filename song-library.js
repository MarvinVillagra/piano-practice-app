// Piano Master - Song Library with Popular Songs for Practice

const songLibrary = {
    classical: [
        {
            id: 'fur-elise',
            title: 'Für Elise',
            composer: 'Beethoven',
            difficulty: 3,
            rightHand: ['E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4', 'C4', 'E4', 'A4', 'B4', 'E4', 'G#4', 'B4', 'C5'],
            leftHand: ['A3', 'E3', 'A3', 'E3'],
            tempo: 60,
            timeSignature: '3/4',
            duration: 180
        },
        {
            id: 'moonlight-sonata',
            title: 'Moonlight Sonata (Opening)',
            composer: 'Beethoven',
            difficulty: 4,
            rightHand: ['G#4', 'G#5', 'E5', 'G#4', 'E5', 'G#5', 'G#4', 'G#5', 'E5', 'G#4', 'E5', 'G#5'],
            leftHand: ['C#3', 'G#3', 'E4', 'C#3', 'G#3', 'E4'],
            tempo: 54,
            timeSignature: '4/4',
            duration: 300
        },
        {
            id: 'canon-in-d',
            title: 'Canon in D (Simplified)',
            composer: 'Pachelbel',
            difficulty: 2,
            rightHand: ['F#5', 'E5', 'D5', 'C#5', 'B4', 'A4', 'B4', 'C#5'],
            leftHand: ['D3', 'A3', 'B3', 'F#3', 'G3', 'D3', 'G3', 'A3'],
            tempo: 60,
            timeSignature: '4/4',
            duration: 240
        },
        {
            id: 'ode-to-joy',
            title: 'Ode to Joy',
            composer: 'Beethoven',
            difficulty: 1,
            rightHand: ['E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4', 'C4', 'C4', 'D4', 'E4', 'E4', 'D4', 'D4'],
            leftHand: ['C3', 'G3', 'A3', 'B3', 'C4', 'G3', 'A3', 'G3'],
            tempo: 100,
            timeSignature: '4/4',
            duration: 120
        }
    ],
    
    pop: [
        {
            id: 'happy-birthday',
            title: 'Happy Birthday',
            composer: 'Traditional',
            difficulty: 1,
            rightHand: ['C4', 'C4', 'D4', 'C4', 'F4', 'E4', 'C4', 'C4', 'D4', 'C4', 'G4', 'F4'],
            leftHand: ['C3', 'F3', 'C3', 'F3', 'C3', 'F3'],
            tempo: 80,
            timeSignature: '3/4',
            duration: 30
        },
        {
            id: 'all-of-me',
            title: 'All of Me (Chords)',
            composer: 'John Legend',
            difficulty: 2,
            rightHand: ['E4', 'G#4', 'B4', 'E5', 'D#5', 'C#5', 'B4', 'A4', 'G#4', 'A4', 'B4', 'A4'],
            leftHand: ['E3', 'B3', 'C#4', 'A3', 'B3', 'G#3', 'A3', 'E3'],
            tempo: 63,
            timeSignature: '4/4',
            duration: 240,
            chords: ['Emaj7', 'C#m', 'A', 'B']
        },
        {
            id: 'let-it-be',
            title: 'Let It Be',
            composer: 'The Beatles',
            difficulty: 2,
            rightHand: ['C4', 'E4', 'G4', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'],
            leftHand: ['C3', 'G3', 'A3', 'F3', 'C3', 'F3', 'G3', 'C3'],
            tempo: 76,
            timeSignature: '4/4',
            duration: 240,
            chords: ['C', 'G', 'Am', 'F']
        },
        {
            id: 'someone-like-you',
            title: 'Someone Like You',
            composer: 'Adele',
            difficulty: 2,
            rightHand: ['C#4', 'E4', 'G#4', 'C#5', 'B4', 'G#4', 'E4', 'C#4', 'E4', 'G#4', 'B4', 'C#5'],
            leftHand: ['C#3', 'G#3', 'A3', 'E3', 'B3', 'F#3'],
            tempo: 68,
            timeSignature: '4/4',
            duration: 285,
            chords: ['C#m', 'E', 'B', 'A']
        }
    ],
    
    jazz: [
        {
            id: 'fly-me-to-the-moon',
            title: 'Fly Me to the Moon',
            composer: 'Frank Sinatra',
            difficulty: 3,
            rightHand: ['C4', 'E4', 'G4', 'C5', 'B4', 'A4', 'G4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'],
            leftHand: ['C3', 'G3', 'A3', 'D4', 'G3', 'C3', 'F3', 'G3'],
            tempo: 120,
            timeSignature: '4/4',
            duration: 150,
            chords: ['Cmaj7', 'Am7', 'Dm7', 'G7']
        },
        {
            id: 'autumn-leaves',
            title: 'Autumn Leaves',
            composer: 'Jazz Standard',
            difficulty: 3,
            rightHand: ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F#4', 'G4'],
            leftHand: ['G3', 'E3', 'A3', 'D3', 'G3', 'C3', 'B3', 'E3'],
            tempo: 100,
            timeSignature: '4/4',
            duration: 180,
            chords: ['Gmaj7', 'Em7', 'Am7', 'D7']
        }
    ],
    
    hiphop: [
        {
            id: 'still-dre',
            title: 'Still D.R.E.',
            composer: 'Dr. Dre',
            difficulty: 2,
            rightHand: ['E4', 'G4', 'A4', 'G4', 'E4', 'D4', 'C4', 'D4', 'E4'],
            leftHand: ['A3', 'E3', 'G3', 'A3'],
            tempo: 93,
            timeSignature: '4/4',
            duration: 240,
            genre: 'Hip-Hop'
        },
        {
            id: 'humble',
            title: 'HUMBLE. (Melody)',
            composer: 'Kendrick Lamar',
            difficulty: 2,
            rightHand: ['G4', 'F4', 'Eb4', 'D4', 'C4', 'Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4'],
            leftHand: ['C3', 'G3', 'Bb3', 'F3'],
            tempo: 150,
            timeSignature: '4/4',
            duration: 180
        }
    ],
    
    christmas: [
        {
            id: 'jingle-bells',
            title: 'Jingle Bells',
            composer: 'Traditional',
            difficulty: 1,
            rightHand: ['E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'E4', 'G4', 'C4', 'D4', 'E4'],
            leftHand: ['C3', 'G3', 'C3', 'G3', 'C3', 'G3'],
            tempo: 100,
            timeSignature: '4/4',
            duration: 60
        },
        {
            id: 'silent-night',
            title: 'Silent Night',
            composer: 'Traditional',
            difficulty: 1,
            rightHand: ['G4', 'A4', 'G4', 'E4', 'G4', 'A4', 'G4', 'E4', 'D5', 'D5', 'B4'],
            leftHand: ['C3', 'G3', 'C3', 'G3', 'F3', 'C3', 'G3'],
            tempo: 60,
            timeSignature: '3/4',
            duration: 90
        }
    ]
};

// ============== SONG PLAYER ==============
class SongPlayer {
    constructor() {
        this.currentSong = null;
        this.currentIndex = 0;
        this.isPlaying = false;
        this.bpm = 60;
        this.handMode = 'both';
        this.audioContext = null;
        this.onNotePlayed = null;
    }

    async init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    loadSong(songId, category = 'classical') {
        const song = songLibrary[category]?.find(s => s.id === songId);
        if (!song) {
            console.error('Song not found:', songId);
            return false;
        }
        
        this.currentSong = song;
        this.bpm = song.tempo;
        this.currentIndex = 0;
        this.isPlaying = false;
        return true;
    }

    setHandMode(mode) {
        this.handMode = mode;
    }

    getNotesToPlay() {
        if (!this.currentSong) return [];
        
        switch (this.handMode) {
            case 'left':
                return this.currentSong.leftHand;
            case 'right':
                return this.currentSong.rightHand;
            case 'both':
            default:
                // Interleave hands
                const both = [];
                const maxLen = Math.max(this.currentSong.rightHand.length, this.currentSong.leftHand.length);
                for (let i = 0; i < maxLen; i++) {
                    if (this.currentSong.rightHand[i]) both.push({ note: this.currentSong.rightHand[i], hand: 'right' });
                    if (this.currentSong.leftHand[i]) both.push({ note: this.currentSong.leftHand[i], hand: 'left' });
                }
                return both;
        }
    }

    async playNote(note, duration = 0.5) {
        if (!this.audioContext) await this.init();
        
        const freq = this.noteToFrequency(note);
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
        
        if (this.onNotePlayed) {
            this.onNotePlayed(note);
        }
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = note.replace(/\d/g, '');
        const octave = parseInt(note.match(/\d/)?.[0] || '4');
        const noteIndex = notes.indexOf(noteName);
        const semitones = noteIndex + (octave - 4) * 12 + 9;
        return 440 * Math.pow(2, (semitones - 9) / 12);
    }

    async playCurrentNote() {
        const notes = this.getNotesToPlay();
        if (this.currentIndex >= notes.length) return;
        
        const noteObj = notes[this.currentIndex];
        const note = typeof noteObj === 'string' ? noteObj : noteObj.note;
        
        await this.playNote(note);
        this.currentIndex++;
    }

    async playAll() {
        const notes = this.getNotesToPlay();
        const interval = 60000 / this.bpm;
        
        this.isPlaying = true;
        
        for (let i = 0; i < notes.length && this.isPlaying; i++) {
            const noteObj = notes[i];
            const note = typeof noteObj === 'string' ? noteObj : noteObj.note;
            
            await this.playNote(note, interval / 1000 * 0.8);
            await new Promise(r => setTimeout(r, interval * 0.9));
        }
        
        this.isPlaying = false;
    }

    stop() {
        this.isPlaying = false;
    }

    restart() {
        this.currentIndex = 0;
    }

    getProgress() {
        const notes = this.getNotesToPlay();
        return {
            current: this.currentIndex,
            total: notes.length,
            percent: (this.currentIndex / notes.length) * 100
        };
    }
}

// ============== SONG RECOMMENDATIONS ==============
function getSongRecommendations(level, genre = null) {
    const allSongs = [];
    
    for (const [category, songs] of Object.entries(songLibrary)) {
        songs.forEach(song => {
            allSongs.push({ ...song, category });
        });
    }
    
    let filtered = allSongs.filter(s => s.difficulty <= level);
    
    if (genre) {
        filtered = filtered.filter(s => s.category === genre || s.genre === genre);
    }
    
    return filtered.sort((a, b) => a.difficulty - b.difficulty);
}

function getSongForPractice(learnedNotes, level) {
    // Find songs that use notes the user has learned
    const recommendations = getSongRecommendations(level);
    
    return recommendations.filter(song => {
        const allNotes = [...song.rightHand, ...song.leftHand];
        const songNotes = new Set(allNotes.map(n => n.replace(/\d/g, '')));
        
        // Check if user has learned at least 70% of notes in the song
        const knownNotes = [...songNotes].filter(n => learnedNotes.includes(n));
        return knownNotes.length >= songNotes.size * 0.7;
    });
}

// Export
if (typeof window !== 'undefined') {
    window.songLibrary = songLibrary;
    window.SongPlayer = SongPlayer;
    window.getSongRecommendations = getSongRecommendations;
    window.getSongForPractice = getSongForPractice;
}
