// Piano Master - Audio Detection Module
// Real-time pitch detection using Web Audio API

class PianoNoteDetector {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.mediaStream = null;
        this.isListening = false;
        this.onNoteDetected = null;
        this.onNoNote = null;
        
        // Note frequencies (A4 = 440Hz standard)
        this.noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.noteFrequencies = this.generateNoteFrequencies();
        
        // Detection settings
        this.minFrequency = 65;    // C2
        this.maxFrequency = 2000;  // B6
        this.volumeThreshold = 0.01;
        this.stabilityThreshold = 3; // Need 3 consecutive detections
        this.lastDetectedNote = null;
        this.detectionCount = 0;
    }

    generateNoteFrequencies() {
        const frequencies = {};
        // Generate frequencies for 88-key piano (A0 to C8)
        for (let octave = 0; octave <= 8; octave++) {
            for (let note = 0; note < 12; note++) {
                const noteNumber = note + (octave * 12);
                // A4 (note 57) = 440Hz
                const frequency = 440 * Math.pow(2, (noteNumber - 57) / 12);
                const noteName = this.noteStrings[note % 12] + octave;
                frequencies[noteName] = frequency;
            }
        }
        return frequencies;
    }

    async startListening() {
        try {
            // Request microphone access
            this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });

            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create analyser node
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.analyser.smoothingTimeConstant = 0.8;

            // Connect microphone to analyser
            const source = this.audioContext.createMediaStreamSource(this.mediaStream);
            source.connect(this.analyser);

            this.isListening = true;
            this.detectPitch();
            
            return true;
        } catch (error) {
            console.error('Error starting audio detection:', error);
            return false;
        }
    }

    stopListening() {
        this.isListening = false;
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }

    detectPitch() {
        if (!this.isListening) return;

        const buffer = new Float32Array(this.analyser.fftSize);
        this.analyser.getFloatTimeDomainData(buffer);

        // Check volume first
        const volume = this.getVolume(buffer);
        
        if (volume < this.volumeThreshold) {
            // No significant sound
            this.lastDetectedNote = null;
            this.detectionCount = 0;
            if (this.onNoNote) this.onNoNote();
        } else {
            // Detect frequency using autocorrelation
            const frequency = this.autocorrelate(buffer, this.audioContext.sampleRate);
            
            if (frequency > this.minFrequency && frequency < this.maxFrequency) {
                const note = this.frequencyToNote(frequency);
                
                // Stability check
                if (note === this.lastDetectedNote) {
                    this.detectionCount++;
                    if (this.detectionCount >= this.stabilityThreshold) {
                        if (this.onNoteDetected) {
                            this.onNoteDetected({
                                note: note,
                                frequency: frequency,
                                octave: parseInt(note.match(/\d/)?.[0] || '4'),
                                noteName: note.replace(/\d/, ''),
                                volume: volume
                            });
                        }
                    }
                } else {
                    this.lastDetectedNote = note;
                    this.detectionCount = 1;
                }
            }
        }

        // Continue detection loop
        requestAnimationFrame(() => this.detectPitch());
    }

    getVolume(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i];
        }
        return Math.sqrt(sum / buffer.length);
    }

    // Autocorrelation pitch detection
    autocorrelate(buffer, sampleRate) {
        // Find the RMS of the signal
        let rms = 0;
        for (let i = 0; i < buffer.length; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / buffer.length);
        
        if (rms < 0.01) return -1; // Not enough signal

        // Autocorrelation
        let r1 = 0, r2 = buffer.length - 1;
        const threshold = 0.2;
        
        // Find the first point where the signal crosses zero
        for (let i = 0; i < buffer.length; i++) {
            if (Math.abs(buffer[i]) < threshold) {
                r1 = i;
                break;
            }
        }

        // Find the last point where the signal crosses zero
        for (let i = 1; i < buffer.length; i++) {
            if (Math.abs(buffer[buffer.length - i]) < threshold) {
                r2 = buffer.length - i;
                break;
            }
        }

        // Trim the buffer
        buffer = buffer.slice(r1, r2);
        const bufLength = buffer.length;

        // Calculate autocorrelation
        const correlations = new Array(bufLength).fill(0);
        
        for (let i = 0; i < bufLength; i++) {
            for (let j = 0; j < bufLength - i; j++) {
                correlations[i] += buffer[j] * buffer[j + i];
            }
        }

        // Find the first peak after the first minimum
        let maxCorrelation = 0;
        let maxIndex = 0;
        let foundFirstMin = false;
        
        for (let i = 1; i < correlations.length; i++) {
            if (!foundFirstMin) {
                if (correlations[i] < correlations[i - 1]) {
                    foundFirstMin = true;
                }
            } else {
                if (correlations[i] > correlations[i - 1] && correlations[i] > maxCorrelation) {
                    maxCorrelation = correlations[i];
                    maxIndex = i;
                }
            }
        }

        // Calculate frequency
        if (maxIndex > 0) {
            return sampleRate / maxIndex;
        }
        
        return -1;
    }

    frequencyToNote(frequency) {
        // A4 = 440Hz, which is note number 57 (0-indexed from C0)
        const noteNum = 12 * (Math.log2(frequency / 440)) + 57;
        const roundedNoteNum = Math.round(noteNum);
        const octave = Math.floor(roundedNoteNum / 12);
        const noteIndex = roundedNoteNum % 12;
        
        return this.noteStrings[noteIndex] + octave;
    }

    noteToFrequency(note) {
        return this.noteFrequencies[note] || 440;
    }

    // Check if detected note matches target
    checkNote(detected, target) {
        const detectedClean = detected.replace(/\d/, '');
        const targetClean = target.replace(/\d/, '');
        return detectedClean === targetClean;
    }

    // Get cents deviation from target
    getCentsDeviation(detectedFreq, targetFreq) {
        return Math.round(1200 * Math.log2(detectedFreq / targetFreq));
    }
}

