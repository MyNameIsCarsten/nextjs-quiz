import { useEffect, useState } from "react";
import { Settings } from "@/context/SettingsContext";

export const useSyncSettingState = (settings: Settings | null) => {
    const [shuffleQuestions, setShuffleQuestions] = useState(settings?.questionShuffle ?? false);
    const [shuffleAnswers, setShuffleAnswers] = useState(settings?.answerShuffle ?? false);

    useEffect(() => {
        if (settings) {
            setShuffleQuestions(settings.questionShuffle ?? false);
            setShuffleAnswers(settings.answerShuffle ?? false);
        } else {
            setShuffleQuestions(false);
            setShuffleAnswers(false);
        }
    }, [settings]);

    return { shuffleQuestions, setShuffleQuestions, shuffleAnswers, setShuffleAnswers };
};