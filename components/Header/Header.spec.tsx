import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'
import { Theme } from '../../constants/theme'

const mockTheme = {
  theme: Theme.Light,
  setTheme: jest.fn(),
}

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => mockTheme),
}))

describe('<Header />', function () {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('toggles theme on icon click', async () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId('theme-switch'))

    expect(mockTheme.setTheme).toHaveBeenCalledTimes(1)
    expect(mockTheme.setTheme).toHaveBeenCalledWith(Theme.Dark)
  })
})
