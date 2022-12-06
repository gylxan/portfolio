import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from 'components/tabs/tabs';
import Tab from 'components/tabs/tab/tab';

describe('<Tabs />', () => {
  const renderTabs = () =>
    render(
      <Tabs>
        <Tab title="Tab 1">My content for Tab 1</Tab>
        <Tab title="Tab 2">My content for Tab 2</Tab>
      </Tabs>,
    );
  it('should render tabs', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tabpanel').length).toBe(1); // One is shown, other is hidden
    expect(screen.getAllByRole('tab').length).toBe(2);
    expect(screen.getAllByRole('tab')[0].getAttribute('aria-selected')).toBe(
      'true',
    );
    expect(screen.getByText('My content for Tab 1')).toBeInTheDocument();
  });

  it('should show other tab panel on click on tab', () => {
    renderTabs();

    fireEvent.click(screen.getAllByRole('tab')[1]);

    expect(screen.getAllByRole('tab')[1].getAttribute('aria-selected')).toBe(
      'true',
    );
    expect(screen.getByText('My content for Tab 2')).toBeInTheDocument();
  });
});
