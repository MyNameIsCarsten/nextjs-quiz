import React from 'react';
import '@testing-library/jest-dom'
import {fireEvent, render, waitFor} from '@testing-library/react';
import {beforeEach} from "@jest/globals";
import QuestionText from "@/components/editors/question/QuestionText";
import fetchMock from "jest-fetch-mock";

//  Jest Fetch Mock allows you to easily mock your fetch calls and return the response you need to fake the HTTP requests.
fetchMock.enableMocks();

describe('QuestionText', () => {
    let newText: string;
    let setNewText: jest.Mock<any, any, any>;
    let inputRef: React.RefObject<HTMLInputElement | null>;
    let hiddenSpanRef: React.RefObject<HTMLSpanElement>;
    let questionId: string | string[] | undefined;

    beforeEach(() => {
        fetchMock.resetMocks(); // Reset fetch mock before each test
        jest.resetAllMocks();

        // Mock state and refs
        newText = "Initial text";
        setNewText = jest.fn();
        inputRef = React.createRef<HTMLInputElement>();
        //@ts-ignore
        hiddenSpanRef = { current: { offsetWidth: 50, textContent: "" } }; // Mock span ref
        questionId = "123";

        // Mock fetch API
        fetchMock.mockResponseOnce(
            JSON.stringify(
                {}
            )
        );
    });

    it('renders the input with the correct value', () => {
        const { getByTestId } = render(
            <QuestionText
                newText={newText}
                setNewText={setNewText}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                hiddenSpanRef={hiddenSpanRef}
                questionId={questionId}
            />
        );

        const input = getByTestId('question-text');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Initial text');
    });

    it('calls setNewText and updates hidden span when input value changes', () => {
        const { getByTestId } = render(
            <QuestionText
                newText={newText}
                setNewText={setNewText}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                hiddenSpanRef={hiddenSpanRef}
                questionId={questionId}
            />
        );

        const input = getByTestId('question-text');

        console.error = jest.fn(() => {}); // Mock console.error

        // Simulate input change
        fireEvent.change(input, { target: { value: 'Updated text' } });

        expect(setNewText).toHaveBeenCalledWith('Updated text');
        expect(hiddenSpanRef.current.textContent).toBe('Updated text');
    });

    it('dynamically updates the input width based on hidden span width', () => {
        const { getByTestId } = render(
            <QuestionText
                newText={newText}
                setNewText={setNewText}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                hiddenSpanRef={hiddenSpanRef}
                questionId={questionId}
            />
        );

        const input = getByTestId('question-text');
        expect(input).toHaveStyle('width: 55px'); // 50px + 5px padding
    });

    it('sends a PATCH request when input value changes', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Headers(), // Pass the headers object
                redirected: false,
                url: '',
                body: null,
                bodyUsed: false,
                arrayBuffer: jest.fn(),
                blob: jest.fn(),
                json: jest.fn(),
                text: jest.fn(),
                type: 'cors', // Add this property
                clone: jest.fn(), // Add this property
                bytes: jest.fn(() => Promise.resolve(new Uint8Array())), // Add this property
                formData: jest.fn(), // Add this property
            })
        );

        const { getByTestId } = render(
            <QuestionText
                newText={newText}
                setNewText={setNewText}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                hiddenSpanRef={hiddenSpanRef}
                questionId={questionId}
            />
        );

        const input = getByTestId('question-text');

        // Simulate input change
        fireEvent.change(input, { target: { value: 'New question text' } });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(`/api/entries/123`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: 'New question text' }),
            });
        });
    });

    it('logs an error when the fetch fails', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 200,
                statusText: 'OK',
                headers: new Headers(), // Pass the headers object
                redirected: false,
                url: '',
                body: null,
                bodyUsed: false,
                arrayBuffer: jest.fn(),
                blob: jest.fn(),
                json: jest.fn(),
                text: jest.fn(),
                type: 'cors', // Add this property
                clone: jest.fn(), // Add this property
                bytes: jest.fn(() => Promise.resolve(new Uint8Array())), // Add this property
                formData: jest.fn(), // Add this property
            })
        );

        console.error = jest.fn(() => {}); // Mock console.error

        const { getByTestId } = render(
            <QuestionText
                newText={newText}
                setNewText={setNewText}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
                hiddenSpanRef={hiddenSpanRef}
                questionId={questionId}
            />
        );

        const input = getByTestId('question-text');

        // Simulate input change
        fireEvent.change(input, { target: { value: 'Another text' } });

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Failed to update question text');
        });
    });
});