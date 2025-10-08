import React from 'react';
import type { FretboardNote } from '../types';
import { FRET_COUNT } from '../constants';

interface FretboardProps {
    highlightedNotes: FretboardNote[];
}

const FRET_WIDTH_PERCENT = 100 / (FRET_COUNT + 1);

const Inlay: React.FC<{ fret: number }> = ({ fret }) => {
    // The space for fret `f` is centered at `(f + 0.5) * FRET_WIDTH_PERCENT`
    const left = `${(fret + 0.5) * FRET_WIDTH_PERCENT}%`;
    if ([3, 5, 7, 9, 15].includes(fret)) {
        return <div className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left }}></div>;
    }
    if (fret === 12) {
        return (
            <>
                <div className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full top-1/3 -translate-x-1/2 -translate-y-1/2" style={{ left }}></div>
                <div className="absolute w-4 h-4 sm:w-5 sm:h-5 bg-gray-600 rounded-full top-2/3 -translate-x-1/2 -translate-y-1/2" style={{ left }}></div>
            </>
        );
    }
    return null;
};

const NoteCircle: React.FC<{ note: FretboardNote }> = ({ note }) => {
    const stringPosition = (5 - note.string) * (100 / 5);
    // The space for fret `f` (0-indexed for open) is centered at `(f + 0.5) * FRET_WIDTH_PERCENT`
    const fretPosition = (note.fret + 0.5) * FRET_WIDTH_PERCENT;

    const baseClasses = "absolute flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white font-bold text-sm transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 shadow-lg";
    const rootClasses = "bg-cyan-500 ring-2 ring-cyan-200";
    const nonRootClasses = "bg-gray-200 text-gray-800";
    
    return (
        <div 
            className={`${baseClasses} ${note.isRoot ? rootClasses : nonRootClasses}`}
            style={{ top: `${stringPosition}%`, left: `${fretPosition}%` }}
        >
            {note.note}
        </div>
    );
};

export const Fretboard: React.FC<FretboardProps> = ({ highlightedNotes }) => {
    return (
        <div className="w-full overflow-x-auto p-4 bg-gray-700 rounded-lg">
            <div className="relative min-w-[800px] h-48 bg-gradient-to-r from-gray-800 to-gray-700 rounded-md shadow-inner" style={{ background: 'linear-gradient(90deg, #374151 0%, #1f2937 100%)' }}>
                {/* Frets & Inlays */}
                {/* Loop for fret markers. `i=0` is the nut, `i=1` is fret 1 wire, etc. */}
                {[...Array(FRET_COUNT + 1)].map((_, i) => (
                    <React.Fragment key={`fret-marker-${i}`}>
                        <div 
                            className="absolute top-0 bottom-0 bg-gray-500" 
                            style={{ 
                                left: `${(i + 1) * FRET_WIDTH_PERCENT}%`, 
                                width: i === 0 ? '6px' : '3px',
                                transform: 'translateX(-50%)'
                            }}
                        ></div>
                        {/* Inlays are for frets (not the nut or open area) */}
                        <Inlay fret={i} />
                    </React.Fragment>
                ))}
                
                {/* Strings */}
                {[...Array(6)].map((_, i) => (
                    <div 
                        key={`string-${i}`} 
                        className="absolute h-px bg-gray-400"
                        style={{ top: `${i * (100/5)}%`, left: '0', right: '0', height: `${1 + i*0.2}px` }}
                    ></div>
                ))}
                
                {/* Notes */}
                {highlightedNotes.map((note, index) => (
                    <NoteCircle key={index} note={note} />
                ))}
            </div>

            {/* Fret Numbers */}
            <div className="relative min-w-[800px] flex mt-2">
                {[...Array(FRET_COUNT + 1)].map((_, i) => (
                    <div
                        key={`fret-label-${i}`}
                        className="flex-1 text-center text-xs text-gray-400 font-sans"
                        style={{ minWidth: `${FRET_WIDTH_PERCENT}%`, maxWidth: `${FRET_WIDTH_PERCENT}%` }}
                    >
                        {i === 0 ? 'OPEN' : i}
                    </div>
                ))}
            </div>
        </div>
    );
};