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
        <button class="btn-start" onclick="openScalePractice('${root}', '${type}')">Start Practice →</button>
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
