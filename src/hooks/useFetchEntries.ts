import { useEffect, useState } from "react";
import { Entry } from "@/types/Entry";

export const useFetchEntries = () => {
    const [entries, setEntries] = useState<Entry[][]>([]);

    useEffect(() => {
        fetch("/api/entries")
            .then((res) => res.json())
            .then((data) => {
                const entrySet: Entry[][] = [];
                data.forEach((entry: Entry) => {
                    if (!entrySet[entry.questionSet]) {
                        entrySet[entry.questionSet] = [];
                    }
                    entrySet[entry.questionSet].push(entry);
                });
                setEntries(entrySet);
            })
            .catch((error) => console.error("Error fetching entries:", error));
    }, []);

    return { entries };
};
