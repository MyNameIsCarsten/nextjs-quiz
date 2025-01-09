import '@testing-library/jest-dom'
import {getByText, render, screen} from '@testing-library/react';
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { waitFor } from '@testing-library/react';
import {Entry} from "@/types/Entry";

describe('QuizQuestion component', () => {
    it('renders question form given entries', async () => {
        const entries: Entry[] = [
            { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true }
        ];

        render(
            <QuizQuestion
                entries={entries}
            />
        );

        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: 'Question 1' })).toBeInTheDocument(); // type: question should be in document
            expect(screen.queryByText(entries[1].text)).not.toBeInTheDocument(); // type: answer should not be in document
        });
    });
});