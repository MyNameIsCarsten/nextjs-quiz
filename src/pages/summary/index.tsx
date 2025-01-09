// src/pages/settings/index.tsx
import React, {useContext, useEffect, useReducer, useState} from 'react';
import ProgressbarDummy from "@/components/bars/progressbar/ProgressbarDummy";
import appStyles from "../../styles/app.module.css";
import styles from "@/styles/summary.module.css";
import {Entry} from "@/types/Entry";
import {QuizContext} from "@/context/QuizContext";
import SummaryPercentage from "@/components/summary/SummaryPercentage";
import SummaryCorrect from "@/components/summary/SummaryCorrect";
import SummaryIncorrect from "@/components/summary/SummaryIncorrect";
import {useFetchEntries} from "@/hooks/useFetchEntries";


export default function SummaryPage() {
    const quiz = useContext(QuizContext); // Access shared state (if needed)
    const { entries } = useFetchEntries();

    return (
        <>
            <div className={appStyles.app}>
                <h1>Summary</h1>

                    {quiz ?
                        <div className={styles.summarybox}>
                            <SummaryPercentage
                                numerator={quiz.chosenCorrectly}
                                denominator={entries.length}
                            />
                            <div className={styles.seperator}></div>
                            <div className={styles.summary}>
                                <SummaryCorrect
                                    chosenCorrectly={quiz.chosenCorrectly}
                                />
                                <SummaryIncorrect
                                    chosenCorrectly={quiz.chosenCorrectly}
                                    total={entries.length}
                                />
                            </div>
                        </div>
                        :
                        <p>No Summary available.</p>
                    }
            </div>
            <ProgressbarDummy/>
        </>
    );
}