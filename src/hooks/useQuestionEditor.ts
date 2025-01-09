import { useEffect, useState } from "react";

export const useQuestionEditor = (id: string | undefined) => {
    const [question, setQuestion] = useState({ text: "" });
    const [newText, setNewText] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`/api/entries/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setQuestion(data);
                    setNewText(data.text);
                })
                .catch((error) => console.error("Error fetching question:", error));
        }
    }, [id]);

    return { question, newText, setNewText };
};
