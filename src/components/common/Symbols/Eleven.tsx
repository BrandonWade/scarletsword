import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Eleven(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M39.831 19.32v50.84c0 6.049 2.516 9.07 7.536 9.07h1.279v3.449H21.565V79.23h1.788c5.109 0 7.667-3.021 7.667-9.07V36.82c0-6.133-2.173-9.195-6.518-9.195h-2.683v-3.449h1.024c5.28 0 10.047-1.617 14.304-4.855l2.684-.001zm32.449 0v50.84c0 6.049 2.511 9.07 7.537 9.07h1.278v3.449H54.009V79.23h1.788c5.115 0 7.667-3.021 7.667-9.07V36.82c0-6.133-2.173-9.195-6.513-9.195h-2.682v-3.449h1.019c5.28 0 10.047-1.617 14.31-4.855l2.682-.001z'
        />
      </G>
    </Svg>
  );
}
