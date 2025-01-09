import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import AnswerEditor from './AnswerEditor';

describe('AnswerEditor component', () => {
    beforeEach(() => {
        render(<AnswerEditor
            answer={
                {
                    id: 1,
                    questionSet: 0,
                    type: 'answer',
                    text: 'Hello World',
                    isCorrect: true,
                }
            }
            setAnswers={() =>{}}
        />);
    });

    it('renders the input field ', () => {
        expect(screen.getByTestId('answer-text')).toBeInTheDocument();
    });

    it('renders the checkbox ', () => {
        expect(screen.getByTestId('answer-is-correct-checkbox')).toBeInTheDocument();
    });

    it('renders the delete button ', () => {
        expect(screen.getByTestId('answer-delete-button')).toBeInTheDocument();
    })
});