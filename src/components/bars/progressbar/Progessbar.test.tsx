import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import Progressbar from './Progressbar';

describe('Progressbar component', () => {
    beforeEach(() => {
        render(<Progressbar currentSet={0} setCurrentSet={() => {}} maxSets={2} hasSelected={false} setHasSelected={() => {}} />);
    });

    it('renders Quiz Link', () => {
        expect(screen.getByTestId('progressbartracker')).toBeInTheDocument();
    });

    it('renders Edit Quiz Link', () => {
        expect(screen.getByTestId('progressbarbar')).toBeInTheDocument();
    });

    it('renders Settings Link', () => {
        expect(screen.getByTestId('progressbarbutton')).toBeInTheDocument();
    });
});