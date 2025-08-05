import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

const CheckMark = (props: SvgProps) => (
  <Svg width={16} height={11} viewBox="0 0 16 11" fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      d="M13.939.762 5.954 8.554a.578.578 0 0 1-.802 0l-3.09-3.016a.93.93 0 0 0-1.294 0 .877.877 0 0 0 0 1.262l3.09 3.016a2.42 2.42 0 0 0 1.695.684c.614 0 1.228-.228 1.695-.684l7.984-7.792a.877.877 0 0 0 0-1.263.93.93 0 0 0-1.293 0Z"
    />
  </Svg>
);
export default CheckMark;
