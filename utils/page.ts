import type { Page } from 'types/page';
import type { Skill } from 'components/skill-icon/skill-icon';
import * as simpleIcons from 'simple-icons/icons';
import type { SimpleIcon } from 'simple-icons';

export const extendPageData = (data: Page) => {
  const { content } = data;
  const extendedContent = content.map((entry) => {
    if (entry._type === 'skills') {
      return {
        ...entry,
        skills: entry.skills?.map((skill) => getExtendedSkillData(skill)) || [],
      };
    }
    return entry;
  });
  return { ...data, content: extendedContent };
};

function getExtendedSkillData(skill: Skill) {
  const slugName = `si${skill.name.charAt(0).toUpperCase()}${skill.name
    .slice(1)
    .toLowerCase()}`;
  const icons = simpleIcons as Record<string, SimpleIcon>;
  return {
    ...skill,
    path: icons[slugName].path,
    hex: icons[slugName].hex,
    title: icons[slugName].title,
  };
}
