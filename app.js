// Piano Master App - Enhanced with Interactive Guidance

// ============== DRILL DATA WITH GUIDANCE ==============

const drills = {
    finger: [
        { 
            id: 'f1', 
            name: 'Hanon Exercise 1', 
            duration: '5 min', 
            description: 'Classic finger strengthening pattern.',
            bpm: 60,
            steps: [
                { instruction: 'Sit at the piano with good posture. Keep your shoulders relaxed and elbows slightly away from your body.', duration: 15 },
                { instruction: 'Place your right hand on C-D-E-F-G (fingers 1-2-3-4-5). Keep your wrist level, not too high or low.', duration: 15 },
                { instruction: 'Play C-E-G-E-C-E-G-E repeatedly. Focus on each finger lifting independently.', duration: 45 },
                { instruction: 'Now play the pattern descending: G-E-C-E-G-E-C-E. Keep the tempo steady.', duration: 45 },
                { instruction: 'Switch to left hand. Place on C-B-A-G-F (fingers 1-2-3-4-5) one octave lower.', duration: 15 },
                { instruction: 'Play the same pattern with left hand. Listen for even volume on each note.', duration: 60 },
                { instruction: 'Now play both hands together. Start very slow — accuracy over speed.', duration: 90 }
            ]
        },
        { 
            id: 'f2', 
            name: 'Five-Finger Patterns', 
            duration: '3 min', 
            description: 'Play C-D-E-F-G focusing on even tone.',
            bpm: 70,
            steps: [
                { instruction: 'Place all five fingers of your right hand on C-D-E-F-G. Curve your fingers like you\'re holding a ball.', duration: 10 },
                { instruction: 'Play C slowly and deliberately. Feel the weight of your arm transfer through your thumb.', duration: 15 },
                { instruction: 'Play D with finger 2. Keep your other fingers relaxed and hovering over their keys.', duration: 15 },
                { instruction: 'Continue up: E (finger 3), F (finger 4), G (finger 5). Each note should sing with the same volume.', duration: 30 },
                { instruction: 'Now descend: G-F-E-D-C. Keep your wrist flexible, not stiff.', duration: 30 },
                { instruction: 'Repeat the ascending and descending pattern 5 times. Focus on smooth, connected playing.', duration: 60 }
            ]
        },
        { 
            id: 'f3', 
            name: 'Finger Lifting', 
            duration: '2 min', 
            description: 'Lift each finger independently while others stay down.',
            bpm: null,
            steps: [
                { instruction: 'Place all five fingers on the keys (C-D-E-F-G). Press all keys down gently.', duration: 10 },
                { instruction: 'Lift only your thumb (finger 1) while keeping fingers 2-3-4-5 pressed down. Hold for 3 seconds.', duration: 15 },
                { instruction: 'Lower the thumb. Now lift only finger 2. Keep the others down. This is harder than it sounds!', duration: 15 },
                { instruction: 'Continue with finger 3, then 4, then 5. Each time, only one finger moves.', duration: 30 },
                { instruction: 'If a finger struggles (usually 4), go back and work on it separately. Repeat 3 more times.', duration: 50 }
            ]
        },
        { 
            id: 'f4', 
            name: 'Thumb Under Pass', 
            duration: '4 min', 
            description: 'Practice smooth thumb transitions for scales.',
            bpm: 60,
            steps: [
                { instruction: 'Place right hand on C-D-E-F (fingers 1-2-3-4). Your thumb is on C.', duration: 10 },
                { instruction: 'Play C-D-E. As you play E with finger 3, start moving your thumb UNDER your hand toward F.', duration: 20 },
                { instruction: 'Pass your thumb under and land on F. Play F smoothly — there should be no gap between E and F.', duration: 20 },
                { instruction: 'Now play F-G-A-B. When you reach B with finger 4, cross finger 3 OVER your thumb to C.', duration: 30 },
                { instruction: 'Practice this C-D-E-F-G-A-B-C pattern 10 times. The thumb pass should feel like one fluid motion.', duration: 120 }
            ]
        },
        { 
            id: 'f5', 
            name: 'Trill Exercise', 
            duration: '3 min', 
            description: 'Alternate rapidly between two fingers.',
            bpm: 80,
            steps: [
                { instruction: 'Place fingers 2 and 3 on E and F (or any two adjacent white keys).', duration: 10 },
                { instruction: 'Play E-F-E-F slowly. Keep both fingers close to the keys — don\'t lift them high.', duration: 20 },
                { instruction: 'Gradually speed up: E-F-E-F-E-F. Stay relaxed. If you feel tension, slow down.', duration: 30 },
                { instruction: 'Now try fingers 3 and 4. This is usually harder — your ring finger shares a tendon.', duration: 40 },
                { instruction: 'Try fingers 1 and 2 (thumb and index). Keep your wrist loose and bouncy.', duration: 40 },
                { instruction: 'End by trilling each pair for 20 seconds. Focus on evenness, not speed.', duration: 60 }
            ]
        }
    ],
    coordination: [
        { 
            id: 'c1', 
            name: 'Mirror Scales', 
            duration: '5 min', 
            description: 'Play scales with both hands moving together.',
            bpm: 65,
            steps: [
                { instruction: 'Place right hand thumb on middle C. Place left hand pinky on the C one octave lower.', duration: 15 },
                { instruction: 'Both hands will play C at the same time. Press both keys simultaneously.', duration: 10 },
                { instruction: 'Play the C major scale ascending: both hands play the same note at the same time. Right: C-D-E-F-G-A-B-C, Left: C-D-E-F-G-A-B-C (fingerings differ).', duration: 60 },
                { instruction: 'Listen carefully — are both hands perfectly together? If not, slow down.', duration: 30 },
                { instruction: 'Now descend: both hands play C-B-A-G-F-E-D-C together.', duration: 60 },
                { instruction: 'Repeat 5 times. Focus on the thumb transitions happening at the same time in both hands.', duration: 105 }
            ]
        },
        { 
            id: 'c2', 
            name: 'Contrary Motion', 
            duration: '4 min', 
            description: 'Hands move in opposite directions.',
            bpm: 60,
            steps: [
                { instruction: 'Both thumbs start on middle C. They\'ll play the same note, then move apart.', duration: 15 },
                { instruction: 'Right hand goes UP: C-D-E-F-G. Left hand goes DOWN: C-B-A-G-F.', duration: 45 },
                { instruction: 'Play together: C(both)-D/B-E/A-F/G-G/F. The middle notes meet in the middle!', duration: 45 },
                { instruction: 'Now reverse direction: right hand descends while left hand ascends back to C.', duration: 45 },
                { instruction: 'Practice this pattern 8 times. Start slow enough that you can think about each note.', duration: 90 }
            ]
        },
        { 
            id: 'c3', 
            name: 'Different Rhythms', 
            duration: '5 min', 
            description: 'Each hand plays a different rhythm.',
            bpm: 70,
            steps: [
                { instruction: 'Right hand plays quarter notes: C-C-C-C (one note per beat).', duration: 20 },
                { instruction: 'Left hand plays half notes: C——G—— (one note every two beats).', duration: 20 },
                { instruction: 'Now play together. Right hand plays 4 notes while left hand plays 2.', duration: 60 },
                { instruction: 'Switch: Left hand plays quarter notes, right hand plays half notes.', duration: 60 },
                { instruction: 'Advanced: Right hand plays eighth notes (2 per beat), left plays quarters.', duration: 80 },
                { instruction: 'This trains your brain to control each hand independently. Repeat 5 times.', duration: 100 }
            ]
        },
        { 
            id: 'c4', 
            name: 'Chord Inversions', 
            duration: '4 min', 
            description: 'Play chord inversions with both hands.',
            bpm: 60,
            steps: [
                { instruction: 'Play a C major chord: C-E-G with both hands (right hand in higher octave).', duration: 15 },
                { instruction: 'This is "root position" — C is on the bottom. Hold for 4 beats.', duration: 15 },
                { instruction: 'Move to "first inversion": E-G-C. The E is now on bottom. Play with both hands.', duration: 30 },
                { instruction: 'Move to "second inversion": G-C-E. The G is on bottom. Play with both hands.', duration: 30 },
                { instruction: 'Cycle through all three: C-E-G → E-G-C → G-C-E → C-E-G. Smooth transitions!', duration: 60 },
                { instruction: 'Now try with F major and G major chords. Same pattern: root → 1st inv → 2nd inv → root.', duration: 90 }
            ]
        },
        { 
            id: 'c5', 
            name: 'Hand Independence', 
            duration: '6 min', 
            description: 'Left hand bass, right hand melody.',
            bpm: 65,
            steps: [
                { instruction: 'Left hand plays a simple bass pattern: C (2 beats), G (2 beats), repeat.', duration: 30 },
                { instruction: 'Practice this left hand alone until it\'s automatic. Keep a steady pulse.', duration: 60 },
                { instruction: 'Now add right hand playing just whole notes: C (4 beats), then G (4 beats).', duration: 60 },
                { instruction: 'Make the right hand more melodic: C-D-E-F, G-A-G-F.', duration: 90 },
                { instruction: 'The key is: don\'t let your right hand affect your left hand\'s steady rhythm.', duration: 60 },
                { instruction: 'If it falls apart, go back to hands separate. Build it back up slowly.', duration: 60 }
            ]
        }
    ],
    speed: [
        { 
            id: 's1', 
            name: 'Scale Sprints', 
            duration: '4 min', 
            description: 'Play scales as fast as possible, then rest.',
            bpm: 100,
            steps: [
                { instruction: 'Play C major scale ascending, one octave, as fast as you can cleanly.', duration: 15 },
                { instruction: 'Stop. Shake out your hands. Relax your shoulders.', duration: 15 },
                { instruction: 'Play it again, trying to match or beat your speed. Note any mistakes.', duration: 20 },
                { instruction: 'If you made mistakes, slow down until it\'s clean. Speed comes from control.', duration: 30 },
                { instruction: 'Now try two octaves. Same approach: maximum speed, then assess.', duration: 45 },
                { instruction: 'End with three octaves. By now you should have found your "edge" speed.', duration: 75 }
            ]
        },
        { 
            id: 's2', 
            name: 'Arpeggio Runs', 
            duration: '5 min', 
            description: 'Play broken chords fluidly.',
            bpm: 85,
            steps: [
                { instruction: 'Play C major arpeggio: C-E-G-C (ascending), then C-G-E-C (descending).', duration: 30 },
                { instruction: 'Think of your hand as a spider crawling up the keys. Thumb leads, fingers follow.', duration: 30 },
                { instruction: 'Try G major arpeggio: G-B-D-G. Watch the B — it\'s a white key but feels different.', duration: 60 },
                { instruction: 'Add F major: F-A-C-F. This one requires good thumb position.', duration: 60 },
                { instruction: 'Play all three arpeggios in sequence: C → F → G → C. Smooth transitions!', duration: 60 },
                { instruction: 'Repeat the full sequence 5 times, slightly faster each time.', duration: 60 }
            ]
        },
        { 
            id: 's3', 
            name: 'Metronome Ladder', 
            duration: '6 min', 
            description: 'Gradually increase tempo.',
            bpm: 60,
            steps: [
                { instruction: 'Set metronome to 60 BPM. Play C major scale at this tempo. Should feel easy.', duration: 30 },
                { instruction: 'Increase to 65 BPM. Play again. Still comfortable?', duration: 30 },
                { instruction: 'Increase to 70, then 75, then 80. Keep going as long as you stay in control.', duration: 90 },
                { instruction: 'When you start making mistakes, that\'s your limit for today. Note it.', duration: 30 },
                { instruction: 'Drop back 10 BPM and play perfectly at that speed to finish.', duration: 60 },
                { instruction: 'Do this drill daily — you\'ll see your max tempo improve over weeks.', duration: 60 }
            ]
        },
        { 
            id: 's4', 
            name: 'Burst Practice', 
            duration: '3 min', 
            description: 'Short fast bursts with rest.',
            bpm: null,
            steps: [
                { instruction: 'Play just 4 notes: C-D-E-F. Play them as fast as possible, then stop.', duration: 20 },
                { instruction: 'Rest for 3 seconds. Shake your hand. Stay relaxed.', duration: 15 },
                { instruction: 'Play the same 4 notes fast again. Was it clean? Any tension?', duration: 20 },
                { instruction: 'Now try 6 notes: C-D-E-F-G-A. Burst, rest, repeat.', duration: 30 },
                { instruction: 'The rest is crucial. Never practice bursts continuously — you\'ll build tension.', duration: 30 },
                { instruction: 'End with an 8-note burst: C-D-E-F-G-A-B-C. Perfect landing on high C.', duration: 45 }
            ]
        },
        { 
            id: 's5', 
            name: 'Parallel Sets', 
            duration: '4 min', 
            description: 'Groups of notes in one hand position.',
            bpm: 90,
            steps: [
                { instruction: 'Play C-D-E-F-G with fingers 1-2-3-4-5. All five notes without changing position.', duration: 30 },
                { instruction: 'This is a "parallel set" — your hand doesn\'t need to move or cross over.', duration: 20 },
                { instruction: 'Play this set 10 times fast. Your hand should feel stable.', duration: 40 },
                { instruction: 'Now try different starting fingers: Play E-F-G-A-B (fingers 1-2-3-4-5 starting on E).', duration: 40 },
                { instruction: 'Try sets from different keys: G-A-B-C-D, D-E-F-G-A, etc.', duration: 60 },
                { instruction: 'Parallel sets build speed without the complexity of crossing thumbs.', duration: 50 }
            ]
        }
    ],
    rhythm: [
        { 
            id: 'r1', 
            name: 'Off-Beat Accents', 
            duration: '3 min', 
            description: 'Accent the weak beats.',
            bpm: 75,
            steps: [
                { instruction: 'Play C major scale normally: C-D-E-F-G-A-B-C, accenting the first note of each beat.', duration: 30 },
                { instruction: 'Now play it again, but accent the SECOND note of each pair: C-D-E-F-G-A-B-C.', duration: 30 },
                { instruction: 'Feel how different this is? The "ands" get the stress, not the downbeats.', duration: 30 },
                { instruction: 'This is how jazz and pop music often feel. Practice until it\'s natural.', duration: 45 },
                { instruction: 'Try with a different scale: G major. Same accented pattern.', duration: 45 }
            ]
        },
        { 
            id: 'r2', 
            name: 'Swing vs Straight', 
            duration: '4 min', 
            description: 'Feel the difference between swing and straight eighth notes.',
            bpm: 80,
            steps: [
                { instruction: 'Play straight eighth notes: C-D-E-F-G-A-B-C, each note exactly equal length.', duration: 45 },
                { instruction: 'Now "swing" it: The first eighth note is longer, the second is shorter. DA-da-DA-da.', duration: 45 },
                { instruction: 'Think "humpty-dumpty" rhythm. The first part of each beat gets more weight.', duration: 30 },
                { instruction: 'Alternate: 4 beats straight, 4 beats swing. Feel the difference in your body.', duration: 60 },
                { instruction: 'Jazz is almost always swung. Classical is almost always straight.', duration: 60 }
            ]
        },
        { 
            id: 'r3', 
            name: 'Polyrhythm 2:3', 
            duration: '5 min', 
            description: 'Two against three.',
            bpm: 50,
            steps: [
                { instruction: 'This is advanced! Say "NOT dif-fi-cult" repeatedly. That\'s 3 syllables.', duration: 20 },
                { instruction: 'Right hand plays on "NOT" and "-cult". Left hand plays on "NOT", "fi", "cult".', duration: 30 },
                { instruction: 'Slowly: Right hand plays 2 evenly-spaced notes while left plays 3 evenly-spaced notes.', duration: 45 },
                { instruction: 'The pattern: NOT (both), dif (left), fi (left), cult (both). Go VERY slowly.', duration: 60 },
                { instruction: 'Practice hands separate first. Then try together at a snail\'s pace.', duration: 60 },
                { instruction: 'This polyrhythm is used in Debussy, jazz, and African music. It\'s worth learning!', duration: 45 }
            ]
        },
        { 
            id: 'r4', 
            name: 'Syncopation Practice', 
            duration: '4 min', 
            description: 'Accent the off-beats.',
            bpm: 85,
            steps: [
                { instruction: 'Count 1-2-3-4 out loud. Tap your foot on each number.', duration: 20 },
                { instruction: 'Now play C on counts 1, 2, 3, 4. Simple, right?', duration: 20 },
                { instruction: 'Now play C on the "and" after each beat: 1-AND-2-AND-3-AND-4-AND.', duration: 40 },
                { instruction: 'That\'s syncopation — the notes happen OFF the main beats.', duration: 30 },
                { instruction: 'Combine: Play on the beats AND the off-beats. Every eighth note.', duration: 45 },
                { instruction: 'Now accent only the off-beats. This is the "backbeat" feel of rock and pop.', duration: 65 }
            ]
        },
        { 
            id: 'r5', 
            name: 'Triplets Feel', 
            duration: '3 min', 
            description: 'Three notes per beat.',
            bpm: 70,
            steps: [
                { instruction: 'A triplet is three notes squeezed into the space of two. Say "tri-pl-et".', duration: 20 },
                { instruction: 'Play C-D-E as a triplet on beat 1. Then F-G-A as a triplet on beat 2.', duration: 30 },
                { instruction: 'The feel should be smooth and rolling, not jerky or rushed.', duration: 30 },
                { instruction: 'Play a full measure: C-D-E (triplet), F-G-A (triplet), G-F-E (triplet), D-C-B (triplet).', duration: 45 },
                { instruction: 'Triplets appear in everything from Mozart to jazz to Taylor Swift.', duration: 35 },
                { instruction: 'End by playing 4 measures of continuous triplets. Keep them even!', duration: 40 }
            ]
        }
    ]
};

