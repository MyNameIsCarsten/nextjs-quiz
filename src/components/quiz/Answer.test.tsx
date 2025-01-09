import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react';
import Answer from './Answer';
import fetchMock from "jest-fetch-mock";
import { QuizDispatchContext } from '@/context/QuizContext';

describe('Answer component', () => {
  it('renders the answer text', () => {
    const props = {
      text: 'This is a test answer',
      isCorrect: false,
      hasSelected: false,
      isSelected: false,
      updateSelection: jest.fn(),
    };
    const { getByText } = render(<Answer {...props} />);
    expect(getByText(props.text)).toBeInTheDocument();
  });

  it('calls updateSelection when clicked', () => {
    const props = {
      text: 'This is a test answer',
      isCorrect: false,
      hasSelected: false,
      isSelected: false,
      updateSelection: jest.fn(),
    };
    const { getByText } = render(<Answer {...props} />);
    const button = getByText(props.text);
    fireEvent.click(button);
    expect(props.updateSelection).toHaveBeenCalledTimes(1);
  });

    it('renders as uncolored when nothing is selected', async () => {
        const props = {
            text: 'This is a test answer',
            isCorrect: true,
            hasSelected: false,
            isSelected: false,
            updateSelection: jest.fn(),
        };
        const {getByText} = render(<Answer {...props} />);

        // Simulate button click
        const button = getByText(props.text);
        fireEvent.click(button);

        await waitFor(() => {
            // Check that the button has the "true" class
            expect(button.className).not.toContain("true");
            expect(button.className).not.toContain("false");
        });
    })

  it('renders as correct when isCorrect is true', async () => {
      const props = {
          text: 'This is a test answer',
          isCorrect: true,
          hasSelected: true,
          isSelected: true,
          updateSelection: jest.fn(),
      };
      const {getByText} = render(<Answer {...props} />);

      // Simulate button click
      const button = getByText(props.text);
      fireEvent.click(button);

      await waitFor(() => {
          // Check that the button has the "true" class
          expect(button.className).toContain("true");
      });
  })

    it('renders as false when isCorrect is false', async () => {
        const props = {
            text: 'This is a test answer',
            isCorrect: false,
            hasSelected: true,
            isSelected: true,
            updateSelection: jest.fn(),
        };
        const {getByText} = render(<Answer {...props} />);

        // Simulate button click
        const button = getByText(props.text);
        fireEvent.click(button);

        await waitFor(() => {
            // Check that the button has the "true" class
            expect(button.className).toContain("false");
        });
    });

    it("calls dispatch when isCorrect is true", () => {
        const mockDispatch = jest.fn(); // Mock the dispatch function
        const mockUpdateSelection = jest.fn(); // Mock the updateSelection function

        const props = {
            text: "This is a test answer",
            isCorrect: true, // Make sure this is true to trigger dispatch
            hasSelected: false,
            isSelected: false,
            updateSelection: mockUpdateSelection,
        };

        // Render the component within the context provider
        const { getByText } = render(
            <QuizDispatchContext.Provider value={mockDispatch}>
                <Answer {...props} />
            </QuizDispatchContext.Provider>
        );

        // Simulate a button click
        const button = getByText(props.text);
        fireEvent.click(button);

        // Verify the dispatch function was called
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "hasSelected",
            payload: undefined,
        });

        // Verify the updateSelection function was called
        expect(mockUpdateSelection).toHaveBeenCalledTimes(1);
    });

    it("does not call dispatch when isCorrect is false", () => {
        const mockDispatch = jest.fn();
        const mockUpdateSelection = jest.fn();

        const props = {
            text: "This is a test answer",
            isCorrect: false, // Answer is incorrect
            hasSelected: false,
            isSelected: false,
            updateSelection: mockUpdateSelection,
        };

        const { getByText } = render(
            <QuizDispatchContext.Provider value={mockDispatch}>
                <Answer {...props} />
            </QuizDispatchContext.Provider>
        );

        const button = getByText(props.text);
        fireEvent.click(button);

        // Assert that dispatch was not called
        expect(mockDispatch).not.toHaveBeenCalled();

        // Assert that updateSelection was still called
        expect(mockUpdateSelection).toHaveBeenCalledTimes(1);
    });
});