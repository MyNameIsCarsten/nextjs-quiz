import React, { useContext, useEffect, useReducer, useState } from "react";
import { Entry } from "@/types/Entry";
import Progressbar from "@/components/bars/progressbar/Progressbar";
import { SettingsContext } from "@/context/SettingsContext";
import Quiz from "@/components/quiz/Quiz";
import {shuffleArray} from "@/components/helperFunctions/helpers";


export default function Home() {
    const [currentSet, setCurrentSet] = useState<number>(0);
    const [entries, setEntries] = useState<Entry[][]>([]);
    const [hasSelected, setHasSelected] = useState(false);

    const settings = useContext(SettingsContext);

    useEffect(() => {
        fetch("/api/entries")
            .then((res) => res.json())
            .then((data) => {
                // Separate question sets into array
                const entrySet: Entry[][] = [];
                data.forEach((entry: Entry) => {
                    if (!entrySet[entry.questionSet]) {
                        entrySet[entry.questionSet] = [];
                    }
                    entrySet[entry.questionSet].push(entry);
                });

                // Shuffle entries once during the data-fetching phase, if questionShuffle is enabled
                const shuffledSets = entrySet.map((set) => {
                    return settings && settings.questionShuffle ? shuffleArray(set) : set;
                });

                setEntries(shuffledSets);
            });
    }, [settings]);

    // Ensure `entries` is not empty before rendering
    if (entries.length === 0) {
        return <div>Loading...</div>; // Add a loading state
    }

    return (
        <>
            <Quiz
                currentSet={currentSet}
                entries={entries}
                hasSelected={hasSelected}
                setHasSelected={setHasSelected}
            />
            <Progressbar
                currentSet={currentSet}
                setCurrentSet={setCurrentSet}
                maxSets={entries.length}
                hasSelected={hasSelected}
                setHasSelected={setHasSelected}
            />
        </>
    );
}
