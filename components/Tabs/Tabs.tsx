import React, { createRef, HTMLProps, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TabProps } from './Tab';
import clsx from 'clsx';
import Button from '../Button/Button';

import styles from './Tabs.module.css';

interface TabsProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('0');
  const [refs] = useState(() =>
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
    <div className={clsx(className, styles.tabs)}>
      <div {...props} className={styles.tabList} role="tablist">
        {React.Children.map(children, (child, index) => {
          const isActive = isTabActive(index);
          return (
            <Button
              id={getTabId(index)}
              key={child.props.title}
              className={clsx(styles.button, isActive && styles.active)}
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
        {React.Children.map(children, (child, index) => {
          const isActive = isTabActive(index);
          return (
            <CSSTransition
              key={index}
              timeout={300}
              classNames={{ ...styles }}
              in={isActive}
              appear={true}
              nodeRef={refs[index]}
            >
              {React.cloneElement(
                child,
                {
                  ...child.props,
                  className: styles.fade,
                  id: getPanelId(index),
                  'aria-labelledby': getTabId(index),
                  ref: refs[index],
                  hidden: !isActive,
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
