import React, { useState, useMemo, useCallback } from 'react';
import { Fretboard } from './components/Fretboard';
import { Controls } from './components/Controls';
import { getNotesOnFretboard, getNotesInPattern, getDiatonicIntervalPairs, getIntervalsOnFretboard } from './lib/musicTheory';
import { NOTES, SCALES, ARPEGGIOS, CHORDS } from './constants';
import type { DisplayType, Note, Scale, Arpeggio, Chord, FretboardNote, KeyType, DiatonicInterval, StringPair } from './types';

const App: React.FC = () => {
    const [rootNote, setRootNote] = useState<Note>('C');
    const [displayType, setDisplayType] = useState<DisplayType>('scale');
    const [selectedScale, setSelectedScale] = useState<Scale>('Major');
    const [selectedArpeggio, setSelectedArpeggio] = useState<Arpeggio>('Major Triad');
    const [selectedChord, setSelectedChord] = useState<Chord>('Major');
    
    // State for Diatonic Intervals
    const [keyType, setKeyType] = useState<KeyType>('Major');
    const [selectedDiatonicInterval, setSelectedDiatonicInterval] = useState<DiatonicInterval>('3rd');
    const [selectedStringPair, setSelectedStringPair] = useState<StringPair>('5 & 3');


    const handleRootNoteChange = useCallback((note: Note) => {
        setRootNote(note);
    }, []);

    const handleDisplayTypeChange = useCallback((type: DisplayType) => {
        setDisplayType(type);
    }, []);

    const handlePatternChange = useCallback((pattern: Scale | Arpeggio | Chord) => {
        if (displayType === 'scale') {
            setSelectedScale(pattern as Scale);
        } else if (displayType === 'arpeggio') {
            setSelectedArpeggio(pattern as Arpeggio);
        } else if (displayType === 'chord') {
            setSelectedChord(pattern as Chord);
        }
    }, [displayType]);

    const highlightedNotes = useMemo<FretboardNote[]>(() => {
        if (displayType === 'diatonicIntervals') {
            const notePairs = getDiatonicIntervalPairs(rootNote, keyType, selectedDiatonicInterval);
            return getIntervalsOnFretboard(notePairs, selectedStringPair, rootNote);
        }

        let intervals: number[] = [];
        if (displayType === 'scale') {
            intervals = SCALES[selectedScale];
        } else if (displayType === 'arpeggio') {
            intervals = ARPEGGIOS[selectedArpeggio];
        } else if (displayType === 'chord') {
            intervals = CHORDS[selectedChord];
        }
        const notesInPattern = getNotesInPattern(rootNote, intervals);
        return getNotesOnFretboard(notesInPattern, rootNote);
    }, [rootNote, displayType, selectedScale, selectedArpeggio, selectedChord, keyType, selectedDiatonicInterval, selectedStringPair]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-8">
            <header className="w-full max-w-7xl text-center mb-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">Guitar Companion</h1>
                <p className="text-lg text-gray-400 mt-2">Visualize Scales, Arpeggios, and Chords</p>
            </header>
            
            <main className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8">
                <Controls
                    rootNote={rootNote}
                    displayType={displayType}
                    selectedScale={selectedScale}
                    selectedArpeggio={selectedArpeggio}
                    selectedChord={selectedChord}
                    keyType={keyType}
                    selectedDiatonicInterval={selectedDiatonicInterval}
                    selectedStringPair={selectedStringPair}
                    onRootNoteChange={handleRootNoteChange}
                    onDisplayTypeChange={handleDisplayTypeChange}
                    onPatternChange={handlePatternChange}
                    onKeyTypeChange={setKeyType}
                    onDiatonicIntervalChange={setSelectedDiatonicInterval}
                    onStringPairChange={setSelectedStringPair}
                />
                <div className="mt-8">
                    <Fretboard highlightedNotes={highlightedNotes} />
                </div>
            </main>

            <footer className="w-full max-w-7xl text-center mt-8 text-gray-500 text-sm">
                <p>Built for guitarists, by a world-class AI engineer.</p>
            </footer>
        </div>
    );
};

export default App;