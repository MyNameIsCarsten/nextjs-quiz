import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressbarDummy from './ProgressbarDummy';

describe('ProgressbarDummy component', () => {
    it('renders "Go Back To Quiz"', () => {
        render(<ProgressbarDummy/>);
        expect(screen.getByText('Go Back To Quiz')).toBeInTheDocument();
    });
});