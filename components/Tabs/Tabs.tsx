import React, { createRef, HTMLProps, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TabProps } from './Tab';
import clsx from 'clsx';
import Button from '../Button/Button';

import styles from './Tab.module.css';

interface TabsProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('0');
  const [refs, setRefs] = useState(() =>
    React.Children.map(children, () => createRef<HTMLDivElement>()),
  );

  function handleTabClick(
    event: React.MouseEvent<
      | React.AnchorHTMLAttributes<HTMLAnchorElement>
      | React.ButtonHTMLAttributes<HTMLButtonElement>
    >,
  ) {
    setActiveTab((event.currentTarget.id ?? '-').split('-')[1]);
  }

  return (
    <div className={clsx(className, 'flex flex-col gap-8 md:flex-row')}>
      <div
        {...props}
        className="tablist flex flex-row items-start md:flex-col -sm:overflow-x-auto"
        role="tablist"
      >
        {React.Children.map(children, (child, index) => (
          <Button
            id={`tab-${index}`}
            key={child.props.title}
            className={clsx(
              'whitespace-nowrap rounded-none border-0 border-b-2 px-8 py-2 text-left md:w-full md:border-l-2 md:border-b-0 md:px-4 md:py-4',
              activeTab === `${index}`
                ? 'border-l-secondary text-secondary'
                : 'text-primary',
            )}
            role="tab"
            aria-selected={activeTab === `${index}`}
            aria-controls={`panel-${index}`}
            onClick={handleTabClick}
          >
            {child.props.title}
          </Button>
        ))}
      </div>
      <div>
        {React.Children.map(children, (child, index) => {
          return (
            <CSSTransition
              key={index}
              timeout={500}
              classNames={{
                appear: styles.appear,
                appearDone: styles.appearDone,
                enter: styles.fadeEnter,
                enterActive: styles.fadeEnterActive,
                enterDone: styles.fadeEnterDone,
                exit: styles.fadeExit,
                exitActive: styles.fadeExitActive,
                exitDone: styles.fadeExitDone,
              }}
              in={activeTab === `${index}`}
              nodeRef={refs[index]}
              appear={true}
            >
              {React.cloneElement(
                child,
                {
                  ...child.props,
                  className: clsx(child.props.className, styles.fade),
                  ref: refs[index],
                  id: `panel-${index}`,
                  'aria-labelledby': `tab-${index}`,
                  hidden: activeTab !== `${index}`,
                },
                child.props.children,
              )}
            </CSSTransition>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
