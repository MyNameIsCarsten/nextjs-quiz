import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Quiz from "@/components/quiz/Quiz";
import { waitFor } from '@testing-library/react';
import {Entry} from "@/types/Entry";

describe('Quiz component', () => {
    it('renders questions and answers form current set', async () => {
        const entries: Entry[][] = [
            [
                { id: 1, questionSet: 1, type: 'question', text: 'Question 1', isCorrect: false },
                { id: 2, questionSet: 1, type: 'answer', text: 'Answer 1', isCorrect: true }
            ],
            [
                { id: 3, questionSet: 2, type: 'question', text: 'Question 2', isCorrect: false },
                { id: 4, questionSet: 2, type: 'answer', text: 'Answer 2', isCorrect: true }
            ]
        ];

        render(
            <Quiz
                    entries={entries}
                    hasSelected={false}
                    setHasSelected={() => {}}
                    currentSet={0}
            />
        );

        await waitFor(() => screen.getByRole('heading', { name: 'Question 1' }));
        expect(screen.getByRole('heading', { name: 'Question 1' })).toBeInTheDocument()
        expect(screen.getByText('Answer 1')).toBeInTheDocument();
        // Ensure questionSet 2 entries are not rendered
        expect(screen.queryByRole('heading', { name: 'Question 2' })).not.toBeInTheDocument();
        expect(screen.queryByText('Answer 2')).not.toBeInTheDocument();
    });
});