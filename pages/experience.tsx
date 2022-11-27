import { AnimatedTitle, Link, Page, Tab, Tabs } from '../components';
import { parseJSON } from '../utils/json';
import type { GetStaticProps } from 'next';
import type { Experience as IExperience } from '../types/experience';

interface ExperienceProps {
  experiences: IExperience[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  return (
    <Page title="Experience">
      <AnimatedTitle title="Experience" />
      <div className="container mt-8">
        <Tabs aria-label="Job Tabs" className="mx-auto max-w-3xl">
          {experiences.map(({ company, url, positions }) => (
            <Tab key={company} title={company}>
              <h2 className="mb-3 text-xl">
                <Link href={url} target="_blank">
                  {company}
                </Link>
              </h2>
              <div className="flex flex-col gap-6">
                {positions.map(({ name, startDate, endDate, tasks }) => (
                  <div key={name}>
                    <h3 className="mb-1 text-lg">{name}</h3>
                    <p className="mb-4">
                      {startDate} - {endDate ? endDate : 'Present'}
                    </p>
                    <ul>
                      {tasks.map((task) => (
                        <li
                          key={task}
                          className="relative pl-8 before:absolute before:left-0 before:ml-[-1] before:inline-block before:w-6 before:text-secondary before:content-['\1405']"
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<ExperienceProps> = () => {
  return {
    props: {
      experiences: parseJSON<IExperience[]>(
        process.env.NEXT_PUBLIC_EXPERIENCES,
        [],
      ),
    },
  };
};

export default Experience;
