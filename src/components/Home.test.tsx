import '@testing-library/jest-dom'
import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import Home from './Home';
import fetchMock from 'jest-fetch-mock';
import {Entry} from "@/types/Entry";
import {beforeEach} from "@jest/globals";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('Home component', () => {
    beforeEach(() => {
        const entries: Entry[] = [
            { id: 1, questionSet: 0, type: 'question', text: 'Question 1', isCorrect: false },
            { id: 2, questionSet: 0, type: 'answer', text: 'Answer 1', isCorrect: true },
            { id: 3, questionSet: 1, type: 'question', text: 'Question 2', isCorrect: false },
            { id: 4, questionSet: 1, type: 'answer', text: 'Answer 2', isCorrect: true }
        ];
        fetchMock.mockResponseOnce(JSON.stringify( entries ));
    });
    it('renders the quiz container', async() => {
        await act(async () => {
            render(<Home />);
        });
        // Wait for the quiz container to appear
        await waitFor(() => {
            expect(screen.getByTestId('quiz')).toBeInTheDocument();
            // The default state for currentSet is 0 so questionSet 0 should be rendered
            expect(screen.getByText('Question 1')).toBeInTheDocument();
            expect(screen.getByText('Answer 1')).toBeInTheDocument();
        });

    });

    it('renders the progress bar', async () => {
        await act(async () => {
            render(<Home />);
        });
        // Wait for the progressbar container to appear
        await waitFor(() => {
            expect(screen.getByTestId('progressbar')).toBeInTheDocument();
        });
    });
});