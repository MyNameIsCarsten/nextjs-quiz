import '@testing-library/jest-dom'
import {getByText, render, screen} from '@testing-library/react';
import QuizAnswers from "@/components/quiz/QuizAnswers";
import { waitFor } from '@testing-library/react';
import {Entry} from "@/types/Entry";

describe('QuizAnswers component', () => {
    it('renders answers form given entries', async () => {
        const entries: Entry[] = [
                { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
                { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true }
        ];

        render(
            <QuizAnswers
                entries={entries}
                hasSelected={false}
                setHasSelected={() => {}}
            />
        );

        await waitFor(() => {
            expect(screen.queryByText(entries[0].text)).not.toBeInTheDocument(); // type: question should not be in document
            expect(screen.queryByText(entries[1].text)).toBeInTheDocument(); // type: answer should be in document
        });
    });
});