import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import { parseJSON } from '../utils/json';
import Link from '../components/Link/Link';
import Tabs from '../components/Tabs/Tabs';
import Tab from '../components/Tabs/Tab/Tab';

export interface ExperienceProps {
  company: string;
  url: string;
  positions: {
    name: string;
    startDate: string;
    endDate: string;
    tasks: string[];
  }[];
}
const Experience = () => {
  const experiences = parseJSON<ExperienceProps[]>(
    process.env.NEXT_PUBLIC_EXPERIENCES,
    [],
  );
  return (
    <Page title="Experience">
      <AnimatedTitle title="Experience" />
      <div className="container mt-8">
        <Tabs aria-label="Job Tabs" className="justify-center">
          {experiences.map(({ company, url, positions }) => (
            <Tab key={company} title={company}>
              <h2 className="mb-3 text-[24px]">
                <Link href={url} target="_blank">
                  {company}
                </Link>
              </h2>
              <div className="flex flex-col gap-6">
                {positions.map(({ name, startDate, endDate, tasks }) => (
                  <div key={name}>
                    <h3 className="mb-1 text-xl">{name}</h3>
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

export default Experience;
