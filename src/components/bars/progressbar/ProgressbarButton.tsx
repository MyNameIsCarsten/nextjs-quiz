import appStyles from "@/styles/app.module.css";
import Link from "next/link";
import React from "react";

interface Props {
    currentSet: number,
    setCurrentSet: React.Dispatch<React.SetStateAction<number>>,
    maxSets: number,
    hasSelected: boolean,
    setHasSelected: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

function ProgressbarButton({currentSet, maxSets, setCurrentSet, hasSelected, setHasSelected}: Props) {
    const handleNext = () => {
        setCurrentSet((prev) => prev + 1);
        setHasSelected(false)
    };

    return (
        <div data-testid="progressbarbutton">
            {
                currentSet !== maxSets - 1 ?
                    <button data-testid={"nextbutton"} className={appStyles.button} onClick={handleNext} disabled={!hasSelected}>
                        Next
                    </button>
                    :
                    hasSelected ? (
                        <button className={appStyles.button} data-testid={"finishbutton"}>
                            <Link href="/summary">Finish Quiz</Link>
                        </button>
                    ) : (
                        <button className={appStyles.button} disabled data-testid={"finishbutton"}>
                            Finish Quiz
                        </button>
                    )
            }
        </div>
    );
}

export default ProgressbarButton;
