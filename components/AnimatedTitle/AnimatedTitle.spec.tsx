import AnimatedTitle, {AnimatedTitleProps} from './AnimatedTitle'
import {render} from '@testing-library/react'

describe('<AnimatedTitle />', () => {
  const props: AnimatedTitleProps = {
    children: 'My title',
  }

  it('should render title', () => {
    const { container } = render(<AnimatedTitle {...props} />)

    expect(container.querySelector('h1')).toBeInTheDocument()
  })
})
