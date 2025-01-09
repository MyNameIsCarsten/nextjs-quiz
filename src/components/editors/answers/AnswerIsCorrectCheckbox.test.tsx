import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import  AnswerIsCorrectCheckbox  from './AnswerIsCorrectCheckbox';
import fetchMock from "jest-fetch-mock";
import {Entry} from "@/types/Entry";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('AnswerIsCorrectCheckbox', () => {
    it('calls handleCorrectChange when the checkbox is checked', () => {
        const answer: Entry = {
            id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false
        };
        const setAnswers = jest.fn();// Mock the setAnswers function
        const { getByText, getByTestId } = render(<AnswerIsCorrectCheckbox answer={answer} setAnswers={setAnswers}/>);

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {}
            )
        );

        // Simulate button click
        const button = getByText('Correct');
        fireEvent.click(button);

        // Wait for the fetch and DOM updates to complete
        waitFor(() => {
            expect(setAnswers).toHaveBeenCalledTimes(1);
        });
    })
});