import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import fetchMock from "jest-fetch-mock";
import {Entry} from "@/types/Entry";
import AnswerText from "./AnswerText";
import {beforeEach} from "@jest/globals";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('AnswerText', () => {
    let answer: Entry;
    let setAnswers: jest.Mock<any, any, any>;
    beforeEach(() => {
        fetchMock.resetMocks(); // Reset fetch mock before each test

        answer = {
            id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false
        };
        setAnswers = jest.fn();// Mock the setAnswers function

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {}
            )
        );
    });
    it('does not call handleAnswerChange when the input field is not changed', () => {
        render(<AnswerText answer={answer} setAnswers={setAnswers}/>);

        // Wait for the fetch and DOM updates to complete
        waitFor(() => {
            expect(setAnswers).not.toHaveBeenCalled();
        });
    });
    it('calls handleAnswerChange when the input field is changed', () => {
        const { getByTestId } = render(<AnswerText answer={answer} setAnswers={setAnswers}/>);

        // Simulate user input
        const input = getByTestId('answer-text');
        fireEvent.change(input, { target: { value: 'Test' } });

        // Wait for the fetch and DOM updates to complete
        waitFor(() => {
            expect(setAnswers).toHaveBeenCalledTimes(1);
        });
    });
});