// ============== PRACTICE MODE WITH DETECTION ==============
class PracticeWithDetection {
    constructor() {
        this.detector = new PianoNoteDetector();
        this.targetNotes = [];
        this.currentNoteIndex = 0;
        this.correctNotes = 0;
        this.totalAttempts = 0;
        this.isPracticing = false;
        this.onProgress = null;
        this.onComplete = null;
    }

    async startPractice(notes) {
        this.targetNotes = notes;
        this.currentNoteIndex = 0;
        this.correctNotes = 0;
        this.totalAttempts = 0;
        this.isPracticing = true;

        // Configure detector callbacks
        this.detector.onNoteDetected = (noteInfo) => this.handleDetectedNote(noteInfo);
        this.detector.onNoNote = () => {/* Silent when no note detected */};

        return await this.detector.startListening();
    }

    handleDetectedNote(noteInfo) {
        if (!this.isPracticing) return;

        const targetNote = this.targetNotes[this.currentNoteIndex];
        if (!targetNote) return;

        this.totalAttempts++;

        // Check if correct
        const isCorrect = this.detector.checkNote(noteInfo.note, targetNote);
        
        if (isCorrect) {
            this.correctNotes++;
            this.currentNoteIndex++;
            
            if (this.onProgress) {
                this.onProgress({
                    correct: true,
                    note: noteInfo,
                    target: targetNote,
                    index: this.currentNoteIndex,
                    total: this.targetNotes.length
                });
            }

            // Check if complete
            if (this.currentNoteIndex >= this.targetNotes.length) {
                this.endPractice(true);
            }
        } else {
            if (this.onProgress) {
                this.onProgress({
                    correct: false,
                    note: noteInfo,
                    target: targetNote,
                    index: this.currentNoteIndex,
                    total: this.targetNotes.length
                });
            }
        }
    }

    endPractice(completed = false) {
        this.isPracticing = false;
        this.detector.stopListening();

        if (this.onComplete) {
            this.onComplete({
                completed,
                correctNotes: this.correctNotes,
                totalAttempts: this.totalAttempts,
                accuracy: this.totalAttempts > 0 ? this.correctNotes / this.totalAttempts : 0
            });
        }
    }
}

// ============== CHORD DETECTION ==============
class ChordDetector {
    constructor() {
        this.detector = new PianoNoteDetector();
        this.detectedNotes = new Set();
        this.chordTimeout = null;
        this.onChordDetected = null;
    }

    async startListening() {
        this.detector.onNoteDetected = (noteInfo) => {
            this.detectedNotes.add(noteInfo.noteName);
            
            // Clear previous timeout
            if (this.chordTimeout) clearTimeout(this.chordTimeout);
            
            // Wait for chord to complete
            this.chordTimeout = setTimeout(() => {
                this.identifyChord();
            }, 300);
        };

        this.detector.onNoNote = () => {
            // Notes cleared when no sound
        };

        return await this.detector.startListening();
    }

    stopListening() {
        this.detector.stopListening();
    }

    identifyChord() {
        const notes = Array.from(this.detectedNotes);
        
        if (notes.length < 3) {
            this.detectedNotes.clear();
            return;
        }

        // Sort notes
        const sortedNotes = this.sortNotes(notes);
        const chord = this.analyzeChord(sortedNotes);
        
        if (this.onChordDetected && chord) {
            this.onChordDetected(chord);
        }

        this.detectedNotes.clear();
    }

    sortNotes(notes) {
        const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes.sort((a, b) => {
            const indexA = noteOrder.indexOf(a);
            const indexB = noteOrder.indexOf(b);
            return indexA - indexB;
        });
    }

    analyzeChord(notes) {
        // Simplified chord detection
        const chordPatterns = {
            'major': [0, 4, 7],
            'minor': [0, 3, 7],
            'dim': [0, 3, 6],
            'aug': [0, 4, 8],
            'sus2': [0, 2, 7],
            'sus4': [0, 5, 7]
        };

        // Calculate intervals from root
        const root = notes[0];
        const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const rootIndex = noteOrder.indexOf(root);
        
        const intervals = notes.map(n => {
            const noteIndex = noteOrder.indexOf(n);
            return (noteIndex - rootIndex + 12) % 12;
        });

        // Match pattern
        for (const [type, pattern] of Object.entries(chordPatterns)) {
            if (JSON.stringify(intervals.sort()) === JSON.stringify(pattern.sort())) {
                return {
                    name: root + (type === 'major' ? '' : type === 'minor' ? 'm' : type),
                    root: root,
                    type: type,
                    notes: notes
                };
            }
        }

        return { name: notes.join('-'), notes: notes };
    }
}

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.PianoNoteDetector = PianoNoteDetector;
    window.PracticeWithDetection = PracticeWithDetection;
    window.ChordDetector = ChordDetector;
}