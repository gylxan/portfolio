import { parseHtml } from 'utils/htmlParse';
import { render, screen } from '@testing-library/react';

describe('HTML parsing utils', () => {
  describe('parseHtml', () => {
    it('should return the parsed HTML with next link', () => {
      const parsed = parseHtml(
        '<div><a href="https://example.com">My link</a></div>',
      );

      render(<div>{parsed}</div>);

      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link').getAttribute('href')).toBe(
        'https://example.com',
      );
      expect(screen.getByRole('link').getAttribute('target')).toBe('_blank');
      expect(
        screen.getByRole('link').getAttribute('aria-label'),
      ).toBeNull();
      expect(screen.getByRole('link').textContent).toBe('My link');
    });

    it('should return the parsed HTML with next link and given attributes', () => {
      const parsed = parseHtml(
        '<div><a href="https://example.com" aria-label="My label" target="_self">My link</a></div>',
      );

      render(<div>{parsed}</div>);

      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link').getAttribute('href')).toBe(
        'https://example.com',
      );
      expect(screen.getByRole('link').getAttribute('target')).toBe('_self');
      expect(
        screen.getByRole('link').getAttribute('aria-label'),
      ).toBe('My label');
      expect(screen.getByRole('link').textContent).toBe('My link');
    });
  });
});
