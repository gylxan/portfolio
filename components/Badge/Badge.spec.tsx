import Badge from './Badge'
import { render, screen } from '@testing-library/react'

describe('<Badge />', () => {
  it('should render badge', () => {
    render(<Badge />)

    expect(screen.findByTestId('badge')).not.toBeNull()
  })
})
