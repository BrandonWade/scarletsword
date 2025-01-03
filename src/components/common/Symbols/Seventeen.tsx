import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Seventeen(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M33.711 20.152v49.307c0 5.879 2.43 8.814 7.285 8.814h1.148v3.322H15.956v-3.322h1.789c4.938 0 7.41-2.936 7.41-8.814V37.141c0-5.957-2.129-8.941-6.387-8.941h-2.559v-3.32h1.023c5.109 0 9.711-1.576 13.797-4.727l2.682-.001zm32.707 61.825h-8.945v-1.02c0-5.707 1.789-12.902 5.363-21.586 5.453-12.949 10.48-22.912 15.074-29.893l.516-.895H57.473c-3.066 0-5.387.639-6.961 1.912-1.574 1.279-2.793 3.41-3.645 6.389h-3.445l3.832-16.861h2.301c1.273.598 3.578.895 6.898.895h27.59v4.855c-1.02 1.449-2.297 3.746-3.832 6.896-2.984 5.795-5.707 12.521-8.176 20.182-3.664 11.415-5.535 21.126-5.617 29.126z'
        />
      </G>
    </Svg>
  );
}
