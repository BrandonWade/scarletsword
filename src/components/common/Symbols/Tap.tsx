import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Tap(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M85.332 59.918H49.328l13.185-9.383c-4.898-3.887-10.566-5.828-16.984-5.828-3.211 0-5.414.613-6.59 1.836-1.184 1.227-1.777 3.445-1.777 6.654 0 8.873 4.563 18.34 13.691 28.396L40.462 92.114C28.372 77.409 22.333 64.27 22.333 52.69c0-6.928 2.086-12.447 6.27-16.545 4.18-4.098 9.746-6.148 16.668-6.148 8.453 0 17.664 3.215 27.641 9.635L80.64 26.45l4.692 33.468z'
        />
      </G>
    </Svg>
  );
}