// ============== SCALES DATA ==============

const scales = {
    major: {
        'C': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'No sharps or flats. Start here!' },
        'G': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'One sharp: F#. Remember to play the black key!' },
        'D': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'Two sharps: F# and C#' },
        'A': { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'Three sharps: F#, C#, G#' },
        'E': { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'Four sharps: F#, C#, G#, D#' },
        'F': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'], fingering: { right: '1-2-3-4-1-2-3-4', left: '5-4-3-2-1-3-2-1' }, tips: 'One flat: Bb. Right hand fingering is different!' },
        'Bb': { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'], fingering: { right: '2-1-2-1-2-3-1-2', left: '3-2-1-4-3-2-1-2' }, tips: 'Two flats: Bb, Eb. Tricky fingering!' }
    },
    minor: {
        'A': { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'A minor is the relative minor of C major — same key signature!' },
        'E': { notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'One sharp: F#. Same as G major key signature.' },
        'D': { notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' }, tips: 'One flat: Bb. Same as F major key signature.' }
    }
};

// ============== SONGS DATA ==============

const songs = [
    {
        id: 'song1',
        title: 'Ode to Joy',
        composer: 'Beethoven',
        level: 'beginner',
        key: 'G major',
        tempo: 'Moderato (100-120 BPM)',
        timeSignature: '4/4',
        notes: {
            rightHand: ['G', 'G', 'A', 'B', 'B', 'A', 'G', 'F#', 'E', 'E', 'D', 'D', 'E', 'G', 'G', 'E'],
            leftHand: ['G', 'D', 'G', 'D', 'G', 'D', 'G', 'D', 'C', 'G', 'C', 'G', 'C', 'G', 'D', 'G']
        },
        steps: [
            { instruction: 'Right hand plays: G-G-A-B (beat 1-4). Practice just these 4 notes until smooth.', focus: 'Melody' },
            { instruction: 'Continue: B-A-G-F# (beat 5-8). Notice how it returns to the starting note.', focus: 'Melody' },
            { instruction: 'Third phrase: E-E-D-D (beat 9-12). These are longer notes — hold each one.', focus: 'Melody' },
            { instruction: 'Final phrase: E-G-G-E (beat 13-16). End on E, which leads back to the beginning.', focus: 'Melody' },
            { instruction: 'Now add left hand. It plays simple bass notes: G on beat 1, D on beat 3, etc.', focus: 'Accompaniment' },
            { instruction: 'Combine hands slowly. The melody should sing above the bass — keep it louder.', focus: 'Together' }
        ],
        tips: ['Start hands separate', 'Count 1-2-3-4 out loud', 'The melody should be louder than the bass']
    },
    {
        id: 'song2',
        title: 'Twinkle Twinkle Little Star',
        composer: 'Traditional',
        level: 'beginner',
        key: 'C major',
        tempo: 'Moderate (90-110 BPM)',
        timeSignature: '4/4',
        notes: {
            rightHand: ['C', 'C', 'G', 'G', 'A', 'A', 'G', '-', 'F', 'F', 'E', 'E', 'D', 'D', 'C'],
            leftHand: ['C', 'G', 'C', 'F', 'C', 'G', 'C']
        },
        steps: [
            { instruction: 'Right hand: C-C-G-G (Twinkle twinkle). Play slowly, each note gets one beat.', focus: 'Melody' },
            { instruction: 'Continue: A-A-G (little star). The A\'s are higher than G.', focus: 'Melody' },
            { instruction: 'Next: F-F-E-E-D-D-C (how I wonder what you are). Descending pattern.', focus: 'Melody' },
            { instruction: 'Practice the full melody 5 times without left hand.', focus: 'Melody' },
            { instruction: 'Left hand plays simple chords: C major, then G major, then F major, back to C.', focus: 'Accompaniment' },
            { instruction: 'Put it together: melody in right hand, simple chords in left hand.', focus: 'Together' }
        ],
        tips: ['Perfect first song for beginners', 'Use fingers 1-2-3 for C-D-E positions', 'Keep a steady beat']
    },
    {
        id: 'song3',
        title: 'Happy Birthday',
        composer: 'Traditional',
        level: 'beginner',
        key: 'F major',
        tempo: 'Moderate (100 BPM)',
        timeSignature: '3/4',
        notes: {
            rightHand: ['C', 'C', 'D', 'C', 'F', 'E', 'C', 'C', 'D', 'C', 'G', 'F'],
            leftHand: ['F', 'C', 'Bb', 'F', 'C', 'F']
        },
        steps: [
            { instruction: 'This is in 3/4 time: ONE-two-three, ONE-two-three. Count out loud.', focus: 'Rhythm' },
            { instruction: 'Right hand starts: C-C-D-C (Hap-py birth-day). The first two C\'s are pickup notes.', focus: 'Melody' },
            { instruction: 'Continue: F-E (to you). F is high, E is right below it.', focus: 'Melody' },
            { instruction: 'Next phrase: C-C-D-C-G-F (Hap-py birth-day to you). Ends on F.', focus: 'Melody' },
            { instruction: 'Left hand plays the chord roots: F, C, Bb. Change on beat 1 of each measure.', focus: 'Accompaniment' },
            { instruction: 'Practice the syncopation — "HAP-py" starts before the downbeat.', focus: 'Together' }
        ],
        tips: ['The pickup notes make it tricky', 'Practice the rhythm separately', 'F major has one flat: Bb']
    },
    {
        id: 'song4',
        title: 'Für Elise',
        composer: 'Beethoven',
        level: 'intermediate',
        key: 'A minor',
        tempo: 'Poco moto (120 BPM)',
        timeSignature: '3/8',
        notes: {
            rightHand: ['E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4'],
            leftHand: ['A3', 'E4', 'A4', 'E4', 'A3', 'E4']
        },
        steps: [
            { instruction: 'The famous opening: E-D#-E-D#-E. Play these five notes smoothly and evenly.', focus: 'Melody' },
            { instruction: 'Continue: B-D-C-A. These are spaced out — feel the melody line.', focus: 'Melody' },
            { instruction: 'Left hand enters on A. It plays A-E-A-E pattern throughout.', focus: 'Accompaniment' },
            { instruction: 'The D# is crucial — it\'s the leading tone. Make it slightly softer than the E.', focus: 'Expression' },
            { instruction: 'Practice the left hand alone until it\'s automatic. It stays steady throughout.', focus: 'Accompaniment' },
            { instruction: 'Combine slowly. The melody should float above the accompaniment.', focus: 'Together' }
        ],
        tips: ['Watch the D# — it\'s a black key', 'Keep left hand light and steady', 'The melody should sing']
    },
    {
        id: 'song5',
        title: 'Canon in D (Simplified)',
        composer: 'Pachelbel',
        level: 'intermediate',
        key: 'D major',
        tempo: 'Adagio (60 BPM)',
        timeSignature: '4/4',
        notes: {
            rightHand: ['F#', 'E', 'D', 'C#', 'B', 'A', 'B', 'C#'],
            leftHand: ['D', 'A', 'B', 'F#', 'G', 'D', 'G', 'A']
        },
        steps: [
            { instruction: 'Left hand plays the famous 8-chord progression: D-A-Bm-F#m-G-D-Em-A.', focus: 'Bass Line' },
            { instruction: 'This progression repeats throughout. Memorize it — D-A-B-F#-G-D-G-A.', focus: 'Bass Line' },
            { instruction: 'Right hand melody starts simply: F#-E-D-C# (quarter notes).', focus: 'Melody' },
            { instruction: 'Each variation gets more complex. Start with the simple version.', focus: 'Melody' },
            { instruction: 'Practice left hand alone until you can play it without thinking.', focus: 'Bass Line' },
            { instruction: 'Add right hand melody. Stay slow — the beauty is in the steadiness.', focus: 'Together' }
        ],
        tips: ['The bass line is the foundation', 'Play it slower than you think', 'Let each chord ring']
    },
    {
        id: 'song6',
        title: 'River Flows in You',
        composer: 'Yiruma',
        level: 'intermediate',
        key: 'A major',
        tempo: 'Andante (80 BPM)',
        timeSignature: '4/4',
        notes: {
            rightHand: ['C#5', 'B4', 'A4', 'G#4', 'F#4', 'E4', 'F#4', 'G#4'],
            leftHand: ['A', 'C#m', 'D', 'A', 'Bm', 'E', 'F#m', 'E']
        },
        steps: [
            { instruction: 'Left hand plays flowing arpeggios: A-C#-E, then C#-E-G#, etc.', focus: 'Arpeggios' },
            { instruction: 'Practice the left hand pattern: root-third-fifth, ascending smoothly.', focus: 'Arpeggios' },
            { instruction: 'Right hand melody: C#-B-A-G# (first 4 notes). Play expressively.', focus: 'Melody' },
            { instruction: 'Continue: F#-E-F#-G#. This phrase builds upward.', focus: 'Melody' },
            { instruction: 'The left hand should be soft and flowing — think water.', focus: 'Expression' },
            { instruction: 'Right hand should sing above. Bring out the melody.', focus: 'Together' }
        ],
        tips: ['Left hand arpeggios should flow like water', 'Use pedal to connect chords', 'Express the emotion']
    },
    {
        id: 'song7',
        title: 'Let It Be',
        composer: 'The Beatles',
        level: 'beginner',
        key: 'C major',
        tempo: 'Moderate (90 BPM)',
        timeSignature: '4/4',
        notes: {
            rightHand: ['G', 'A', 'G', 'E', 'D', 'C', 'G', '-', 'A', 'G', 'E', 'D', 'C', 'C'],
            leftHand: ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'C']
        },
        steps: [
            { instruction: 'Chord progression: C-G-Am-F. This repeats through most of the song.', focus: 'Chords' },
            { instruction: 'Left hand plays these chords on beats 1 and 3 of each measure.', focus: 'Chords' },
            { instruction: 'Right hand melody: "When I find myself" — G-A-G-E-D-C.', focus: 'Melody' },
            { instruction: 'The chorus "Let it be" — starts on high G and descends.', focus: 'Melody' },
            { instruction: 'Practice chord changes: C to G (easy), G to Am (move all fingers), Am to F (slide 3rd finger).', focus: 'Chords' },
            { instruction: 'Play melody over chords. The rhythm is flexible, not rigid.', focus: 'Together' }
        ],
        tips: ['The 4-chord pattern is very common', 'Learn C, G, Am, F — you\'ll use them forever', 'Sing along] };

// ============== STATE ==============
let state = {
    completedDrills: JSON.parse(localStorage.getItem('completedDrills') || '[]'),
    learnedScales: JSON.parse(localStorage.getItem('learnedScales') || '[]'),
    learnedSongs: JSON.parse(localStorage.getItem('learnedSongs') || '[]'),
    practiceLog: JSON.parse(localStorage.getItem('practiceLog') || '[]'),
    streak: parseInt(localStorage.getItem('streak') || '0'),
    lastPractice: localStorage.getItem('lastPractice') || null
};

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderDrills();
    renderSongs();
    renderProgress();
    initScaleControls();
    renderPiano();
    initModals();
});

