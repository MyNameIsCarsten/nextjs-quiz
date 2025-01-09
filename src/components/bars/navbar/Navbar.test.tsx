import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
    it('renders Quiz Link', () => {
        render(<Navbar />);
        expect(screen.getByText('Quiz')).toBeInTheDocument();
    });

    it('renders Edit Quiz Link', () => {
        render(<Navbar />);
        expect(screen.getByText('Edit Quiz')).toBeInTheDocument();
    });

    it('renders Settings Link', () => {
        render(<Navbar />);
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});