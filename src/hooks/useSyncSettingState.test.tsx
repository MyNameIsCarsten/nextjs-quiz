import React, { FC } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import { useSyncSettingState } from '@/hooks/useSyncSettingState';

// Mock component to test the hook
const TestComponent: FC<{ settings: any }> = ({ settings }) => {
    const { shuffleQuestions, shuffleAnswers, setShuffleQuestions, setShuffleAnswers } =
        useSyncSettingState(settings);

    return (
        <div>
            <div data-testid="shuffle-questions">{shuffleQuestions ? 'true' : 'false'}</div>
            <div data-testid="shuffle-answers">{shuffleAnswers ? 'true' : 'false'}</div>
            <button onClick={() => setShuffleQuestions(!shuffleQuestions)}>Toggle Questions</button>
            <button onClick={() => setShuffleAnswers(!shuffleAnswers)}>Toggle Answers</button>
        </div>
    );
};

describe('useSyncSettingState', () => {
    it('should initialize state with default values when settings are null', () => {
        render(<TestComponent settings={null} />);

        expect(screen.getByTestId('shuffle-questions').textContent).toBe('false');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('false');
    });

    it('should initialize state with values from settings', () => {
        const settings = { questionShuffle: true, answerShuffle: false };

        act(() => {
            render(<TestComponent settings={settings} />);
        });

        expect(screen.getByTestId('shuffle-questions').textContent).toBe('true');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('false');
    });

    it('should update state using state setters', () => {
        const settings = { questionShuffle: false, answerShuffle: true };

        act(() => {
            render(<TestComponent settings={settings} />);
        });

        const toggleQuestions = screen.getByText('Toggle Questions');
        const toggleAnswers = screen.getByText('Toggle Answers');

        // Initial state
        expect(screen.getByTestId('shuffle-questions').textContent).toBe('false');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('true');

        // Simulate clicks to change state
        act(() => {
            fireEvent.click(toggleQuestions);
            fireEvent.click(toggleAnswers);
        });

        // Updated state
        expect(screen.getByTestId('shuffle-questions').textContent).toBe('true');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('false');
    });

    it('should reset to default values if settings change to null', () => {
        const { rerender } = render(<TestComponent settings={{ questionShuffle: true, answerShuffle: true }} />);

        // Assert initial state
        expect(screen.getByTestId('shuffle-questions').textContent).toBe('true');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('true');

        // Re-render with settings set to null
        act(() => {
            rerender(<TestComponent settings={null} />);
        });

        // Assert that the state has reset to default values
        expect(screen.getByTestId('shuffle-questions').textContent).toBe('false');
        expect(screen.getByTestId('shuffle-answers').textContent).toBe('false');
    });
});
