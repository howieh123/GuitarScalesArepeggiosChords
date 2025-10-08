
import { NOTES, SCALES, ARPEGGIOS, CHORDS } from './constants';

export type Note = typeof NOTES[number];
export type DisplayType = 'scale' | 'arpeggio' | 'chord';

export type Scale = keyof typeof SCALES;
export type Arpeggio = keyof typeof ARPEGGIOS;
export type Chord = keyof typeof CHORDS;

export interface FretboardNote {
    string: number;
    fret: number;
    note: Note;
    isRoot: boolean;
}
