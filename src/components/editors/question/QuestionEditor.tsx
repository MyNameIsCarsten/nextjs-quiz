import {useEffect, useRef} from "react";
import QuestionText from "@/components/editors/question/QuestionText";
import QuestionHiddenSpan from "@/components/editors/question/QuestionHiddenSpan";

interface Props {
    newText: string,
    setNewText: (value: (((prevState: string) => string) | string)) => void,
    questionId: string | string[] | undefined
}


function QuestionEditor({newText, setNewText, questionId}: Props) {
    const hiddenSpanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Adjust input size after setting the initial text
        if (hiddenSpanRef.current && inputRef.current) {
            hiddenSpanRef.current.textContent = newText || " "; // Update hidden span content
            inputRef.current.style.width = `${hiddenSpanRef.current.offsetWidth + 5}px`; // Adjust width
        }
    }, [newText]); // Run when `newText` changes


    return (
        <>
            <label>
                Question Text:
                <div style={{position: "relative"}}>

                    <QuestionText
                        questionId={questionId}
                        newText={newText}
                        setNewText={setNewText}
                        inputRef={inputRef as React.RefObject<HTMLInputElement>}
                        hiddenSpanRef={hiddenSpanRef as React.RefObject<HTMLSpanElement>}
                    />

                    {/* Hidden span for measuring text width */}
                    <QuestionHiddenSpan
                        newText={newText}
                        hiddenSpanRef={hiddenSpanRef as React.RefObject<HTMLSpanElement>}
                    />
                </div>
            </label>
        </>
    );
}

export default QuestionEditor;
