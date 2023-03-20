import { ExperienceProps } from 'components/experiences/experience/experience';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Experience } from 'components';
import { getFormattedMonthAndYear } from 'utils/date';
import { routerConfig } from '__mocks__/next/router';

describe('<Experience />', () => {
  const props: ExperienceProps = {
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
  };

  it('should render', () => {
    render(<Experience {...props} />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').textContent).toBe(props.company);
    expect(
      screen.getByText(
        `${getFormattedMonthAndYear(
          props.positions[0].startDate,
          routerConfig.locale,
        )} - ${getFormattedMonthAndYear(
          props.positions[0].endDate,
          routerConfig.locale,
        )}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('experience-position').length).toBe(
      props.positions.length,
    );
  });
});
