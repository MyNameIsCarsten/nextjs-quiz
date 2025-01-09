import styles from "../../styles/answer.module.css";
import React, {useContext, useReducer} from "react";
import {QuizDispatchContext} from "@/context/QuizContext";


interface Props {
    isCorrect: boolean,
    text: string,
    hasSelected?: boolean,
    isSelected: boolean,
    updateSelection: () => void,
}

const Answer = ({isCorrect, text, hasSelected, isSelected, updateSelection}: Props) => {
    const dispatch = useContext(QuizDispatchContext); // Access shared dispatch function

    const clickHandler = () => {
        updateSelection();
        if (isCorrect && dispatch) {
            dispatch({
                type: "hasSelected",
                payload: undefined,
            });
        }
    }

    return (
        <>
            {
                hasSelected && isSelected ?
                    <button className={`${styles.answer} ${isCorrect ? styles.true : styles.false}`}>
                        {text}
                    </button>
                    :
                    <button className={`${styles.answer}`} onClick={clickHandler}>
                        {text}
                    </button>
            }
        </>
    );
}

export default Answer;



