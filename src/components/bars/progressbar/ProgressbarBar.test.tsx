import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressbarBar from './ProgressbarBar';

describe('ProgressbarBar component', () => {
    it('renders a 0% wide div when currentSet is 0 and maxSets is 2', () => {
        render(<ProgressbarBar currentSet={0} maxSets={2} hasSelected={false} />);
        expect(screen.getByTestId('meter').style.width).toBe('0%');
    });
    it('renders a 50% wide div when currentSet is 1 and maxSets is 2 and hasSelected is false', () => {
        render(<ProgressbarBar currentSet={1} maxSets={2} hasSelected={false} />);
        expect(screen.getByTestId('meter').style.width).toBe('50%');
    });
    it('renders a 50% wide div when currentSet is 1 and maxSets is 2 and hasSelected is true', () => {
        render(<ProgressbarBar currentSet={1} maxSets={2} hasSelected={true} />);
        expect(screen.getByTestId('meter').style.width).toBe('100%');
    });
    it('throws an error when currentSet is equal to maxSets', () => {
        expect(() => {
            render(<ProgressbarBar currentSet={2} maxSets={2} hasSelected={true} />);
        }).toThrow('currentSet must be less than maxSets');
    });
});