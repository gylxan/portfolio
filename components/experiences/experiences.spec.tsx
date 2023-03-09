import type { ExperiencesProps } from 'components/experiences/experiences';
import { Experiences } from 'components';
import { render, screen } from '@testing-library/react';

describe('<Experiences />', () => {
  const props: ExperiencesProps = {
    companies: [
      {
        company: 'My company',
        url: 'https://company.com',
        positions: [
          {
            role: 'Role 1',
            startDate: '2022-12-21',
            endDate: '2023-03-21',
            tasks: ['Task 1', 'Task 2'],
          },
          {
            role: 'Role 2',
            startDate: '2022-03-20',
            endDate: '2022-12-20',
            tasks: ['Task 1', 'Task 2'],
          },
        ],
      },
      {
        company: 'My company 2',
        url: 'https://company2.com',
        positions: [
          {
            role: 'Role 1',
            startDate: '2020-12-21',
            endDate: '2021-03-21',
            tasks: ['Task 1', 'Task 2'],
          },
          {
            role: 'Role 2',
            startDate: '2020-03-20',
            endDate: '2020-12-20',
            tasks: ['Task 1', 'Task 2'],
          },
        ],
      },
    ],
  };

  it('should render Tabs and a tab for each company', () => {
    render(<Experiences {...props} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab').length).toBe(props.companies.length);
  });
});