// ============== NAVIGATION ==============
function initNav() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const section = btn.dataset.section;
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });
}

// ============== DRILLS ==============
function renderDrills() {
    renderDrillCategory('finger-drills', drills.finger);
    renderDrillCategory('coordination-drills', drills.coordination);
    renderDrillCategory('speed-drills', drills.speed);
    renderDrillCategory('rhythm-drills', drills.rhythm);
}

function renderDrillCategory(containerId, drillList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = drillList.map(drill => `
        <div class="drill-item ${state.completedDrills.includes(drill.id) ? 'completed' : ''}" data-drill-id="${drill.id}">
            <div class="drill-info">
                <h4>${drill.name}</h4>
                <span>${drill.duration} • ${drill.bpm ? drill.bpm + ' BPM' : 'Your pace'}</span>
            </div>
            <span class="drill-status">${state.completedDrills.includes(drill.id) ? '✅' : '▶️'}</span>
        </div>
    `).join('');

    container.querySelectorAll('.drill-item').forEach(item => {
        item.addEventListener('click', () => openDrillModal(item.dataset.drillId));
    });
}

function openDrillModal(drillId) {
    const allDrills = [...drills.finger, ...drills.coordination, ...drills.speed, ...drills.rhythm];
    const drill = allDrills.find(d => d.id === drillId);
    if (!drill) return;

    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    let currentStep = 0;
    let timeLeft = drill.steps[0]?.duration || 30;
    let isRunning = false;
    let timer = null;

    function renderStep() {
        const step = drill.steps[currentStep];
        if (!step) {
            completeDrill();
            return;
        }
        
        content.innerHTML = `
            <div class="drill-practice">
                <h3>${drill.name}</h3>
                <div class="step-progress">
                    Step ${currentStep + 1} of ${drill.steps.length}
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentStep + 1) / drill.steps.length) * 100}%"></div>
                    </div>
                </div>
                <div class="step-instruction">
                    <p class="instruction-text">${step.instruction}</p>
                </div>
                <div class="drill-timer" id="drill-timer">${formatTime(timeLeft)}</div>
                <div class="metronome-hint" ${!drill.bpm ? 'style="display:none"' : ''}>
                    🎵 Suggested tempo: ${drill.bpm} BPM
                </div>
                <div class="drill-controls">
                    <button class="btn-start" id="start-drill">${isRunning ? 'Running...' : 'Start Timer'}</button>
                    <button class="btn-next" id="next-step">Next Step →</button>
                    <button class="btn-prev" id="prev-step" ${currentStep === 0 ? 'disabled' : ''}>← Previous</button>
                </div>
            </div>
        `;

        document.getElementById('start-drill').addEventListener('click', toggleTimer);
        document.getElementById('next-step').addEventListener('click', nextStep);
        document.getElementById('prev-step')?.addEventListener('click', prevStep);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function toggleTimer() {
        isRunning = !isRunning;
        if (isRunning) {
            timer = setInterval(() => {
                timeLeft--;
                const timerEl = document.getElementById('drill-timer');
                if (timerEl) timerEl.textContent = formatTime(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    nextStep();
                }
            }, 1000);
        } else {
            clearInterval(timer);
        }
        renderStep();
    }

    function nextStep() {
        clearInterval(timer);
        isRunning = false;
        currentStep++;
        if (currentStep >= drill.steps.length) {
            completeDrill();
        } else {
            timeLeft = drill.steps[currentStep].duration;
            renderStep();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            clearInterval(timer);
            isRunning = false;
            currentStep--;
            timeLeft = drill.steps[currentStep].duration;
            renderStep();
        }
    }

    function completeDrill() {
        if (!state.completedDrills.includes(drillId)) {
            state.completedDrills.push(drillId);
            localStorage.setItem('completedDrills', JSON.stringify(state.completedDrills));
            logPractice(`Completed drill: ${drill.name}`);
            renderDrills();
            renderProgress();
        }
        modal.classList.remove('active');
        clearInterval(timer);
    }

    modal.classList.add('active');
    renderStep();
}

// ============== SCALES ==============
function initScaleControls() {
    document.getElementById('generate-scale')?.addEventListener('click', generateScaleExercise);
}

function generateScaleExercise() {
    const type = document.getElementById('scale-type').value;
    const root = document.getElementById('key-root').value;
    
    const scaleData = scales[type]?.[root];
    if (!scaleData) {
        document.getElementById('scale-info').innerHTML = '<h3>Scale not available</h3>';
        return;
    }

    highlightPianoKeys(scaleData.notes);

    document.getElementById('scale-info').innerHTML = `
        <h3>${root} ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <div class="scale-notes">
            ${scaleData.notes.map(n => `<span class="note-badge">${n}</span>`).join('')}
        </div>
        <div class="scale-fingering">
            <p><strong>Right Hand:</strong> ${scaleData.fingering.right}</p>
            <p><strong>Left Hand:</strong> ${scaleData.fingering.left}</p>
        </div>
        <p class="scale-tip">💡 ${scaleData.tips}</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-start" onclick="openScalePractice('${root}', '${type}')">Practice →</button>
            <button class="btn-start" onclick="startScalePracticeWithDetection('${type}', '${root}')" style="background: var(--success);">🎤 Listen & Check</button>
        </div>
    `;
}

function renderPiano() {
    const piano = document.getElementById('piano-visual');
    if (!piano) return;
    
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = { 'C': 'C#', 'D': 'D#', 'F': 'F#', 'G': 'G#', 'A': 'A#' };
    
    let html = '<div class="piano-keys">';
    for (let octave = 0; octave < 2; octave++) {
        whiteKeys.forEach(key => {
            html += `<div class="piano-key white" data-note="${key}">${key}</div>`;
            if (blackKeys[key]) {
                html += `<div class="piano-key black" data-note="${blackKeys[key]}"></div>`;
            }
        });
    }
    html += '</div>';
    piano.innerHTML = html;
}

function highlightPianoKeys(notes) {
    document.querySelectorAll('.piano-key').forEach(key => key.classList.remove('highlighted'));
    notes.forEach(note => {
        const key = document.querySelector(`[data-note="${note}"]`);
        if (key) key.classList.add('highlighted');
    });
}

function openScalePractice(root, type) {
    const scaleData = scales[type][root];
    if (!scaleData) return;

    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="drill-practice">
            <h3>${root} ${type.charAt(0).toUpperCase() + type.slice(1)} Scale Practice</h3>
            <div class="scale-steps">
                <h4>Step-by-Step:</h4>
                <ol>
                    <li><strong>Right hand alone:</strong> Play ${scaleData.notes.join(' → ')} slowly. Use fingers ${scaleData.fingering.right}.</li>
                    <li><strong>Left hand alone:</strong> Play the same pattern one octave lower. Use fingers ${scaleData.fingering.left}.</li>
                    <li><strong>Hands together:</strong> Play both hands at the same time, slowly.</li>
                    <li><strong>Speed up:</strong> Gradually increase tempo until comfortable.</li>
                </ol>
            </div>
            <div class="scale-tip-box">
                <p>💡 ${scaleData.tips}</p>
            </div>
            <div class="drill-timer" id="drill-timer">00:00</div>
            <div class="drill-controls">
                <button class="btn-start" id="start-timer">Start Timer</button>
                <button class="btn-complete" id="complete-scale">Mark as Learned</button>
            </div>
        </div>
    `;

    let seconds = 0;
    let interval = null;
    let isRunning = false;

    document.getElementById('start-timer').addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            this.textContent = 'Stop';
            interval = setInterval(() => {
                seconds++;
                document.getElementById('drill-timer').textContent = 
                    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
            }, 1000);
        } else {
            isRunning = false;
            this.textContent = 'Start Timer';
            clearInterval(interval);
        }
    });

    document.getElementById('complete-scale').addEventListener('click', () => {
        const key = `${root}-${type}`;
        if (!state.learnedScales.includes(key)) {
            state.learnedScales.push(key);
            localStorage.setItem('learnedScales', JSON.stringify(state.learnedScales));
            logPractice(`Practiced scale: ${root} ${type}`);
            renderProgress();
        }
        modal.classList.remove('active');
        clearInterval(interval);
    });

    modal.classList.add('active');
}

// ============== SONGS ==============
function renderSongs() {
    renderSongList('all');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSongList(btn.dataset.level);
        });
    });
}

function renderSongList(level) {
    const filtered = level === 'all' ? songs : songs.filter(s => s.level === level);
    const container = document.getElementById('song-list');
    if (!container) return;
    
    container.innerHTML = filtered.map(song => `
        <div class="song-card" data-song-id="${song.id}">
            <h3>${song.title}</h3>
            <div class="song-meta">
                <span>${song.composer}</span>
                <span>${song.key}</span>
            </div>
            <span class="level-badge ${song.level}">${song.level}</span>
        </div>
    `).join('');

    container.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => openSongModal(card.dataset.songId));
    });
}

function openSongModal(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const modal = document.getElementById('song-modal');
    const content = document.getElementById('song-content');
    
    let currentStep = 0;

    function renderSongStep() {
        const step = song.steps[currentStep];
        
        content.innerHTML = `
            <div class="song-lesson">
                <h3>${song.title}</h3>
                <p class="song-lesson-meta">${song.composer} • ${song.key} • ${song.tempo}</p>
                
                <div class="step-progress">
                    Step ${currentStep + 1} of ${song.steps.length} — <strong>${step.focus}</strong>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentStep + 1) / song.steps.length) * 100}%"></div>
                    </div>
                </div>
                
                <div class="lesson-section">
                    <p class="step-instruction">${step.instruction}</p>
                </div>
                
                <div class="notes-display">
                    <div class="hand-notes">
                        <h4>Right Hand:</h4>
                        <div class="note-flow">${song.notes.rightHand.slice(0, 8).join(' → ')}</div>
                    </div>
                    <div class="hand-notes">
                        <h4>Left Hand:</h4>
                        <div class="note-flow">${song.notes.leftHand.slice(0, 8).join(' → ')}</div>
                    </div>
                </div>
                
                <div class="drill-controls">
                    <button class="btn-prev" id="prev-step" ${currentStep === 0 ? 'disabled' : ''}>← Previous</button>
                    <button class="btn-start" id="next-step">${currentStep === song.steps.length - 1 ? 'Finish' : 'Next Step →'}</button>
                </div>
                
                <div class="practice-tips">
                    <h4>💡 Tips:</h4>
                    <ul>${song.tips.map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
            </div>
        `;

        document.getElementById('next-step').addEventListener('click', () => {
            currentStep++;
            if (currentStep >= song.steps.length) {
                completeSong();
            } else {
                renderSongStep();
            }
        });

        document.getElementById('prev-step')?.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                renderSongStep();
            }
        });
    }

    function completeSong() {
        if (!state.learnedSongs.includes(songId)) {
            state.learnedSongs.push(songId);
            localStorage.setItem('learnedSongs', JSON.stringify(state.learnedSongs));
            logPractice(`Learned song: ${song.title}`);
            renderProgress();
        }
        modal.classList.remove('active');
    }

    modal.classList.add('active');
    renderSongStep();
}

// ============== PROGRESS ==============
function renderProgress() {
    const totalMinutes = state.practiceLog.reduce((acc, entry) => acc + (entry.duration || 5), 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    const timeEl = document.getElementById('total-practice-time');
    const drillsEl = document.getElementById('drills-completed');
    const scalesEl = document.getElementById('scales-learned');
    const songsEl = document.getElementById('songs-learned');
    const streakEl = document.getElementById('streak-count');
    
    if (timeEl) timeEl.textContent = `${hours}h ${mins}m`;
    if (drillsEl) drillsEl.textContent = state.completedDrills.length;
    if (scalesEl) scalesEl.textContent = state.learnedScales.length;
    if (songsEl) songsEl.textContent = state.learnedSongs.length;
    if (streakEl) streakEl.textContent = state.streak;

    renderStreakCalendar();
    renderPracticeLog();
}

function renderStreakCalendar() {
    const calendar = document.getElementById('streak-calendar');
    if (!calendar) return;
    
    let html = '';
    for (let i = 27; i >= 0; i--) {
        const date = new Date(Date.now() - i * 86400000);
        const dateStr = date.toDateString();
        const practiced = state.practiceLog.some(entry => 
            new Date(entry.timestamp).toDateString() === dateStr
        );
        const isToday = i === 0;
        html += `<div class="calendar-day ${practiced ? 'practiced' : ''} ${isToday ? 'today' : ''}"></div>`;
    }
    calendar.innerHTML = html;
}

function renderPracticeLog() {
    const log = document.getElementById('practice-log');
    if (!log) return;
    
    const recent = state.practiceLog.slice(-10).reverse();
    log.innerHTML = recent.length ? recent.map(entry => `
        <li>
            <span>${entry.activity}</span>
            <span>${new Date(entry.timestamp).toLocaleDateString()}</span>
        </li>
    `).join('') : '<li>No practice logged yet</li>';
}

function logPractice(activity) {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (state.lastPractice === yesterday || state.lastPractice === null) {
        state.streak++;
    } else if (state.lastPractice !== today) {
        state.streak = 1;
    }
    state.lastPractice = today;
    
    localStorage.setItem('streak', state.streak);
    localStorage.setItem('lastPractice', state.lastPractice);
    
    state.practiceLog.push({
        activity,
        timestamp: new Date().toISOString(),
        duration: 5
    });
    localStorage.setItem('practiceLog', JSON.stringify(state.practiceLog));
}

// ============== MODALS ==============
function initModals() {
    document.querySelectorAll('.close

function initModals() {
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", () => btn.closest(".modal").classList.remove("active"));
    });
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    });
}

// ============== HOME SECTION ==============
function initHome() {
    updateHomeStats();
    generatePracticePlan();
    renderAchievements();
    
    document.getElementById('start-practice')?.addEventListener('click', startPracticeSession);
    
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (action === 'drills') showSection('drills');
            else if (action === 'scales') showSection('scales');
            else if (action === 'sight-reading') openSightReading();
            else if (action === 'ear-training') openEarTraining();
        });
    });
}

function updateHomeStats() {
    const streak = state.streak || 0;
    const today = new Date().toDateString();
    const todayMinutes = state.practiceLog
        .filter(e => new Date(e.timestamp).toDateString() === today)
        .reduce((acc, e) => acc + (e.duration || 5), 0);
    
    document.getElementById('home-streak').textContent = streak;
    document.getElementById('home-time').textContent = todayMinutes + 'm';
    
    const totalMinutes = state.practiceLog.reduce((acc, e) => acc + (e.duration || 5), 0);
    document.getElementById('home-xp').textContent = totalMinutes * 10;
    
    // Update goal
    const goalMinutes = 30;
    const progress = Math.min(100, (todayMinutes / goalMinutes) * 100);
    document.getElementById('goal-fill').style.width = progress + '%';
    document.getElementById('goal-text').textContent = `${todayMinutes} / ${goalMinutes} minutes`;
}

function generatePracticePlan() {
    const planList = document.getElementById('plan-list');
    if (!planList) return;
    
    const plan = window.practicePlanner?.createSession(30, 'balanced') || [];
    planList.innerHTML = plan.map(item => `
        <div class="plan-item">
            <span class="plan-name">${item.name}</span>
            <span class="plan-time">${item.minutes} min</span>
        </div>
    `).join('');
}

function renderAchievements() {
    const unlockedIds = JSON.parse(localStorage.getItem('achievements') || '[]');
    
    // Recent achievements on home
    const row = document.getElementById('achievement-row');
    if (row) {
        const recent = unlockedIds.slice(-3);
        if (recent.length === 0) {
            row.innerHTML = '<p style="color: var(--text-secondary)">Practice more to unlock achievements!</p>';
        } else {
            row.innerHTML = recent.map(id => {
                const a = window.achievements?.find(ach => ach.id === id);
                return a ? `<div class="achievement-badge unlocked"><span>${a.icon}</span> ${a.name}</div>` : '';
            }).join('');
        }
    }
    
    // Full achievement grid
    const grid = document.getElementById('achievement-grid');
    if (grid && window.achievements) {
        grid.innerHTML = window.achievements.map(a => `
            <div class="achievement-item ${unlockedIds.includes(a.id) ? '' : 'locked'}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.name}</div>
            </div>
        `).join('');
    }
}

// ============== METRONOME ==============
let metronome = null;

function initMetronome() {
    if (!window.Metronome) return;
    
    metronome = new window.Metronome();
    
    const slider = document.getElementById('tempo-slider');
    const bpmDisplay = document.getElementById('bpm-display');
    const toggleBtn = document.getElementById('toggle-metronome');
    
    slider?.addEventListener('input', () => {
        const bpm = parseInt(slider.value);
        metronome.setBPM(bpm);
        bpmDisplay.textContent = bpm;
    });
    
    toggleBtn?.addEventListener('click', () => {
        if (metronome.isPlaying) {
            metronome.stop();
            toggleBtn.textContent = '▶️ Start';
            toggleBtn.classList.remove('playing');
            clearBeatIndicator();
        } else {
            metronome.start();
            toggleBtn.textContent = '⏹️ Stop';
            toggleBtn.classList.add('playing');
            startBeatIndicator();
        }
    });
    
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            metronome.setBeatsPerMeasure(parseInt(btn.dataset.beats));
        });
    });
}

function startBeatIndicator() {
    const dots = document.querySelectorAll('.beat-dot');
    let beat = 0;
    
    const interval = setInterval(() => {
        if (!metronome?.isPlaying) {
            clearInterval(interval);
            return;
        }
        
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'accent');
            if (i === beat) {
                dot.classList.add('active');
                if (beat === 0) dot.classList.add('accent');
            }
        });
        
        beat = (beat + 1) % metronome.beatsPerMeasure;
    }, 60000 / metronome.bpm);
}

function clearBeatIndicator() {
    document.querySelectorAll('.beat-dot').forEach(dot => {
        dot.classList.remove('active', 'accent');
    });
}

// ============== EAR TRAINING ==============
function openEarTraining() {
    showSection('tools');
    setTimeout(() => {
        document.getElementById('ear-type').value = 'intervals';
        document.getElementById('ear-level').value = 'beginner';
    }, 100);
}

function initEarTraining() {
    let currentExercise = null;
    
    document.getElementById('play-example')?.addEventListener('click', () => {
        const type = document.getElementById('ear-type')?.value || 'intervals';
        const level = document.getElementById('ear-level')?.value || 'beginner';
        
        const exercises = window.earTrainingExercises?.[type]?.[level] || [];
        if (exercises.length === 0) return;
        
        currentExercise = exercises[Math.floor(Math.random() * exercises.length)];
        
        const display = document.getElementById('ear-display');
        display.innerHTML = `<p style="font-size: 1.2rem">🔊 Listen and identify...</p>`;
        
        // Play the interval/chord (using Web Audio)
        playEarExample(currentExercise);
    });
    
    document.getElementById('show-answer')?.addEventListener('click', () => {
        if (!currentExercise) return;
        
        const display = document.getElementById('ear-display');
        display.innerHTML = `
            <div>
                <p style="font-size: 1.5rem; font-weight: 600">${currentExercise.name}</p>
                <p style="color: var(--text-secondary)">${currentExercise.example}</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem">${currentExercise.description}</p>
            </div>
        `;
    });
}

function playEarExample(exercise) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = exercise.notes;
    
    notes.forEach((note, i) => {
        const freq = noteToFreq(note);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.5);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.5 + 0.05);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.5 + 0.8);
        
        osc.start(ctx.currentTime + i * 0.5);
        osc.stop(ctx.currentTime + i * 0.5 + 1);
    });
}

function noteToFreq(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let name = note.replace(/\d/, '');
    let octave = parseInt(note.match(/\d/)?.[0] || 4);
    
    const semitone = notes.indexOf(name);
    return 440 * Math.pow(2, (semitone - 9 + (octave - 4) * 12) / 12);
}

// ============== THEORY ==============
function initTheory() {
    const container = document.getElementById('theory-lessons');
    if (!container || !window.theoryLessons) return;
    
    container.innerHTML = window.theoryLessons.map(lesson => `
        <div class="theory-lesson-card" data-lesson-id="${lesson.id}">
            <h4>${lesson.title}<span class="lesson-level ${lesson.level}">${lesson.level}</span></h4>
            <p>${lesson.sections.length} sections</p>
        </div>
    `).join('');
    
    container.querySelectorAll('.theory-lesson-card').forEach(card => {
        card.addEventListener('click', () => openTheoryLesson(card.dataset.lessonId));
    });
}

function openTheoryLesson(lessonId) {
    const lesson = window.theoryLessons?.find(l => l.id === lessonId);
    if (!lesson) return;
    
    let currentSection = 0;
    let currentQuestion = 0;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    function renderSection() {
        const section = lesson.sections[currentSection];
        
        content.innerHTML = `
            <div class="theory-practice">
                <h3>${lesson.title}</h3>
                <div class="step-progress">
                    Section ${currentSection + 1} of ${lesson.sections.length}: ${section.title}
                </div>
                <div class="theory-content">
                    <p>${section.content}</p>
                </div>
                ${section.exercise ? renderQuiz(section) : ''}
                <div class="drill-controls">
                    ${currentSection > 0 ? '<button class="btn-prev" onclick="prevTheorySection()">← Previous</button>' : ''}
                    <button class="btn-start" onclick="nextTheorySection()">Next Section →</button>
                </div>
            </div>
        `;
    }
    
    window.nextTheorySection = () => {
        currentSection++;
        if (currentSection >= lesson.sections.length) {
            logPractice(`Completed theory: ${lesson.title}`);
            renderProgress();
            modal.classList.remove('active');
        } else {
            renderSection();
        }
    };
    
    window.prevTheorySection = () => {
        if (currentSection > 0) {
            currentSection--;
            renderSection();
        }
    };
    
    modal.classList.add('active');
    renderSection();
}

function renderQuiz(section) {
    if (!section.questions || section.questions.length === 0) return '';
    
    return `
        <div class="quiz-section">
            <h4>Quiz</h4>
            <div class="quiz-question">
                ${section.questions[0].question || 'Identify:'}
            </div>
            <div class="quiz-options">
                ${(section.questions[0].options || []).map(opt => `
                    <button class="quiz-option" onclick="checkQuizAnswer(this, '${opt}', '${section.questions[0].answer}')">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

window.checkQuizAnswer = (btn, selected, correct) => {
    if (selected === correct) {
        btn.style.background = 'var(--success)';
    } else {
        btn.style.background = 'var(--danger)';
    }
};

// ============== SESSION TRACKING ==============
let sessionInterval = null;
let sessionStartTime = null;

function startPracticeSession() {
    sessionStartTime = Date.now();
    document.getElementById('session-indicator').style.display = 'flex';
    
    sessionInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('session-time').textContent = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
    
    showSection('drills');
}

function endPracticeSession() {
    if (!sessionStartTime) return;
    
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000 / 60) || 5;
    logPractice(`Practice session: ${elapsed} minutes`);
    
    clearInterval(sessionInterval);
    sessionInterval = null;
    sessionStartTime = null;
    
    document.getElementById('session-indicator').style.display = 'none';
    updateHomeStats();
    renderProgress();
    
    // Check for new achievements
    const newAchievements = window.checkAchievements?.(state) || [];
    if (newAchievements.length > 0) {
        alert(`🎉 New Achievement${newAchievements.length > 1 ? 's' : ''} unlocked!`);
        renderAchievements();
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    document.querySelectorAll('.section').forEach(s => {
        s.classList.toggle('active', s.id === sectionId);
    });
}

// ============== INIT ==============
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderDrills();
    renderSongs();
    renderProgress();
    initScaleControls();
    renderPiano();
    initModals();
    initHome();
    initMetronome();
    initEarTraining();
    initTheory();
    
    document.getElementById('end-session')?.addEventListener('click', endPracticeSession);
});


// ============== FAST LEARNING INTEGRATION ==============
let xpSystem = null;
let spacedRepetition = null;

function initFastLearning() {
    if (window.XPSystem) {
        xpSystem = new window.XPSystem();
        updateXPDisplay();
    }
    
    if (window.SpacedRepetition) {
        spacedRepetition = new window.SpacedRepetition();
        updateReviewQueue();
    }
    
    renderDailyMissions();
    renderSpeedDrills();
    initMicroSessions();
    initAssessment();
    renderFastTrack();
}

function updateXPDisplay() {
    if (!xpSystem) return;
    const stats = xpSystem.getStats();
    document.getElementById('user-level').textContent = stats.level;
    document.getElementById('xp-fill').style.width = (stats.progress * 100) + '%';
    document.getElementById('xp-text').textContent = `${xpSystem.xp} / ${stats.level * 500} XP`;
}

function addXP(amount, reason) {
    if (!xpSystem) return;
    const result = xpSystem.addXP(amount, reason);
    updateXPDisplay();
    
    // Apply streak bonus
    const streakBonus = window.getStreakBonus?.(state.streak);
    if (streakBonus && streakBonus.multiplier > 1) {
        const bonusXP = Math.round(amount * (streakBonus.multiplier - 1));
        xpSystem.addXP(bonusXP, 'Streak bonus');
        updateXPDisplay();
    }
    
    if (result.leveledUp) {
        showLevelUp(result.newLevel);
    }
    
    return result;
}

function showLevelUp(level) {
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="level-up-celebration" style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h2 style="font-size: 2rem; margin-bottom: 10px;">Level Up!</h2>
            <p style="font-size: 1.5rem; color: var(--primary);">You've reached Level ${level}</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')" style="margin-top: 20px;">Continue</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function updateReviewQueue() {
    if (!spacedRepetition) return;
    const stats = spacedRepetition.getStats();
    document.getElementById('due-count').textContent = stats.due;
    
    if (stats.due === 0) {
        document.getElementById('start-review').disabled = true;
    }
}

function renderDailyMissions() {
    const container = document.getElementById('mission-list');
    if (!container || !window.getTodaysMissions) return;
    
    const missions = window.getTodaysMissions();
    const progress = JSON.parse(localStorage.getItem('mission_progress') || '{}');
    const today = new Date().toDateString();
    
    // Reset if new day
    if (progress.date !== today) {
        localStorage.setItem('mission_progress', JSON.stringify({ date: today }));
    }
    
    container.innerHTML = missions.map(mission => {
        const done = progress[mission.id] === true;
        return `
            <div class="mission-item ${done ? 'completed' : ''}" data-mission-id="${mission.id}">
                <div class="mission-check"></div>
                <div class="mission-info">
                    <span class="mission-name">${mission.name}</span>
                    <span class="mission-task">${mission.task}</span>
                </div>
                <span class="mission-xp">${mission.xp} XP</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('start-review')?.addEventListener('click', startSpacedReview);
}

function completeMission(missionId) {
    const mission = window.dailyMissions?.find(m => m.id === missionId);
    if (!mission) return;
    
    const progress = JSON.parse(localStorage.getItem('mission_progress') || '{}');
    if (progress[missionId]) return; // Already completed
    
    progress[missionId] = true;
    localStorage.setItem('mission_progress', JSON.stringify(progress));
    
    addXP(mission.xp, `Mission: ${mission.name}`);
    renderDailyMissions();
}

function renderSpeedDrills() {
    const container = document.getElementById('speed-drill-cards');
    if (!container || !window.speedDrills) return;
    
    container.innerHTML = window.speedDrills.map(drill => `
        <div class="speed-card" data-drill-id="${drill.id}">
            <h4>${drill.name}</h4>
            <p>${drill.description}</p>
        </div>
    `).join('');
    
    container.querySelectorAll('.speed-card').forEach(card => {
        card.addEventListener('click', () => openSpeedDrill(card.dataset.drillId));
    });
}

function openSpeedDrill(drillId) {
    const drill = window.speedDrills?.find(d => d.id === drillId);
    if (!drill) return;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="drill-practice">
            <h3>🏁 ${drill.name}</h3>
            <p>${drill.description}</p>
            <div class="drill-instructions">
                <p><strong>Goal:</strong> Complete as fast and accurately as possible</p>
                <p>Timer will start when you click "Go"</p>
            </div>
            <div class="drill-timer" id="speed-timer">00:00</div>
            <div class="drill-controls">
                <button class="btn-start" id="start-speed">Start</button>
                <button class="btn-complete" id="complete-speed">Done!</button>
            </div>
        </div>
    `;
    
    let startTime = null;
    let interval = null;
    
    document.getElementById('start-speed').addEventListener('click', () => {
        startTime = Date.now();
        interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            document.getElementById('speed-timer').textContent = 
                `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 100);
    });
    
    document.getElementById('complete-speed').addEventListener('click', () => {
        if (interval) clearInterval(interval);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const baseXP = 30;
        const bonusXP = Math.max(0, 30 - elapsed); // Faster = more XP
        addXP(baseXP + bonusXP, `Speed drill: ${drill.name}`);
        logPractice(`Speed drill: ${drill.name} - ${elapsed}s`);
        modal.classList.remove('active');
    });
    
    modal.classList.add('active');
}

