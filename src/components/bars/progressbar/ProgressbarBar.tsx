import styles from "@/styles/progressbar.module.css";
import React from "react";

interface Props {
    currentSet: number,
    maxSets: number,
    hasSelected: boolean,
}

function ProgressbarBar({currentSet, maxSets, hasSelected}: Props) {
    if(currentSet >= maxSets && maxSets !== 0) {
        throw new Error('currentSet must be less than maxSets');
    }

    return (
        <div className={styles.progressbarbox} data-testid="progressbarbar">
            {hasSelected ?
                <div data-testid="meter" className={styles.progress} style={{width: `${((currentSet + 1) / maxSets) * 100}%`}}></div>
                :
                <div data-testid="meter"  className={styles.progress} style={{width: `${((currentSet) / maxSets) * 100}%`}}></div>
            }
        </div>
    );
}

export default ProgressbarBar;
