import link from './link';

import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from 'react-icons/ai';
import React, { PropsWithChildren } from 'react';
import { defineField } from 'sanity';

const alignLeftRender = (props: PropsWithChildren) => (
  <span style={{ display: 'flex', justifyContent: 'start' }}>
    {props.children}
  </span>
);
const alignCenterRender = (props: PropsWithChildren) => (
  <span style={{ display: 'flex', justifyContent: 'center' }}>
    {props.children}
  </span>
);
const alignRightRender = (props: PropsWithChildren) => (
  <span style={{ display: 'flex', justifyContent: 'end' }}>
    {props.children}
  </span>
);

export default defineField({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    { type: 'code' },
    {
      type: 'block',
      marks: {
        annotations: [link],
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Align left',
            value: 'alignLeft',
            icon: AiOutlineAlignLeft,
            component: alignLeftRender,
          },
          {
            title: 'Align center',
            value: 'alignCenter',
            icon: AiOutlineAlignCenter,
            component: alignCenterRender,
          },
          {
            title: 'Align right',
            value: 'alignRight',
            icon: AiOutlineAlignRight,
            component: alignRightRender,
          },
        ],
      },
    },
  ],
});
