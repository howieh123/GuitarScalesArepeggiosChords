import { NOTES, SCALES, ARPEGGIOS, CHORDS, KEY_TYPES, DIATONIC_INTERVALS, STRING_PAIRS } from './constants';

export type Note = typeof NOTES[number];
export type DisplayType = 'scale' | 'arpeggio' | 'chord' | 'diatonicIntervals';

export type Scale = keyof typeof SCALES;
export type Arpeggio = keyof typeof ARPEGGIOS;
export type Chord = keyof typeof CHORDS;

export type KeyType = typeof KEY_TYPES[number];
export type DiatonicInterval = typeof DIATONIC_INTERVALS[number];
export type StringPair = typeof STRING_PAIRS[number];

export interface FretboardNote {
    string: number;
    fret: number;
    note: Note;
    isRoot: boolean;
    role?: 'start' | 'end';
}