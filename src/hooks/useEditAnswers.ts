import { useEffect, useState } from "react";
import { Entry } from "@/types/Entry";

export const useEditAnswers = (id: string | string[] | undefined) => {
    const [question, setQuestion] = useState<Entry | null>(null);
    const [answers, setAnswers] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(true); // Start in loading state
            setTimeout(() => setLoading(false), 0); // Simulate a short delay to allow rendering
            return;
        }

        const fetchEntries = async () => {
            try {
                const res = await fetch(`/api/entries`);
                const data = await res.json();

                const questionEntry = data.find(
                    (entry: Entry) =>
                        entry.questionSet === parseInt(id as string, 10) && entry.type === "question"
                );
                const answerEntries = data.filter(
                    (entry: Entry) =>
                        entry.type === "answer" && entry.questionSet === parseInt(id as string, 10)
                );

                setQuestion(questionEntry || null);
                setAnswers(answerEntries);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, [id]);

    return { question, answers, setAnswers, loading };
};