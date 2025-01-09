// src/components/editors/question/NewQuestion.test.tsx
import React from 'react';
import {render, fireEvent, waitFor, getByDisplayValue} from '@testing-library/react';
import NewQuestion from './NewQuestion';
import NewQuestionText from './NewQuestionText';
import QuestionAddButton from './QuestionAddButton';
import { Entry } from '@/types/Entry';

jest.mock('./NewQuestionText', () => ({
    __esModule: true,
    default: jest.fn(() => <div>Mock NewQuestionText</div>),
}));

jest.mock('./QuestionAddButton', () => ({
    __esModule: true,
    default: jest.fn(() => <div>Mock QuestionAddButton</div>),
}));

describe('NewQuestion component', () => {
    it('renders the NewQuestionText and QuestionAddButton components', () => {
        const questions: Entry[] = [];
        const setQuestions = jest.fn();
        const { getByText } = render(<NewQuestion questions={questions} setQuestions={setQuestions} />);
        expect(getByText('Mock NewQuestionText')).toBeInTheDocument();
        expect(getByText('Mock QuestionAddButton')).toBeInTheDocument();
    });

    it('calls the setNewQuestionText function when the NewQuestionText component is updated', async () => {
        const questions: Entry[] = [];
        const setQuestions = jest.fn();
        const setNewQuestionText = jest.fn();
        (NewQuestionText as jest.Mock).mockImplementation(() => (
            <input type="text" value="new question text" onChange={() => setNewQuestionText('new question text')} />
        ));

        const { getByDisplayValue } = render(<NewQuestion questions={questions} setQuestions={setQuestions} />);
        const input = getByDisplayValue('new question text');
        fireEvent.change(input, { target: { value: 'updated question text' } });

        await waitFor(() => {
            expect(setNewQuestionText).toHaveBeenCalledTimes(1);
            expect(setNewQuestionText).toHaveBeenCalledWith('new question text');
        });
    });

    it('calls the setQuestions function when the QuestionAddButton is clicked', async () => {
        const questions: Entry[] = [];
        const setQuestions = jest.fn();
        const newQuestionText = 'new question text';
        (QuestionAddButton as jest.Mock).mockImplementation(() => (
            <button onClick={() => setQuestions([...questions, newQuestionText])}>Add Question</button>
        ));

        const { getByText } = render(<NewQuestion questions={questions} setQuestions={setQuestions} />);
        const button = getByText('Add Question');
        fireEvent.click(button);

        await waitFor(() => {
            expect(setQuestions).toHaveBeenCalledTimes(1);
            expect(setQuestions).toHaveBeenCalledWith([...questions, newQuestionText]);
        });
    });
});