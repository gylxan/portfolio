import { render, screen } from '@testing-library/react';
import PortableText from 'components/portable-text/portable-text';

describe('<PortableText />', () => {
  const value = [
    {
      _key: 'a8278288bea8',
      _type: 'block',
      children: [
        {
          _key: 'f2bdbb1fb74c0',
          _type: 'span',
          marks: ['strong'],
          text: 'Reinvention often comes in spurts, after a long period of silence. Just as modern architecture recently enjoyed a comeback, brand architecture, a field with well-established principles for decades, is back in the limelight.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
    {
      _key: '8680a4407b61',
      _type: 'block',
      children: [
        {
          _key: '1aa8efef4c8d0',
          _type: 'span',
          marks: ['f7210264b074'],
          text: 'Simply',
        },
        {
          _key: 'a6fe9af746d0',
          _type: 'span',
          marks: [],
          text: ' understood, brand architecture is the art and science of structuring the portfolio to meet your strategic goals, defining the brand number, scope, and relationships needed to compete. Just as Modern Architecture prioritized function, a Brand Architecture is only as good as it is well-suited for the purpose it strives to achieve. Given the disruption observed today across industries and segments, it’s no wonder that companies are considering structural rather than topical solutions to the challenges they face.',
        },
      ],
      markDefs: [
        {
          _key: 'f7210264b074',
          _type: 'link',
        },
      ],
      style: 'normal',
    },
    {
      _key: 'fefd489448ba',
      _type: 'image',
      alt: 'Profile image',
      asset: {
        _createdAt: '2022-12-01T18:38:50Z',
        _id: 'image-4b65ccd880c6dfc074d133c35d889bd0ecfd8625-2837x2864-png',
        _type: 'sanity.imageAsset',
        assetId: '4b65ccd880c6dfc074d133c35d889bd0ecfd8625',
        extension: 'png',
        metadata: {
          _type: 'sanity.imageMetadata',
          lqip: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAFOElEQVQ4jV2TaUxUVxTHn7Wa2E9t0jRpbZGhREEGOmyCgI7g6DyGbViGfVE2WR02BxCwCK1lE6QsUrEIDo6CMCwzCI959wyNn5o2tU00bWKXxJCmTdukRm0DyDnNG0FNP5x774dzfuf87/9ezmazccAYxxjjRFF8lTHmBAApjLGhRUH4zmq1/DU9NbVqmZ1ZWRSE3xljXwJANwBEAMBbAPCKfWmJAwBHOBZBWJCArzHG9gHAGVEU7VPmyeWeC11PTlefWtMXF6Khomy9q711dfyG6dGiIPwCAFYA0APAXgDYPmE2PwPank0mwZQM4DMA+HnOal3taGshXayW9vl4k9x9D3l7epBGFUqGCj2ZrhlJFMV/AeAuADsHAArG2PalpSWOs9lskkx/xtgAAPwKACgV5B7LRB9PD/RwlaHcEc7o7fY+hocewObGM2i1Wshutz9lAPcBoBkAdgNjWzhRtL3HGGsAgJ8kmBSfXx7EVF0cakL8qDA+HKuPJ6MhS4fF8WrUqUKoIDsLjcarjlwAWAOAOwCQDwBvSHKTGGMAACsAQGC346jxKlUW5uCZHB2a2+roi+E+Whr6lGba66k5LwlPpCfSxf4+FJmIdrudAOAxAIwBQIhkxmUAWHbAAKQENE+MY3t9FXaXHaPptjq6PdxLt6/0kKWjnnrKsqiuIAsHB/qke0Qpf2PSewBQKwHvbHRwAKV9dvw69jVU0NljWjqXk0BXaopopLaI2vMS6ePjMdRZnkPXL/WiTRA2gVLtnwAwzW0c1jblAhPRahqh4TPl1HkiiTpydTRclUNGQx71FKVSX0kqDdcW0GR/J9rmb70M/AcAvpeAqwCw/gLIcH7cRFPnz9L0R5Vkbiyjmw3FNPFhCVk+MdBcaw2ZW2podqifRGEB4QXwKQA85DbMWH8u2W5HwTJNk33tdLOpnIyGXOrKTaCu3Hgy1uTTRFMZjXc0kHVslJgo/h/4twT847nkTeDCLbp2sZMulGXRufRIatSqHNGSHkmdxck01FpPc9MTm2bgS5LvScBvXjZFegZSZ9OVS9R8MpvqkjXUmhJNnWlaakqNoIbsOBpoO0vzc5Zn92eXhnDUSoOZJZel7/Zg4z3h4qINZ2atNDgwgLUluVSeEknNOTpqyU+iUyka0ieFU2tdJY4Mj9DUrNWRv6HsLgBUcyJjCcLiojhjmVsxmsapq3cQDQ0tWFxUTvoMHZ5M5EmfEkElSeGUF3WI9NpDWJmpo4LCMqxqaMXu/iEyjU0+st6aNzHG9nMLgvDu4NDo6frm8/czC6rX1XF56B+WhAfDYvBEQgydTovA0rgwzA0PwtLIYKzRqeh4TAQGh8bifnUGxqSdXCuqavq6vftSzvyC8DpnGpvYmp5v8D2gyeyVB2mXXX016zIFT+5+PEby0ahP1mJFIo8l0UosiQ7F7Cgew0Ij0CMgitwDY9e8DiT+EHA0ozEqtdR19MbEFm7b237cO3uP7HBW8CEyBd/r4s3fd/HmV1wUavLwV9NBJU+aMBXxSiUdClKSb8BhcvMLpz3+0U/cA+O+3RsU3+QWGOe1U85vi0wu4Ti9oYkjIs4zOHaHq6/G18Wbr5UpeJuzQv3A2evII2evsFUXT+W6TB7ydJfHwRVnL9VDF5/wH3f7R0+7B8YWyYMT9uxXZ2yTGGn51Ry3T5XM+atSuciUUs7VN2Krize/U6ZQx8sURy86f3D0q11eqt+cPA8/cfI8/NjJS7UsU/C3XX0j2nb7Rx1xC9C+KQ9OeMUnLJWThyRwCmUy9x9zHcDXOyjzlwAAAABJRU5ErkJggg==',
        },
        mimeType: 'image/png',
      },
    },
    {
      _key: '6487706d56ef',
      _type: 'block',
      children: [
        {
          _key: '2a905fd0d2b10',
          _type: 'span',
          marks: [],
          text: 'In addition, one of the key reasons for the regained popularity of clean, streamlined architectures, often organized around a single master brand, has been the emergence of platforms, or 2-way marketplaces structured around mutual value creation. By definition, bringing various stakeholder groups to one ',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ];

  it('should render', () => {
    render(<PortableText value={value} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(document.querySelectorAll('p').length).toBe(3)
    expect(screen.getByRole('link')).toBeInTheDocument();

  });
});
