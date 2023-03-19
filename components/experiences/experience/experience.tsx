import { Link } from 'components';
import { getFormattedMonthAndYear } from 'utils/date';
import React from 'react';
import type { Experience as IExperience } from 'types/experience';
import { useRouter } from 'next/router';

export type ExperienceProps = IExperience;
const Experience = ({ company, url, positions }: ExperienceProps) => {
  const { locale } = useRouter();
  return (
    <>
      <h2 className="mb-3 text-xl">
        <Link href={url} target="_blank">
          {company}
        </Link>
      </h2>
      <div className="flex flex-col gap-6">
        {positions.map(({ role, startDate, endDate, tasks }) => (
          <div key={`${role}-${startDate}`} data-testid="experience-position">
            <h3 className="mb-1 text-lg">{role}</h3>
            <p className="mb-4">
              {`${getFormattedMonthAndYear(
                startDate,
                locale,
              )} - ${getFormattedMonthAndYear(endDate, locale)}`}
            </p>
            <ul>
              {tasks.map((task) => (
                <li
                  key={`${role}-${startDate}-${task}`}
                  className="relative pl-8 before:absolute before:left-0 before:ml-[-1] before:inline-block before:w-6 before:text-secondary before:content-['\1405']"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Experience;
