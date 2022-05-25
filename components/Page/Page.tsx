import { HTMLProps } from 'react'

interface PageProps extends HTMLProps<HTMLDivElement> {
  fullHeight?: boolean
}

const Page = ({ fullHeight, ...props }: PageProps) => (
  <div
    {...props}
    className={
      'container mx-auto px-4' +
      (fullHeight ? ' flex h-full flex-col justify-center' : ' mt-20')
    }
  />
)

export default Page
