// src/components/editors/answers/AnswersEditButton.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import AnswersEditButton from './AnswersEditButton';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('AnswersEditButton component', () => {
    it('renders the button with the correct text', () => {
        const { getByText } = render(<AnswersEditButton questionSet={1} />);
        expect(getByText('Edit Answers')).toBeInTheDocument();
    });

    it('calls the router.push function when the button is clicked', async () => {
        const routerPushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });

        const { getByText } = render(<AnswersEditButton questionSet={1} />);
        const button = getByText('Edit Answers');
        fireEvent.click(button);

        await waitFor(() => {
            expect(routerPushMock).toHaveBeenCalledTimes(1);
            expect(routerPushMock).toHaveBeenCalledWith('/questions/answers/1');
        });
    });

    it('renders the button with the correct styles', () => {
        const { getByText } = render(<AnswersEditButton questionSet={1} />);
        const button = getByText('Edit Answers');
        expect(button).toHaveClass('button');
    });
});