import React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, getByTestId} from '@testing-library/react';
import  AddAnswer  from './AddAnswer';
import fetchMock from "jest-fetch-mock";
import {beforeEach} from "@jest/globals";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('AddAnswer component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        jest.clearAllMocks();
    });
      it('renders the input field and button', () => {
        const { getByPlaceholderText, getByText } = render(<AddAnswer setAnswers={() => {}} questionSet={1} />);
        expect(getByPlaceholderText('Enter new answer')).toBeInTheDocument();
        expect(getByText('Add Answer')).toBeInTheDocument();
      });

    it('adds an answer when the button is clicked', async () => {
        const setAnswers = jest.fn(); // Mock the setAnswers function
        const { getByText, getByTestId } = render(<AddAnswer setAnswers={setAnswers} questionSet={1} />);

        // Simulate user input
        const input = getByTestId('addAnswerInput');
        fireEvent.change(input, { target: { value: 'Test' } });

        // Mock fetch API response
        fetchMock.mockResponseOnce(
            JSON.stringify({
                id: 1,
                text: 'Test',
                type: 'answer',
                questionSet: 1,
                isCorrect: false,
            }),
            { status: 201 }
        );

        // Mock alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Simulate button click
        const button = getByText('Add Answer');
        fireEvent.click(button);

        // Wait for the fetch and DOM updates to complete
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith(
                '/api/entries',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: 'Test',
                        type: 'answer',
                        questionSet: 1,
                        isCorrect: false,
                    }),
                })
            );
            expect(setAnswers).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith('Answer added successfully!');
        });
    });


    it('shows alert when input field for new question is empty', async () => {
        const { getByPlaceholderText, getByText } = render(<AddAnswer setAnswers={() => {}} questionSet={1} />);

        // Mock alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Simulate button click
        const button = getByText('Add Answer');
        fireEvent.click(button);

        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Answer text cannot be empty.'));
      });

    it('shows no alert when input field for new question is filled', async () => {
        const { getByPlaceholderText, getByText } = render(<AddAnswer setAnswers={() => {}} questionSet={1} />);

        // Mock alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // Simulate user input
        const input = getByPlaceholderText('Enter new answer');
        fireEvent.change(input, { target: { value: 'Test' } });

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify({
                id: 1,
                text: 'Test',
                type: 'answer',
                questionSet: 1,
                isCorrect: false,
            })
        );

        // Simulate button click
        const button = getByText('Add Answer');
        fireEvent.click(button);

        await waitFor(() => expect(window.alert).not.toHaveBeenCalled());
    });
});