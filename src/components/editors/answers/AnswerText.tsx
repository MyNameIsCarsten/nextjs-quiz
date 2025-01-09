import {Entry} from "@/types/Entry";

interface Props {
    answer: Entry,
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}


function AnswerText({answer, setAnswers}: Props) {
    const handleAnswerChange = async (answerId: number, newText: string) => {
        try {
            const res = await fetch(`/api/entries/${answerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newText }),
            });

            if (res.ok) {
                const updatedAnswer = await res.json();
                setAnswers((prevAnswers) =>
                    prevAnswers.map((prevAnswer) =>
                        prevAnswer.id === answerId ? updatedAnswer : prevAnswer
                    )
                );
            } else {
                console.error("Failed to update answer");
            }
        } catch (error) {
            console.error("Error updating answer:", error);
        }
    };

    return (
        <input
            data-testid={`answer-text`}
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
        />
    );
}

export default AnswerText;
