
import { NOTES, TUNING, FRET_COUNT } from '../constants';
import type { Note, FretboardNote } from '../types';

const noteMap = new Map<Note, number>(NOTES.map((note, index) => [note, index]));

export const getNotesInPattern = (rootNote: Note, intervals: number[]): Set<Note> => {
    const rootIndex = noteMap.get(rootNote);
    if (rootIndex === undefined) {
        return new Set();
    }
    const noteSet = new Set<Note>();
    intervals.forEach(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        noteSet.add(NOTES[noteIndex]);
    });
    return noteSet;
};

export const getNotesOnFretboard = (notesToShow: Set<Note>, rootNote: Note): FretboardNote[] => {
    const fretboardNotes: FretboardNote[] = [];
    
    // Iterate from high E to low E string to match visual layout
    for (let stringIndex = TUNING.length - 1; stringIndex >= 0; stringIndex--) {
        const openStringNote = TUNING[stringIndex];
        const openStringNoteIndex = noteMap.get(openStringNote);

        if (openStringNoteIndex === undefined) continue;

        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const currentNoteIndex = (openStringNoteIndex + fret) % 12;
            const currentNote = NOTES[currentNoteIndex];

            if (notesToShow.has(currentNote)) {
                fretboardNotes.push({
                    string: stringIndex,
                    fret,
                    note: currentNote,
                    isRoot: currentNote === rootNote,
                });
            }
        }
    }
    return fretboardNotes;
};
