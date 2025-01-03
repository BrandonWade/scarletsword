import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Seven(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M53.494 91H41.851v-1.238c0-7.396 2.328-16.659 6.98-27.808 7.035-16.799 13.52-29.673 19.453-38.624l.822-1.232H41.85c-3.93 0-6.92.819-8.975 2.463-2.059 1.645-3.582 4.387-4.586 8.222h-4.52l4.926-21.782h2.881c1.734.914 4.742 1.371 9.041 1.371h35.609v6.165c-1.275 1.829-2.918 4.75-4.926 8.768-3.838 7.485-7.352 16.208-10.553 26.163C56.004 68.17 53.584 80.677 53.494 91z'
        />
      </G>
    </Svg>
  );
}
