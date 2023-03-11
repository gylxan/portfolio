import { render, screen } from '@testing-library/react';
import Footer, { FooterProps } from 'components/footer/footer';
import { mockSiteConfig } from 'constants/mock';
import type { SocialMedia } from 'types/siteConfig';

describe('<Footer />', () => {
  const props: FooterProps = {
    siteConfig: mockSiteConfig,
  };

  it('should render social media links and copyright', () => {
    render(<Footer {...props} />);

    expect(screen.getByTestId('copyright')).toBeInTheDocument();
    expect(screen.getByTestId('copyright').textContent).toBe(
      `© ${props.siteConfig.copyright}`,
    );

    expect(screen.getAllByRole('link').length).toBe(
      props.siteConfig.social.length,
    );
  });

  it('should not render a social media link, when it is not in the icon map', () => {
    const siteConfig = {
      ...props.siteConfig,
      social: [
        ...props.siteConfig.social,
        { url: 'https://invalid.com', media: 'invalid' as SocialMedia },
      ],
    };
    render(<Footer {...props} siteConfig={siteConfig} />);

    expect(screen.getAllByRole('link').length).toBe(
      siteConfig.social.length - 1,
    );
    expect(
      screen.queryByLabelText(`Link to invalid account`),
    ).not.toBeInTheDocument();
  });

  it('should not render the copyright, when undefined', () => {
    const siteConfig = { ...props.siteConfig, copyright: undefined };
    render(<Footer {...props} siteConfig={siteConfig} />);

    expect(screen.queryByTestId('copyright')).not.toBeInTheDocument();
  });
});
