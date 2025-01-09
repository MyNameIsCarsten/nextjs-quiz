import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AnswersEditor from './AnswersEditor';
import { Entry } from "@/types/Entry";

describe('AnswersEditor component', () => {
    it('renders the answers list', () => {
        const answers: Entry[] = [
            { id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false },
            { id: 2, text: 'Answer 2', type: 'answer', questionSet: 1, isCorrect: true },
        ];
        const setAnswers = jest.fn();

        const { getByDisplayValue } = render(<AnswersEditor answers={answers} setAnswers={setAnswers} />);

        expect(getByDisplayValue('Answer 1')).toBeInTheDocument();
        expect(getByDisplayValue('Answer 2')).toBeInTheDocument();
    });

    it('calls setAnswers when an answer is updated', () => {
        const answers: Entry[] = [
            { id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false },
        ];
        const setAnswers = jest.fn();

        const { getByTestId } = render(<AnswersEditor answers={answers} setAnswers={setAnswers} />);

        const answerText = getByTestId('answer-text');
        fireEvent.change(answerText, { target: { value: 'New answer text' } });

        waitFor(() => {
            expect(setAnswers).toHaveBeenCalledTimes(1);
        });
    });
});