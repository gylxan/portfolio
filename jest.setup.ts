// jest.setup.ts
import '@testing-library/jest-dom'

import type * as ReactDom from 'react-dom';

jest.mock('react-dom', () => ({
    ...jest.requireActual<typeof ReactDom>('react-dom'),
    preload: jest.fn(),
}));