function initMicroSessions() {
    document.querySelectorAll('.session-card').forEach(card => {
        card.addEventListener('click', () => {
            const duration = parseInt(card.dataset.duration);
            startMicroSession(duration);
        });
    });
}

function startMicroSession(minutes) {
    const plan = window.microPractice?.generateSession(minutes);
    if (!plan) return;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    let currentStep = 0;
    const steps = [
        { type: 'warmup', duration: plan.warmup, instruction: 'Warm up your hands and fingers' },
        ...plan.drills,
        ...plan.practice
    ];
    
    function renderStep() {
        const step = steps[currentStep];
        if (!step) {
            endMicroSession(minutes);
            return;
        }
        
        content.innerHTML = `
            <div class="drill-practice">
                <h3>⚡ ${minutes}-Minute Power Session</h3>
                <div class="step-progress">
                    Step ${currentStep + 1} of ${steps.length}
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentStep + 1) / steps.length) * 100}%"></div>
                    </div>
                </div>
                <div class="step-instruction">
                    <p><strong>${step.type?.toUpperCase() || 'PRACTICE'}</strong></p>
                    <p>${step.desc || step.instruction || 'Focus and play'}</p>
                    ${step.minutes ? `<p class="time-hint">Spend ${step.minutes} minutes</p>` : ''}
                </div>
                <div class="drill-timer" id="micro-timer">${step.minutes || 1}:00</div>
                <div class="drill-controls">
                    <button class="btn-start" id="next-step">Next Step →</button>
                </div>
            </div>
        `;
        
        document.getElementById('next-step').addEventListener('click', () => {
            currentStep++;
            addXP(10, 'Micro session step');
            renderStep();
        });
    }
    
    modal.classList.add('active');
    renderStep();
}

