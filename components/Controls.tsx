import React from 'react';
import type { Note, DisplayType, Scale, Arpeggio, Chord, KeyType, DiatonicInterval, StringPair } from '../types';
import { NOTES, SCALES, ARPEGGIOS, CHORDS, KEY_TYPES, DIATONIC_INTERVALS, STRING_PAIRS } from '../constants';

interface ControlsProps {
    rootNote: Note;
    displayType: DisplayType;
    selectedScale: Scale;
    selectedArpeggio: Arpeggio;
    selectedChord: Chord;
    keyType: KeyType;
    selectedDiatonicInterval: DiatonicInterval;
    selectedStringPair: StringPair;
    onRootNoteChange: (note: Note) => void;
    onDisplayTypeChange: (type: DisplayType) => void;
    onPatternChange: (pattern: Scale | Arpeggio | Chord) => void;
    onKeyTypeChange: (keyType: KeyType) => void;
    onDiatonicIntervalChange: (interval: DiatonicInterval) => void;
    onStringPairChange: (stringPair: StringPair) => void;
}

const selectBaseClasses = "w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out text-base";

const Selector: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly string[] | string[]; }> = ({ label, value, onChange, options }) => (
    <div className="flex-1 min-w-[150px]">
        <label className="block mb-2 text-sm font-medium text-gray-400">{label}</label>
        <select value={value} onChange={onChange} className={selectBaseClasses}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export const Controls: React.FC<ControlsProps> = ({
    rootNote, displayType, selectedScale, selectedArpeggio, selectedChord,
    keyType, selectedDiatonicInterval, selectedStringPair,
    onRootNoteChange, onDisplayTypeChange, onPatternChange,
    onKeyTypeChange, onDiatonicIntervalChange, onStringPairChange
}) => {
    
    const renderPatternSelector = () => {
        switch (displayType) {
            case 'scale':
                return <Selector label="Scale" value={selectedScale} onChange={e => onPatternChange(e.target.value as Scale)} options={Object.keys(SCALES)} />;
            case 'arpeggio':
                return <Selector label="Arpeggio" value={selectedArpeggio} onChange={e => onPatternChange(e.target.value as Arpeggio)} options={Object.keys(ARPEGGIOS)} />;
            case 'chord':
                return <Selector label="Chord" value={selectedChord} onChange={e => onPatternChange(e.target.value as Chord)} options={Object.keys(CHORDS)} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-wrap gap-6 items-end">
            <Selector
                label="Root Note"
                value={rootNote}
                onChange={e => onRootNoteChange(e.target.value as Note)}
                options={NOTES}
            />
            <Selector
                label="Display Type"
                value={displayType}
                onChange={e => onDisplayTypeChange(e.target.value as DisplayType)}
                options={['scale', 'arpeggio', 'chord', 'diatonicIntervals']}
            />
            {displayType === 'diatonicIntervals' ? (
                <>
                    <Selector label="Key" value={keyType} onChange={e => onKeyTypeChange(e.target.value as KeyType)} options={KEY_TYPES} />
                    <Selector label="Interval" value={selectedDiatonicInterval} onChange={e => onDiatonicIntervalChange(e.target.value as DiatonicInterval)} options={DIATONIC_INTERVALS} />
                    <Selector label="String Pair" value={selectedStringPair} onChange={e => onStringPairChange(e.target.value as StringPair)} options={STRING_PAIRS} />
                </>
            ) : renderPatternSelector()}
        </div>
    );
};