import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Ten(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M35.306 19.633v50.439c0 5.998 2.567 8.998 7.693 8.998h1.305v3.42H17.438v-3.42h1.727c4.931 0 7.4-3 7.4-8.998v-33.08c0-6.08-2.155-9.123-6.467-9.123h-2.66v-3.424h1.016c5.238 0 9.969-1.604 14.191-4.813l2.661.001zm9.76 33.328c0-7.857 1.646-15.082 4.94-21.668C54.148 23.1 59.811 19 66.988 19c6.931 0 12.422 3.508 16.476 10.516 3.296 5.748 4.945 12.381 4.945 19.898 0 7.859-1.648 15.039-4.945 21.545C79.323 78.988 73.707 83 66.611 83c-6.842 0-12.293-3.465-16.352-10.395-3.464-5.828-5.193-12.376-5.193-19.644zm9.122-3.676c0 6.68.718 12.676 2.156 17.996 2.197 8.195 5.785 12.295 10.771 12.295 8.111 0 12.165-8.447 12.165-25.346 0-20.869-4.394-31.301-13.182-31.301-7.941 0-11.912 8.105-11.912 24.328l.002 2.028z'
        />
      </G>
    </Svg>
  );
}