function endMicroSession(minutes) {
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    addXP(50 + (minutes * 10), `${minutes}-minute session completed`);
    logPractice(`${minutes}-minute micro session`);
    
    content.innerHTML = `
        <div class="session-complete" style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h2>Session Complete!</h2>
            <p style="color: var(--text-secondary); margin: 15px 0;">Great work! You completed a ${minutes}-minute focused session.</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Done</button>
        </div>
    `;
}

function initAssessment() {
    document.getElementById('start-assessment')?.addEventListener('click', startAssessment);
}

function startAssessment() {
    if (!window.quickAssessment) return;
    
    const questions = window.quickAssessment.questions;
    const answers = [];
    let currentQ = 0;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    function renderQuestion() {
        const q = questions[currentQ];
        
        content.innerHTML = `
            <div class="assessment-question">
                <p style="color: var(--text-secondary)">Question ${currentQ + 1} of ${questions.length}</p>
                <h4>${q.question}</h4>
                <div class="answer-options">
                    ${q.options.map((opt, i) => `
                        <button class="answer-btn" data-answer="${opt}">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        content.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                answers.push(btn.dataset.answer);
                currentQ++;
                
                if (currentQ < questions.length) {
                    renderQuestion();
                } else {
                    showAssessmentResults(answers);
                }
            });
        });
    }
    
    modal.classList.add('active');
    renderQuestion();
}

