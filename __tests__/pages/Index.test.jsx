import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from '../../pages';
import HealthPage from '../../components/HealthPage';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));


describe('Home component', () => {
    test('renders error message when health is not ok', () => {
        useState
            .mockReturnValueOnce([false, jest.fn()])   // healthOk
            .mockReturnValueOnce([false, jest.fn()])   // loadingHealth
            .mockReturnValueOnce([true, jest.fn()]);  // errorHealth

        render(<Home />);
        expect(screen.queryByText('Upsss, something went wrong!')).toBeInTheDocument();
    });

    test('renders loading message when loading questions', () => {
        useState
            .mockReturnValueOnce([false, jest.fn()])   // healthOk
            .mockReturnValueOnce([true, jest.fn()])   // loadingHealth
            .mockReturnValueOnce([false, jest.fn()]);  // errorHealth

        render(<Home />);
        expect(screen.queryByText("Loading 🔄")).toBeInTheDocument();

    });
});
