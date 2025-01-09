import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressbarTracker from './ProgressbarTracker';

describe('ProgressbarTracker component', () => {
    it('renders correct numbers', () => {
        const currentSet = 1;
        const maxSets = 2;
        render(<ProgressbarTracker
            currentSet={currentSet}
            maxSets={maxSets}
        />);
        expect(screen.getByText(`${currentSet + 1} / ${maxSets}`)).toBeInTheDocument();
    });
});