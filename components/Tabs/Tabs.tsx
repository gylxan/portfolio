import React, { HTMLProps, useState } from 'react';
import type { TabProps } from './Tab/Tab';
import clsx from 'clsx';
import { Button } from '../';

import styles from './Tabs.module.css';

interface TabsProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('0');

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
          return React.cloneElement(
            child,
            {
              ...child.props,
              title: undefined,
              className: styles.fade,
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