function showAssessmentResults(answers) {
    const result = window.quickAssessment.calculate(answers);
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    localStorage.setItem('assessment_result', JSON.stringify(result));
    
    content.innerHTML = `
        <div class="assessment-result" style="text-align: center; padding: 40px;">
            <h2>Your Level: ${result.level.charAt(0).toUpperCase() + result.level.slice(1)}</h2>
            <p style="font-size: 1.2rem; margin: 20px 0;">We recommend starting with Week ${result.recommendedWeek}</p>
            <div style="background: var(--bg-hover); padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h4>Next Steps:</h4>
                <ul style="text-align: left; margin-top: 10px;">
                    ${window.fastTrackCurriculum?.weeks[result.recommendedWeek - 1]?.goals.map(g => 
                        `<li>${g}</li>`
                    ).join('') || '<li>Start with basics</li>'}
                </ul>
            </div>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Got It!</button>
        </div>
    `;
}

function renderFastTrack() {
    const result = JSON.parse(localStorage.getItem('assessment_result') || '{}');
    const week = result.recommendedWeek || 1;
    const curriculum = window.fastTrackCurriculum?.weeks[week - 1];
    
    if (!curriculum) return;
    
    const weekEl = document.getElementById('current-week');
    const goalsEl = document.getElementById('week-goals');
    
    if (weekEl) {
        weekEl.innerHTML = `
            <h3>Week ${week}: ${curriculum.title}</h3>
            <p>Focus: ${curriculum.focus}</p>
        `;
    }
    
    if (goalsEl && curriculum.goals) {
        goalsEl.innerHTML = curriculum.goals.map(goal => `
            <div class="goal-item">
                <div class="goal-check"></div>
                <span>${goal}</span>
            </div>
        `).join('');
    }
}

function startSpacedReview() {
    if (!spacedRepetition) return;
    
    const dueItems = spacedRepetition.getDueItems();
    if (dueItems.length === 0) return;
    
    let currentIndex = 0;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    function renderItem() {
        const item = dueItems[currentIndex];
        if (!item) {
            showReviewComplete(dueItems.length);
            return;
        }
        
        content.innerHTML = `
            <div class="review-item">
                <h3>🔄 Spaced Review</h3>
                <p style="color: var(--text-secondary)">Item ${currentIndex + 1} of ${dueItems.length}</p>
                <div class="review-content" style="background: var(--bg-hover); padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4>${item.type}: ${item.data?.name || item.id}</h4>
                    <p>Review this item from memory</p>
                </div>
                <p>How well did you remember?</p>
                <div class="rating-buttons" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 15px;">
                    <button class="rating-btn" data-quality="1" style="background: var(--danger);">Fail</button>
                    <button class="rating-btn" data-quality="2" style="background: var(--warning);">Hard</button>
                    <button class="rating-btn" data-quality="3" style="background: var(--success);">Good</button>
                    <button class="rating-btn" data-quality="4" style="background: #3b82f6;">Easy</button>
                    <button class="rating-btn" data-quality="5" style="background: var(--primary);">Perfect</button>
                </div>
            </div>
        `;
        
        content.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quality = parseInt(btn.dataset.quality);
                spacedRepetition.reviewItem(item.id, quality);
                addXP(5, 'Spaced review');
                currentIndex++;
                renderItem();
            });
        });
    }
    
    modal.classList.add('active');
    renderItem();
}

