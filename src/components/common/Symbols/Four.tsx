import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Four(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M64.27 68.359v6.723c0 7.684 2.695 11.525 8.094 11.525h2.33v4.394H42.036v-4.394h2.607c5.303 0 7.961-3.798 7.961-11.392v-6.856H19.809v-6.861l34.578-50.497h9.883v51.592h.82c3.383 0 5.852-2.608 7.408-7.816h4.115l-1.92 13.583-10.423-.001zm-11.666-5.766V21.135L24.711 62.593h27.893z'
        />
      </G>
    </Svg>
  );
}
