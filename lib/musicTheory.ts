import { NOTES, TUNING, FRET_COUNT, SCALES, DIATONIC_INTERVAL_MAP } from '../constants';
import type { Note, FretboardNote, KeyType, DiatonicInterval, StringPair } from '../types';

const noteMap = new Map<Note, number>(NOTES.map((note, index) => [note, index]));

export const getNotesInPattern = (rootNote: Note, intervals: number[]): Note[] => {
    const rootIndex = noteMap.get(rootNote);
    if (rootIndex === undefined) {
        return [];
    }
    const notes: Note[] = [];
    intervals.forEach(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        notes.push(NOTES[noteIndex]);
    });
    return notes;
};

export const getNotesOnFretboard = (notesToShow: Note[], rootNote: Note): FretboardNote[] => {
    const fretboardNotes: FretboardNote[] = [];
    const notesToShowSet = new Set(notesToShow);
    
    // Iterate from high E to low E string to match visual layout
    for (let stringIndex = TUNING.length - 1; stringIndex >= 0; stringIndex--) {
        const openStringNote = TUNING[stringIndex];
        const openStringNoteIndex = noteMap.get(openStringNote);

        if (openStringNoteIndex === undefined) continue;

        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const currentNoteIndex = (openStringNoteIndex + fret) % 12;
            const currentNote = NOTES[currentNoteIndex];

            if (notesToShowSet.has(currentNote)) {
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

export const getDiatonicIntervalPairs = (rootNote: Note, keyType: KeyType, interval: DiatonicInterval): { start: Note, end: Note }[] => {
    const scaleType = keyType === 'Major' ? 'Major' : 'Minor';
    const scaleIntervals = SCALES[scaleType];
    const sortedScaleNotes = getNotesInPattern(rootNote, scaleIntervals);

    const intervalDegree = DIATONIC_INTERVAL_MAP[interval] - 1; // 0-indexed
    const pairs: { start: Note, end: Note }[] = [];

    for (let i = 0; i < sortedScaleNotes.length; i++) {
        const startNote = sortedScaleNotes[i];
        const endNote = sortedScaleNotes[(i + intervalDegree) % sortedScaleNotes.length];
        pairs.push({ start: startNote, end: endNote });
    }

    return pairs;
};


export const getIntervalsOnFretboard = (notePairs: { start: Note, end: Note }[], stringPair: StringPair, rootNote: Note): FretboardNote[] => {
    const fretboardNotes: FretboardNote[] = [];
    const [string1Num, string2Num] = stringPair.split(' & ').map(Number);
    // Convert to 0-indexed (6th string is index 0)
    const string1Index = 6 - string1Num;
    const string2Index = 6 - string2Num;

    const findNoteOnString = (noteToFind: Note, stringIndex: number): { fret: number, note: Note }[] => {
        const positions: { fret: number, note: Note }[] = [];
        const openStringNote = TUNING[stringIndex];
        const openStringNoteIndex = noteMap.get(openStringNote)!;

        for (let fret = 0; fret <= FRET_COUNT; fret++) {
            const currentNoteIndex = (openStringNoteIndex + fret) % 12;
            const currentNote = NOTES[currentNoteIndex];
            if (currentNote === noteToFind) {
                positions.push({ fret, note: currentNote });
            }
        }
        return positions;
    };

    notePairs.forEach(pair => {
        const startNotePositions = findNoteOnString(pair.start, string1Index);
        const endNotePositions = findNoteOnString(pair.end, string2Index);

        startNotePositions.forEach(startPos => {
            endNotePositions.forEach(endPos => {
                // Check if the interval is reasonably playable (e.g., within a 5-fret span)
                if (Math.abs(startPos.fret - endPos.fret) <= 5 || startPos.fret === 0 || endPos.fret === 0) {
                     fretboardNotes.push({
                        string: string1Index,
                        fret: startPos.fret,
                        note: startPos.note,
                        isRoot: startPos.note === rootNote,
                        role: 'start'
                    });
                    fretboardNotes.push({
                        string: string2Index,
                        fret: endPos.fret,
                        note: endPos.note,
                        isRoot: endPos.note === rootNote,
                        role: 'end'
                    });
                }
            });
        });
    });
    
    // Deduplicate notes that might be both a root and a start/end
    const uniqueNotes = new Map<string, FretboardNote>();
    fretboardNotes.forEach(note => {
        const key = `${note.string}-${note.fret}`;
        const existing = uniqueNotes.get(key);
        if (!existing || note.isRoot) { // Prioritize showing the root color
            uniqueNotes.set(key, note);
        }
    });

    return Array.from(uniqueNotes.values());
};