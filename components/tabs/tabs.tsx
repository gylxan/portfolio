import {
  Children,
  cloneElement,
  HTMLProps,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import type { TabProps } from 'components/tabs/tab/tab';
import clsx from 'clsx';
import { Button } from 'components';
import type { LinkOrButtonType } from 'components/button/button';

interface TabsProps extends HTMLProps<HTMLDivElement> {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('0');

  function handleTabClick(event: MouseEvent<LinkOrButtonType>) {
    setActiveTab((event.currentTarget.id ?? '-').split('-')[1]);
  }

  function isTabActive(index: number) {
    return `${index}` === activeTab;
  }

  function getTabId(index: number) {
    return `tab-${index}`;
  }

  function getPanelId(index: number) {
    return `panel-${index}`;
  }

  return (
    <div className={clsx(className, 'flex flex-col gap-8 md:flex-row')}>
      <div
        {...props}
        className="flex flex-row items-start md:flex-col -sm:overflow-x-auto"
        role="tablist"
      >
        {Children.map(children, (child, index) => {
          const isActive = isTabActive(index);
          return (
            <Button
              id={getTabId(index)}
              key={child.props.title}
              className={clsx(
                'whitespace-nowrap rounded-none border-0 border-b-2 px-8 py-2 text-left md:w-full md:border-l-2 md:border-b-0 md:px-4 md:py-4',
                isActive ? 'border-l-secondary text-secondary' : 'text-primary',
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={getPanelId(index)}
              onClick={handleTabClick}
            >
              {child.props.title}
            </Button>
          );
        })}
      </div>
      <div>
        {Children.map(children, (child, index) => {
          return cloneElement(
            child,
            {
              ...child.props,
              title: undefined,
              id: getPanelId(index),
              'aria-labelledby': getTabId(index),
              active: isTabActive(index),
            },
            child.props.children,
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
