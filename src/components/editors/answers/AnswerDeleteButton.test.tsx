import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import  AnswerDeleteButton  from './AnswerDeleteButton';
import fetchMock from "jest-fetch-mock";
import {Entry} from "@/types/Entry";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('AnswerDeleteButton component', () => {
    afterEach(() => {
        fetchMock.resetMocks();
        jest.restoreAllMocks();
    })
    it('deletes an answer when the button is clicked and window is confirmed', async () => {

        const answer: Entry = {
            id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false
        };
        const setAnswers = jest.fn();// Mock the setAnswers function
        const { getByText, getByTestId } = render(<AnswerDeleteButton answer={answer} setAnswers={setAnswers}/>);

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {}
            )
        );

        // Mock confirm
        jest.spyOn(window, 'confirm').mockReturnValue(true);

        // Mock alert
        jest.spyOn(window, 'alert').mockImplementationOnce(() => {})

        // Simulate button click
        const button = getByText('Delete');
        fireEvent.click(button);

        // Wait for the fetch and DOM updates to complete
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith(
                `/api/entries/${answer.id}`,
                expect.objectContaining({
                    method: 'DELETE',
                })
            );
            expect(setAnswers).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith('Answer deleted successfully!');
        });
    });

    it('does not delete an answer when the button is clicked and window is denied', async () => {

        const answer: Entry = {
            id: 1, text: 'Answer 1', type: 'answer', questionSet: 1, isCorrect: false
        };
        const setAnswers = jest.fn();// Mock the setAnswers function
        const { getByText, getByTestId } = render(<AnswerDeleteButton answer={answer} setAnswers={setAnswers}/>);

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {}
            )
        );

        // Mock confirm
        jest.spyOn(window, 'confirm').mockReturnValue(false);

        // Mock alert
        jest.spyOn(window, 'alert').mockImplementationOnce(() => {})

        // Simulate button click
        const button = getByText('Delete');
        fireEvent.click(button);

        // Wait for the fetch and DOM updates to complete
        await waitFor(() => {
            expect(setAnswers).toHaveBeenCalledTimes(0);
            expect(window.alert).not.toHaveBeenCalled();
        });
    });
});