import link from './link.js';

import {
  AiOutlineAlignRight,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
} from 'react-icons/ai';
import React from "react";

const alignLeftRender = (props) => (
  <span style={{ display: 'flex', justifyContent: 'start' }}>
    {props.children}
  </span>
);
const alignCenterRender = (props) => (
  <span style={{ display: 'flex', justifyContent: 'center' }}>
    {props.children}
  </span>
);
const alignRightRender = (props) => (
  <span style={{ display: 'flex', justifyContent: 'end' }}>
    {props.children}
  </span>
);

export default {
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
            blockEditor: {
              icon: AiOutlineAlignLeft,
              render: alignLeftRender,
            },
          },
          {
            title: 'Align center',
            value: 'alignCenter',
            blockEditor: {
              icon: AiOutlineAlignCenter,
              render: alignCenterRender,
            },
          },
          {
            title: 'Align right',
            value: 'alignRight',
            blockEditor: {
              icon: AiOutlineAlignRight,
              render: alignRightRender,
            },
          },
        ],
      },
    },
  ],
};
