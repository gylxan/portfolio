import { render, screen } from '@testing-library/react'
import Page from './Page'

describe('<Page />', () => {
  const mockChild = <span data-testid="test-child">I am test child</span>

  it('should render', () => {
    const { container } = render(<Page>{mockChild}</Page>)

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 mt-20',
    )
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })

  it('should render in full height', () => {
    const { container } = render(<Page fullHeight>{mockChild}</Page>)

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 flex h-full flex-col justify-center',
    )
  })
})
