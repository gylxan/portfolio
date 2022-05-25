import AnimatedTitle, {Props} from './AnimatedTitle'
import {render} from '@testing-library/react'

describe('<AnimatedTitle />', () => {
  const props: Props = {
    title: 'My title',
  }

  it('should render title', () => {
    const { container } = render(<AnimatedTitle {...props} />)

    expect(container.querySelector('h1')).toBeInTheDocument()
  })

  it('should render sub title when set', () => {
    const { container } = render(
      <AnimatedTitle {...props} subTitle="My sub title" />,
    )
    expect(container.querySelector('h1')).toBeInTheDocument()
    expect(container.querySelector('p')).toBeInTheDocument()
  })
})
