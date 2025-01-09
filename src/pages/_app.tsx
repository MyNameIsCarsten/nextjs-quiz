import App from '@/App';
import { useReducer } from "react";
import { QuizContext, QuizDispatchContext } from "@/context/QuizContext";
import {initialQuiz, quizReducer} from "@/reducers/quizReducer";


function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
    const [quiz, dispatch] = useReducer(quizReducer, initialQuiz);

    return (
        <QuizContext.Provider value={quiz}>
            <QuizDispatchContext.Provider value={dispatch}>
                <div data-testid="app"> {/* Ensure this wraps all content */}
                    <App>
                        <Component {...pageProps} />
                    </App>
                </div>
            </QuizDispatchContext.Provider>
        </QuizContext.Provider>
    );
}

export default MyApp;