function showReviewComplete(count) {
    const content = document.getElementById('drill-content');
    content.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🧠</div>
            <h2>Review Complete!</h2>
            <p style="color: var(--text-secondary); margin: 15px 0;">Reviewed ${count} items</p>
            <p>Next review session will optimize based on your performance</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Done</button>
        </div>
    `;
}

// Initialize fast learning on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initFastLearning, 100);
});


// ============== ADVANCED FEATURES INTEGRATION ==============
let flowTracker = null;

function initAdvancedFeatures() {
    if (window.FlowStateTracker) {
        flowTracker = new window.FlowStateTracker();
    }
    
    renderChordProgressions();
    initChordLearning();
    showRandomFocusReminder();
}

function renderChordProgressions() {
    const container = document.getElementById('progression-cards');
    if (!container || !window.chordProgressions) return;
    
    const progs = Object.entries(window.chordProgressions).slice(0, 4);
    
    container.innerHTML = progs.map(([key, prog]) => `
        <div class="progression-card" data-prog="${key}">
            <h4>${prog.name}</h4>
            <div class="progression-chords">${prog.keyOfC?.join(' → ') || prog.progression.join(' → ')}</div>
            <div class="progression-songs">${prog.songs?.slice(0, 2).join(', ')}</div>
            <span class="progression-time">${prog.learnTime || 'Quick learn'}</span>
        </div>
    `).join('');
    
    container.querySelectorAll('.progression-card').forEach(card => {
        card.addEventListener('click', () => openProgressionLesson(card.dataset.prog));
    });
}

function openProgressionLesson(progKey) {
    const prog = window.chordProgressions?.[progKey];
    if (!prog) return;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="progression-lesson">
            <h3>${prog.name}</h3>
            <p style="color: var(--text-secondary); margin: 10px 0;">${prog.description}</p>
            
            <div class="chord-flow" style="display: flex; gap: 10px; justify-content: center; margin: 20px 0;">
                ${prog.keyOfC.map(chord => `
                    <div class="chord-block" style="background: var(--bg-hover); padding: 15px 25px; border-radius: 10px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600;">${chord}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="song-list-mini" style="margin: 20px 0;">
                <strong>Songs you can play:</strong><br>
                ${prog.songs.join('<br>')}
            </div>
            
            <div style="background: var(--bg-hover); padding: 15px; border-radius: 10px; margin: 15px 0;">
                <h4>Practice Steps:</h4>
                <ol style="margin-top: 10px; line-height: 1.8;">
                    <li>Play left hand only: ${prog.keyOfC.join(' → ')}</li>
                    <li>Add right hand melody or rhythm</li>
                    <li>Practice transitioning smoothly between chords</li>
                    <li>Try with different songs above</li>
                </ol>
            </div>
            
            <div class="drill-controls">
                <button class="btn-start" onclick="startProgressionPractice('${progKey}')">Start Practice</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

window.startProgressionPractice = (progKey) => {
    const prog = window.chordProgressions?.[progKey];
    if (!prog) return;
    
    let currentChord = 0;
    const chords = prog.keyOfC;
    const timing = prog.chordTiming || chords.map(c => ({ chord: c, beats: 4 }));
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    function renderChord() {
        const chord = timing[currentChord];
        if (!chord) {
            completeProgression(prog);
            return;
        }
        
        content.innerHTML = `
            <div class="chord-learning">
                <p style="color: var(--text-secondary)">Chord ${currentChord + 1} of ${timing.length}</p>
                <div class="chord-diagram">
                    <div class="chord-name-large">${chord.chord}</div>
                    <div class="chord-notes-display">${getChordNotes(chord.chord)}</div>
                </div>
                <p>Play for <strong>${chord.beats} beats</strong></p>
                <div class="drill-controls">
                    <button class="btn-start" id="next-chord">Next Chord →</button>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 15px;">
                    ${window.quickChordLearning?.chords?.[chord.chord]?.tips || 'Focus on smooth transitions'}
                </p>
            </div>
        `;
        
        document.getElementById('next-chord').addEventListener('click', () => {
            addXP(5, `Chord: ${chord.chord}`);
            currentChord++;
            renderChord();
        });
    }
    
    renderChord();
};

function getChordNotes(chordName) {
    const chords = window.quickChordLearning?.chords || {};
    const cleanName = chordName.replace(/[0-9]/g, '');
    return chords[cleanName]?.notes?.join(' - ') || chordName;
}

function completeProgression(prog) {
    addXP(30, `Learned progression: ${prog.name}`);
    logPractice(`Learned: ${prog.name}`);
    
    const content = document.getElementById('drill-content');
    content.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎸</div>
            <h2>Progression Mastered!</h2>
            <p style="color: var(--text-secondary); margin: 15px 0;">You can now play ${prog.songs?.length || 'many'} songs!</p>
            <p style="margin-top: 10px;">Songs: ${prog.songs?.slice(0, 3).join(', ')}</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Done</button>
        </div>
    `;
}

function initChordLearning() {
    document.getElementById('start-chord-learning')?.addEventListener('click', startQuickChordLearning);
}

function startQuickChordLearning() {
    const sequence = window.quickChordLearning?.getSequence() || [];
    const learned = JSON.parse(localStorage.getItem('learned_chords') || '[]');
    
    let current = 0;
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    function renderChord() {
        const chord = sequence[current];
        if (!chord) {
            showChordComplete();
            return;
        }
        
        content.innerHTML = `
            <div class="chord-learning">
                <p style="color: var(--text-secondary)">Chord ${current + 1} of ${sequence.length}</p>
                <div class="chord-diagram">
                    <div class="chord-name-large">${chord.name}</div>
                    <div class="chord-notes-display">${chord.notes.join(' - ')}</div>
                    <div class="finger-guide">
                        ${chord.fingers.map((f, i) => `
                            <div class="finger-num">
                                <span>${f}</span>
                                <span>${chord.notes[i]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="chord-tips">💡 ${chord.tips}</div>
                <p style="margin-top: 15px; color: var(--text-secondary);">Difficulty: ${'⭐'.repeat(chord.difficulty)}</p>
                <div class="drill-controls">
                    <button class="btn-start" id="learned-chord">Got It! →</button>
                </div>
            </div>
        `;
        
        document.getElementById('learned-chord').addEventListener('click', () => {
            if (!learned.includes(chord.name)) {
                learned.push(chord.name);
                localStorage.setItem('learned_chords', JSON.stringify(learned));
            }
            addXP(10, `Learned chord: ${chord.name}`);
            current++;
            renderChord();
        });
    }
    
    modal.classList.add('active');
    renderChord();
}

function showChordComplete() {
    const learned = JSON.parse(localStorage.getItem('learned_chords') || '[]');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎹</div>
            <h2>Chords Learned!</h2>
            <p style="color: var(--text-secondary); margin: 15px 0;">You now know ${learned.length} chords</p>
            <p style="font-size: 1.2rem;">${learned.join(' - ')}</p>
            <p style="margin-top: 20px; color: var(--success);">You can play hundreds of songs with these!</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Done</button>
        </div>
    `;
}

function showRandomFocusReminder() {
    // Show a focus reminder every 3 minutes during practice
    setInterval(() => {
        if (sessionStartTime) {
            const reminder = window.getRandomFocusReminder?.();
            if (reminder) {
                showFocusReminder(reminder);
            }
        }
    }, 180000); // 3 minutes
}

function showFocusReminder(text) {
    let el = document.querySelector('.focus-reminder');
    if (!el) {
        el = document.createElement('div');
        el.className = 'focus-reminder';
        document.body.appendChild(el);
    }
    
    el.textContent = text;
    el.classList.add('show');
    
    setTimeout(() => {
        el.classList.remove('show');
    }, 5000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initAdvancedFeatures, 200);
});


// ============== AUDIO DETECTION INTEGRATION ==============
let noteDetector = null;
let isListeningActive = false;

function initAudioDetection() {
    document.getElementById('start-listening')?.addEventListener('click', startListeningMode);
    document.getElementById('stop-listening')?.addEventListener('click', stopListeningMode);
}

async function startListeningMode() {
    if (!window.PianoNoteDetector) {
        alert('Audio detection not available in this browser');
        return;
    }

    noteDetector = new window.PianoNoteDetector();
    
    noteDetector.onNoteDetected = (noteInfo) => {
        showDetectedNote(noteInfo);
    };
    
    noteDetector.onNoNote = () => {
        document.getElementById('note-detected').textContent = '—';
        document.getElementById('note-status').textContent = 'Play a note...';
        document.getElementById('note-status').className = 'note-status';
    };

    const success = await noteDetector.startListening();
    
    if (success) {
        isListeningActive = true;
        document.getElementById('start-listening').style.display = 'none';
        document.getElementById('stop-listening').style.display = 'block';
        document.getElementById('note-detected').textContent = '—';
        document.getElementById('note-status').textContent = 'Listening... play a note';
    } else {
        alert('Could not access microphone. Please allow microphone permission.');
    }
}

function stopListeningMode() {
    if (noteDetector) {
        noteDetector.stopListening();
        noteDetector = null;
    }
    
    isListeningActive = false;
    document.getElementById('start-listening').style.display = 'block';
    document.getElementById('stop-listening').style.display = 'none';
    document.getElementById('note-detected').textContent = '—';
    document.getElementById('note-status').textContent = 'Tap to start';
}

function showDetectedNote(noteInfo) {
    const detectedEl = document.getElementById('note-detected');
    const statusEl = document.getElementById('note-status');
    
    detectedEl.textContent = noteInfo.noteName;
    detectedEl.classList.add('note-match');
    setTimeout(() => detectedEl.classList.remove('note-match'), 300);
    
    statusEl.textContent = `Octave ${noteInfo.octave} • ${Math.round(noteInfo.frequency)}Hz`;
    statusEl.className = 'note-status correct';
}

// ============== PRACTICE WITH DETECTION ==============
let practiceDetector = null;

function startPracticeWithDetection(notes, onProgress, onComplete) {
    if (!window.PracticeWithDetection) {
        alert('Practice detection not available');
        return false;
    }

    practiceDetector = new window.PracticeWithDetection();
    
    practiceDetector.onProgress = onProgress;
    practiceDetector.onComplete = onComplete;
    
    return practiceDetector.startPractice(notes);
}

function stopPracticeWithDetection() {
    if (practiceDetector) {
        practiceDetector.endPractice();
        practiceDetector = null;
    }
}

// Enhanced scale practice with detection
function startScalePracticeWithDetection(scale, root) {
    const scaleData = window.scales?.[scale]?.[root];
    if (!scaleData) return;

    const notes = scaleData.notes || scaleData;
    const noteArray = Array.isArray(notes) ? notes : notes.up;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    let currentNote = 0;
    let correctCount = 0;
    
    content.innerHTML = `
        <div class="practice-detection">
            <h3>🎵 Scale Practice with Detection</h3>
            <p style="color: var(--text-secondary);">Play each note - the app will listen and check</p>
            
            <div class="target-note-display" id="target-note">${noteArray[0]}</div>
            
            <div class="detection-feedback" id="feedback">
                <p>Play the note shown above</p>
            </div>
            
            <div class="progress-dots" style="display: flex; gap: 5px; justify-content: center; margin: 15px 0;">
                ${noteArray.map((n, i) => `<span class="dot" data-index="${i}" style="width: 20px; height: 20px; border-radius: 50%; background: var(--bg-hover);"></span>`).join('')}
            </div>
            
            <p>Progress: <span id="correct-count">0</span> / ${noteArray.length}</p>
            
            <div class="drill-controls">
                <button class="btn-start" id="start-detection">🎤 Start Listening</button>
                <button class="btn-start" id="skip-note" style="background: var(--warning); display: none;">Skip Note</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    let detector = null;
    
    document.getElementById('start-detection').addEventListener('click', async function() {
        this.disabled = true;
        this.textContent = '🎤 Listening...';
        document.getElementById('skip-note').style.display = 'inline-block';
        
        if (!window.PianoNoteDetector) {
            alert('Detection not available');
            return;
        }
        
        detector = new window.PianoNoteDetector();
        
        detector.onNoteDetected = (noteInfo) => {
            const target = noteArray[currentNote];
            const isCorrect = noteInfo.noteName === target.replace(/\d/, '');
            
            const feedbackEl = document.getElementById('feedback');
            const targetEl = document.getElementById('target-note');
            const dots = document.querySelectorAll('.dot');
            
            if (isCorrect) {
                correctCount++;
                document.getElementById('correct-count').textContent = correctCount;
                dots[currentNote].style.background = 'var(--success)';
                feedbackEl.innerHTML = '<p style="color: var(--success);">✓ Correct!</p>';
                feedbackEl.className = 'detection-feedback correct';
                targetEl.classList.add('correct');
                
                setTimeout(() => {
                    currentNote++;
                    if (currentNote < noteArray.length) {
                        document.getElementById('target-note').textContent = noteArray[currentNote];
                        targetEl.classList.remove('correct');
                        feedbackEl.innerHTML = '<p>Play the next note</p>';
                        feedbackEl.className = 'detection-feedback';
                    } else {
                        // Complete
                        detector.stopListening();
                        showPracticeComplete(correctCount, noteArray.length);
                    }
                }, 500);
            } else {
                feedbackEl.innerHTML = `<p style="color: var(--danger);">✗ You played ${noteInfo.noteName} - need ${target}</p>`;
                feedbackEl.className = 'detection-feedback incorrect';
                targetEl.classList.add('waiting');
                setTimeout(() => targetEl.classList.remove('waiting'), 300);
            }
        };
        
        detector.onNoNote = () => {
            // Silent
        };
        
        await detector.startListening();
    });
    
    document.getElementById('skip-note').addEventListener('click', () => {
        currentNote++;
        if (currentNote < noteArray.length) {
            document.getElementById('target-note').textContent = noteArray[currentNote];
            document.getElementById('feedback').innerHTML = '<p>Play the next note</p>';
        } else {
            if (detector) detector.stopListening();
            showPracticeComplete(correctCount, noteArray.length);
        }
    });
}

function showPracticeComplete(correct, total) {
    const content = document.getElementById('drill-content');
    const percentage = Math.round((correct / total) * 100);
    
    addXP(correct * 5, 'Scale practice with detection');
    
    content.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">${percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</div>
            <h2>Practice Complete!</h2>
            <p style="font-size: 2rem; margin: 20px 0;">${correct} / ${total} correct</p>
            <p style="color: var(--text-secondary);">${percentage}% accuracy</p>
            <button class="btn-start" onclick="document.getElementById('drill-modal').classList.remove('active')">Done</button>
        </div>
    `;
}

// Initialize audio detection on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initAudioDetection, 300);
});


// ============== DATABASE INTEGRATION ==============
async function initAppWithDatabase() {
    // Initialize database
    if (window.initDatabase) {
        await window.initDatabase();
        
        // Migrate old data
        if (window.migrateFromLocalStorage) {
            await window.migrateFromLocalStorage();
        }
        
        // Load stats from database
        await loadStatsFromDatabase();
    }
}

async function loadStatsFromDatabase() {
    if (!window.pianoDB) return;
    
    try {
        const stats = await window.pianoDB.getStats();
        
        // Update UI
        document.getElementById('home-streak').textContent = stats.streak || 0;
        document.getElementById('total-practice-time').textContent = 
            `${Math.floor(stats.totalPracticeMinutes / 60)}h ${stats.totalPracticeMinutes % 60}m`;
        document.getElementById('drills-completed').textContent = stats.completedDrills || 0;
        document.getElementById('scales-learned').textContent = stats.learnedScales || 0;
        document.getElementById('songs-learned').textContent = stats.learnedSongs || 0;
        document.getElementById('streak-count').textContent = stats.streak || 0;
        
        // Update XP display
        const xpNeeded = (stats.level || 1) * 500;
        document.getElementById('user-level').textContent = stats.level || 1;
        document.getElementById('xp-fill').style.width = `${((stats.xp || 0) / xpNeeded) * 100}%`;
        document.getElementById('xp-text').textContent = `${stats.xp || 0} / ${xpNeeded} XP`;
        
        // Mark completed items
        const completedDrills = await window.pianoDB.getCompletedDrills();
        completedDrills.forEach(d => {
            const el = document.querySelector(`[data-drill-id="${d.drillId}"]`);
            if (el) el.classList.add('completed');
        });
        
        const learnedScales = await window.pianoDB.getLearnedScales();
        learnedScales.forEach(s => {
            state.learnedScales.push(s.scaleKey);
        });
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Override logPractice to use database
const originalLogPractice = logPractice;
logPractice = async function(activity) {
    // Call original
    originalLogPractice(activity);
    
    // Save to database
    if (window.pianoDB) {
        try {
            await window.pianoDB.recordProgress('practice', activity, { duration: 5 });
            await window.pianoDB.updateStreak();
        } catch (error) {
            console.error('Database error:', error);
        }
    }
};

// Override addXP to use database
const originalAddXP = addXP;
addXP = async function(amount, reason) {
    // Call original if exists
    if (originalAddXP) {
        originalAddXP(amount, reason);
    }
    
    // Save to database
    if (window.pianoDB) {
        try {
            await window.pianoDB.addXP(amount, reason);
        } catch (error) {
            console.error('Database error:', error);
        }
    }
};

// Initialize database on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initAppWithDatabase, 100);
});


// ============== SCALE LEARNING MODULE ==============
function initScaleLearning() {
    if (!window.completeScaleLibrary) return;
    
    renderScaleLearningPath();
    renderScaleExercises();
}

function renderScaleLearningPath() {
    const paths = window.scaleLearningPath;
    if (!paths) return;
    
    const learned = state.learnedScales || [];
    
    // Beginner scales
    const beginnerEl = document.getElementById('beginner-scales');
    if (beginnerEl) {
        beginnerEl.innerHTML = paths.beginner.map(scale => {
            const [key, type] = scale.split(' ');
            const scaleKey = `${key}-${type || 'major'}`;
            const isLearned = learned.includes(scaleKey);
            return `<span class="scale-chip ${isLearned ? 'learned' : ''}" data-key="${key}" data-type="${type || 'major'}">${key} ${type || ''}</span>`;
        }).join('');
    }
    
    // Intermediate scales
    const intermediateEl = document.getElementById('intermediate-scales');
    if (intermediateEl) {
        intermediateEl.innerHTML = paths.intermediate.map(scale => {
            const [key, type] = scale.split(' ');
            const scaleKey = `${key}-${type || 'major'}`;
            const isLearned = learned.includes(scaleKey);
            return `<span class="scale-chip ${isLearned ? 'learned' : ''}" data-key="${key}" data-type="${type || 'major'}">${key} ${type || ''}</span>`;
        }).join('');
    }
    
    // Advanced scales
    const advancedEl = document.getElementById('advanced-scales');
    if (advancedEl) {
        advancedEl.innerHTML = paths.advanced.map(scale => {
            const [key, type] = scale.split(' ');
            const scaleKey = `${key}-${type || 'major'}`;
            const isLearned = learned.includes(scaleKey);
            return `<span class="scale-chip ${isLearned ? 'learned' : ''}" data-key="${key}" data-type="${type || 'major'}">${key} ${type || ''}</span>`;
        }).join('');
    }
    
    // Add click handlers
    document.querySelectorAll('.scale-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.getElementById('scale-type').value = chip.dataset.type;
            document.getElementById('key-root').value = chip.dataset.key;
            generateScaleExercise();
        });
    });
    
    // Update count
    document.getElementById('scales-learned-count').textContent = learned.length;
    document.getElementById('scales-progress-percent').textContent = 
        Math.round((learned.length / 24) * 100) + '%';
}

function renderScaleExercises() {
    const container = document.getElementById('scale-exercise-grid');
    if (!container || !window.scaleExercises) return;
    
    container.innerHTML = window.scaleExercises.slice(0, 6).map(ex => `
        <div class="exercise-card" data-exercise="${ex.id}">
            <h4>${ex.name}</h4>
            <p>${ex.focus}</p>
        </div>
    `).join('');
    
    container.querySelectorAll('.exercise-card').forEach(card => {
        card.addEventListener('click', () => {
            // Start this exercise with current scale
            const type = document.getElementById('scale-type').value;
            const key = document.getElementById('key-root').value;
            startScaleExercise(key, type, card.dataset.exercise);
        });
    });
}

function generateScaleExercise() {
    const type = document.getElementById('scale-type').value;
    const key = document.getElementById('key-root').value;
    
    const scaleData = window.completeScaleLibrary?.[type]?.[key];
    if (!scaleData) {
        document.getElementById('scale-info').innerHTML = '<h3>Scale not available</h3>';
        return;
    }
    
    // Highlight piano keys
    highlightPianoKeys(scaleData.notes);
    
    // Build comprehensive scale info
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);
    const accidentals = scaleData.sharps?.length > 0 
        ? `${scaleData.sharps.length} sharps: ${scaleData.sharps.join(', ')}`
        : scaleData.flats?.length > 0 
        ? `${scaleData.flats.length} flats: ${scaleData.flats.join(', ')}`
        : 'No accidentals';
    
    document.getElementById('scale-info').innerHTML = `
        <h3>${key} ${typeName}</h3>
        <div class="scale-info-box">
            <div class="scale-details">
                <div class="detail-item">
                    <label>Accidentals</label>
                    <span>${accidentals}</span>
                </div>
                <div class="detail-item">
                    <label>Difficulty</label>
                    <span>${'⭐'.repeat(scaleData.difficulty)}</span>
                </div>
            </div>
            
            <div class="scale-notes" style="margin: 15px 0;">
                ${scaleData.notes.map(n => `<span class="note-badge">${n}</span>`).join('')}
            </div>
            
            <div class="fingering-display">
                <div class="hand-fingering">
                    <h5>Right Hand</h5>
                    <div class="finger-numbers">
                        ${scaleData.fingering.right.split('-').map(f => `<span class="finger-num">${f}</span>`).join('')}
                    </div>
                </div>
                <div class="hand-fingering">
                    <h5>Left Hand</h5>
                    <div class="finger-numbers">
                        ${scaleData.fingering.left.split('-').map(f => `<span class="finger-num">${f}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <p class="scale-tip">💡 ${scaleData.tips}</p>
            
            ${scaleData.relative ? `<p>Relative ${type === 'major' ? 'minor' : 'major'}: ${scaleData.relative}</p>` : ''}
            
            ${scaleData.chords ? `
                <div class="chord-suggestions">
                    <h4>Chords in this key:</h4>
                    <div class="chord-list">
                        ${scaleData.chords.map(c => `<span class="chord-item">${c}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 15px;">
            <button class="btn-start" onclick="openScalePractice('${key}', '${type}')">📝 Practice</button>
            <button class="btn-start" onclick="startScalePracticeWithDetection('${type}', '${key}')" style="background: var(--success);">🎤 Listen & Check</button>
        </div>
    `;
}

function startScaleExercise(key, type, exerciseId) {
    const scaleData = window.completeScaleLibrary?.[type]?.[key];
    const exercise = window.scaleExercises?.find(e => e.id === exerciseId);
    
    if (!scaleData || !exercise) return;
    
    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="drill-practice">
            <h3>${exercise.name}</h3>
            <p style="color: var(--text-secondary);">${exercise.description}</p>
            
            <div class="scale-info-box" style="margin: 15px 0;">
                <p><strong>Scale:</strong> ${key} ${type}</p>
                <p><strong>Notes:</strong> ${scaleData.notes.join(' → ')}</p>
                <p><strong>Focus:</strong> ${exercise.focus}</p>
                <p><strong>Tempo:</strong> ${exercise.tempo} BPM</p>
            </div>
            
            <div class="drill-timer" id="exercise-timer">00:00</div>
            <p id="exercise-hint">Start the metronome and play the ${exercise.name.toLowerCase()}</p>
            
            <div class="drill-controls">
                <button class="btn-start" id="start-exercise">Start</button>
                <button class="btn-complete" id="complete-exercise">Mark Complete</button>
            </div>
        </div>
    `;
    
    let seconds = 0;
    let interval = null;
    
    document.getElementById('start-exercise').addEventListener('click', function() {
        if (!interval) {
            this.textContent = 'Running...';
            interval = setInterval(() => {
                seconds++;
                document.getElementById('exercise-timer').textContent = 
                    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
            }, 1000);
        }
    });
    
    document.getElementById('complete-exercise').addEventListener('click', async () => {
        clearInterval(interval);
        
        // Save progress
        const scaleKey = `${key}-${type}`;
        if (!state.learnedScales.includes(scaleKey)) {
            state.learnedScales.push(scaleKey);
            localStorage.setItem('learnedScales', JSON.stringify(state.learnedScales));
        }
        
        addXP(15, `Scale exercise: ${exercise.name}`);
        logPractice(`${key} ${type}: ${exercise.name}`);
        
        // Update database
        if (window.pianoDB) {
            await window.pianoDB.learnScale(scaleKey, { exercise: exerciseId });
        }
        
        renderScaleLearningPath();
        modal.classList.remove('active');
    });
    
    modal.classList.add('active');
}

// Initialize scale learning on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScaleLearning, 200);
});


// ============== SYNC & SETTINGS UI ==============
function updateSyncStatus() {
    const dot = document.getElementById('sync-dot');
    const text = document.getElementById('sync-status-text');
    const userIdEl = document.getElementById('user-id');
    const lastSyncEl = document.getElementById('last-sync');
    
    if (!dot) return; // Not on settings page
    
    if (window.cloudSync) {
        const status = window.cloudSync.getSyncStatus();
        
        // Update dot
        dot.classList.remove('online', 'offline', 'syncing');
        if (status.isOnline) {
            dot.classList.add('online');
            text.textContent = status.isAuthenticated ? 'Connected' : 'Connecting...';
        } else {
            dot.classList.add('offline');
            text.textContent = 'Offline - changes queued';
        }
        
        // Update user ID
        if (status.userId) {
            userIdEl.textContent = status.userId.substring(0, 8) + '...';
        }
        
        // Update last sync
        if (status.lastSync) {
            const ago = Math.floor((Date.now() - status.lastSync) / 1000 / 60);
            lastSyncEl.textContent = ago < 1 ? 'Just now' : `${ago}m ago`;
        }
    } else {
        dot.classList.add('offline');
        text.textContent = 'Local storage only';
        userIdEl.textContent = 'Not synced';
    }
}

// Export progress
async function exportProgress() {
    try {
        let data;
        if (window.cloudSync) {
            data = await window.cloudSync.exportToJSON();
        } else if (window.pianoDB) {
            data = JSON.stringify(await window.pianoDB.exportData(), null, 2);
        } else {
            // Fallback to localStorage
            data = JSON.stringify({
                completedDrills: JSON.parse(localStorage.getItem('completedDrills') || '[]'),
                learnedScales: JSON.parse(localStorage.getItem('learnedScales') || '[]'),
                achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
                total_xp: localStorage.getItem('total_xp') || 0,
                streak: localStorage.getItem('streak') || 0
            }, null, 2);
        }
        
        // Create download
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `piano-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('Progress exported successfully!', 'success');
    } catch (error) {
        console.error('Export failed:', error);
        showToast('Export failed', 'error');
    }
}

// Import progress
function setupImport() {
    const importBtn = document.getElementById('import-btn');
    const fileInput = document.getElementById('import-file');
    
    if (importBtn && fileInput) {
        importBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const text = await file.text();
                
                if (window.cloudSync) {
                    await window.cloudSync.importFromJSON(text);
                } else if (window.pianoDB) {
                    await window.pianoDB.importData(JSON.parse(text));
                }
                
                // Reload stats
                if (typeof loadStatsFromDatabase === 'function') {
                    await loadStatsFromDatabase();
                }
                
                showToast('Progress imported successfully!', 'success');
            } catch (error) {
                console.error('Import failed:', error);
                showToast('Import failed - invalid file', 'error');
            }
        });
    }
}

// Link email account
function setupAccountLinking() {
    const emailBtn = document.getElementById('link-email-btn');
    const googleBtn = document.getElementById('link-google-btn');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const email = prompt('Enter your email:');
            const password = prompt('Create a password (min 6 characters):');
            
            if (email && password && window.cloudSync) {
                window.cloudSync.linkWithEmail(email, password)
                    .then(() => showToast('Account linked!', 'success'))
                    .catch(err => {
                        if (err.code === 'auth/email-already-in-use') {
                            showToast('Email already in use. Please sign in.', 'warning');
                        } else {
                            showToast('Error: ' + err.message, 'error');
                        }
                    });
            }
        });
    }
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            if (window.cloudSync) {
                window.cloudSync.linkWithGoogle()
                    .then(() => showToast('Google account linked!', 'success'))
                    .catch(err => showToast('Error: ' + err.message, 'error'));
            }
        });
    }
}

