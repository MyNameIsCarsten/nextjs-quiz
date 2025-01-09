import React from "react";

interface Props {
    currentSet: number,
    maxSets: number,
}

function ProgressbarTracker({currentSet, maxSets}: Props) {
    return (
        <div data-testid="progressbartracker">
            <span>{currentSet + 1} / {maxSets}</span>
        </div>
    );
}

export default ProgressbarTracker;
