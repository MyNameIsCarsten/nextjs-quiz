// src/components/editors/question/NewQuestionText.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewQuestionText from './NewQuestionText';

describe('NewQuestionText component', () => {
    it('renders the input field with the correct value', () => {
        const newQuestionText = 'new question text';
        const setNewQuestionText = jest.fn();
        const { getByPlaceholderText } = render(<NewQuestionText newQuestionText={newQuestionText} setNewQuestionText={setNewQuestionText} />);
        const input = getByPlaceholderText('Enter new question');
        expect(input).toHaveValue(newQuestionText);
    });

    it('calls the setNewQuestionText function when the input field is changed', () => {
        const newQuestionText = 'new question text';
        const setNewQuestionText = jest.fn();
        const { getByPlaceholderText } = render(<NewQuestionText newQuestionText={newQuestionText} setNewQuestionText={setNewQuestionText} />);
        const input = getByPlaceholderText('Enter new question');
        fireEvent.change(input, { target: { value: 'updated question text' } });
        expect(setNewQuestionText).toHaveBeenCalledTimes(1);
        expect(setNewQuestionText).toHaveBeenCalledWith('updated question text');
    });

    it('renders the input field with the correct placeholder text', () => {
        const newQuestionText = 'new question text';
        const setNewQuestionText = jest.fn();
        const { getByPlaceholderText } = render(<NewQuestionText newQuestionText={newQuestionText} setNewQuestionText={setNewQuestionText} />);
        const input = getByPlaceholderText('Enter new question');
        expect(input).toHaveAttribute('placeholder', 'Enter new question');
    });

    it('renders the input field with the correct class name', () => {
        const newQuestionText = 'new question text';
        const setNewQuestionText = jest.fn();
        const { getByPlaceholderText } = render(<NewQuestionText newQuestionText={newQuestionText} setNewQuestionText={setNewQuestionText} />);
        const input = getByPlaceholderText('Enter new question');
        expect(input).toHaveClass('input');
    });
});