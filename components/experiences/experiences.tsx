import { Experience, Tab, Tabs } from 'components';
import React from 'react';
import type { Experience as IExperience } from 'types/experience';

export interface ExperiencesProps {
  companies: IExperience[];
}
const Experiences = ({ companies }: ExperiencesProps) => {
  return (
    <Tabs aria-label="Experiences tabs" className="mx-auto w-full max-w-3xl">
      {companies.map(({ company, ...rest }) => (
        <Tab key={company} title={company}>
          <Experience company={company} {...rest} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default Experiences;
