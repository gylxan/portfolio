import { queryAllByRole, queryByTestId, render } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  it('should render links and location and year', () => {
    const { container } = render(<Footer />)

    expect(queryAllByRole(container, 'link').length).toBe(3)
    expect(queryByTestId(container, 'location-and-year')).toBeInTheDocument()
  })
})
