import styles from "@/styles/app.module.css";
import React, {useState} from "react";
import {Entry} from "@/types/Entry";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizAnswers from "@/components/quiz/QuizAnswers";


interface Props {
    entries: Entry[][],
    hasSelected: boolean,
    setHasSelected: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    currentSet: number
}

function Quiz({entries, hasSelected, setHasSelected, currentSet}: Props) {

    // Safely get the current set's entries (already shuffled during fetching)
    const filteredEntries =
        currentSet < entries.length && entries[currentSet] ? entries[currentSet] : [];

    return (
        <>
            <div className={styles.app} data-testid="quiz">
                <QuizQuestion
                    entries={filteredEntries}/>
                <QuizAnswers
                    entries={filteredEntries}
                    hasSelected={hasSelected}
                    setHasSelected={setHasSelected}
                />
            </div>
        </>
    );
}

export default Quiz;
