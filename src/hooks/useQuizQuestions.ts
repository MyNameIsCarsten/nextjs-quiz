import { useEffect, useState } from "react";
import { Entry } from "@/types/Entry";

export const useQuizQuestions = () => {
    const [questions, setQuestions] = useState<Entry[]>([]);

    useEffect(() => {
        fetch("/api/entries")
            .then((res) => res.json())
            .then((data) => {
                const filteredData = data.filter((entry: Entry) => entry.type === "question");
                setQuestions(filteredData);
            })
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    return { questions, setQuestions };
};
