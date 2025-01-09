import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressbarButton from './ProgressbarButton';

describe('ProgressbarButton component', () => {
    it('renders Next button when currentSet is less than maxSets - 1', () => {
        render(<ProgressbarButton
            currentSet={0}
            maxSets={2}
            setCurrentSet={() => {}}
            hasSelected={false}
            setHasSelected={() => {}}
        />);
        expect(screen.getByTestId('nextbutton')).toBeInTheDocument();
    });
    it('renders disabled Finish Quiz button when currentSet is equal to maxSets - 1 and hasSelected is false', () => {
        render(<ProgressbarButton
            currentSet={1}
            maxSets={2}
            setCurrentSet={() => {}}
            hasSelected={false}
            setHasSelected={() => {}}
        />);
        expect(screen.getByTestId('finishbutton')).toBeInTheDocument();
        expect(screen.getByTestId('finishbutton')).toBeDisabled();
    });
    it('renders enabled Finish Quiz button when currentSet is equal to maxSets - 1 and hasSelected is true', () => {
        render(<ProgressbarButton
            currentSet={1}
            maxSets={2}
            setCurrentSet={() => {}}
            hasSelected={true}
            setHasSelected={() => {}}
        />);
        expect(screen.getByTestId('finishbutton')).toBeInTheDocument();
        expect(screen.getByTestId('finishbutton')).not.toBeDisabled();
    });

});