import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionEditor from './QuestionEditor';

describe('QuestionEditor component', () => {
    beforeEach(() => {
        render(<QuestionEditor
            newText = "Hello World"
            setNewText={() =>{}}
            questionId={"1"}
        />);
    });

    it('renders the label text', () => {
        expect(screen.getByText('Question Text:')).toBeInTheDocument();
    });
    it('renders the text field', () => {
        expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });
    it('renders the hidden span for measuring the width', () => {
        expect(screen.getByTestId('hidden-span')).toBeInTheDocument();
    });
});