// Clear data
function setupDataClearing() {
    const clearBtn = document.getElementById('clear-data-btn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', async () => {
            if (!confirm('⚠️ This will delete ALL your progress. Are you sure?')) return;
            if (!confirm('This cannot be undone. Continue?')) return;
            
            try {
                // Clear IndexedDB
                if (window.pianoDB) {
                    const stores = ['userProfile', 'progress', 'completedDrills', 'learnedScales', 
                                   'learnedSongs', 'practiceSessions', 'achievements', 'xpLog',
                                   'spacedRepetition', 'theoryProgress', 'detectionHistory'];
                    for (const store of stores) {
                        await window.pianoDB.clear(store);
                    }
                }
                
                // Clear localStorage
                localStorage.clear();
                
                showToast('All data cleared', 'warning');
                setTimeout(() => location.reload(), 1000);
            } catch (error) {
                console.error('Clear failed:', error);
                showToast('Failed to clear data', 'error');
            }
        });
    }
}

// Manual sync
function setupSyncButton() {
    const syncBtn = document.getElementById('sync-now-btn');
    
    if (syncBtn) {
        syncBtn.addEventListener('click', async () => {
            syncBtn.textContent = '⏳ Syncing...';
            syncBtn.disabled = true;
            
            if (window.cloudSync) {
                await window.cloudSync.syncFromCloud();
            }
            
            setTimeout(() => {
                syncBtn.textContent = '🔄 Sync Now';
                syncBtn.disabled = false;
                updateSyncStatus();
                showToast('Synced!', 'success');
            }, 1000);
        });
    }
}

// Initialize settings UI
function initSettingsUI() {
    updateSyncStatus();
    setupImport();
    setupAccountLinking();
    setupDataClearing();
    setupSyncButton();
    
    // Update status periodically
    setInterval(updateSyncStatus, 30000);
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? '#dc3545' : type === 'warning' ? 'var(--warning)' : 'var(--primary)'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSettingsUI, 500);
});

