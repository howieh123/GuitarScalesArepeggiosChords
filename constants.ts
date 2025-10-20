import type { Note } from './types';

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export const TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
export const FRET_COUNT = 15;

export const SCALES = {
    'Major': [0, 2, 4, 5, 7, 9, 11],
    'Minor': [0, 2, 3, 5, 7, 8, 10],
    'Dorian': [0, 2, 3, 5, 7, 9, 10],
    'Phrygian': [0, 1, 3, 5, 7, 8, 10],
    'Lydian': [0, 2, 4, 6, 7, 9, 11],
    'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
    'Locrian': [0, 1, 3, 5, 6, 8, 10],
    'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
    'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
    'Major Pentatonic': [0, 2, 4, 7, 9],
    'Minor Pentatonic': [0, 3, 5, 7, 10],
    'Blues': [0, 3, 5, 6, 7, 10],
};

export const ARPEGGIOS = {
    'Major Triad': [0, 4, 7],
    'Minor Triad': [0, 3, 7],
    'Diminished Triad': [0, 3, 6],
    'Augmented Triad': [0, 4, 8],
    'Major 7th': [0, 4, 7, 11],
    'Minor 7th': [0, 3, 7, 10],
    'Dominant 7th': [0, 4, 7, 10],
    'Diminished 7th': [0, 3, 6, 9],
    'Half-Diminished 7th': [0, 3, 6, 10],
};

export const CHORDS = {
    'Major': [0, 4, 7],
    'Minor': [0, 3, 7],
    'Diminished': [0, 3, 6],
    'Augmented': [0, 4, 8],
    'Major 7th': [0, 4, 7, 11],
    'Minor 7th': [0, 3, 7, 10],
    'Dominant 7th': [0, 4, 7, 10],
    'Suspended 2nd': [0, 2, 7],
    'Suspended 4th': [0, 5, 7],
};

export const KEY_TYPES = ['Major', 'Minor'] as const;
export const DIATONIC_INTERVALS = ['2nd', '3rd', '4th', '5th', '6th', '7th'] as const;
export const STRING_PAIRS = ['6 & 4', '5 & 3', '4 & 2', '3 & 1'] as const;

export const DIATONIC_INTERVAL_MAP: Record<typeof DIATONIC_INTERVALS[number], number> = {
    '2nd': 2,
    '3rd': 3,
    '4th': 4,
    '5th': 5,
    '6th': 6,
    '7th': 7,
};