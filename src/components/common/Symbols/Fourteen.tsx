import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Fourteen(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M36.308 20.471v49.053c0 5.789 2.427 8.684 7.276 8.684h1.154v3.322H18.676v-3.322h1.663c4.938 0 7.407-2.895 7.407-8.684V37.333c0-5.879-2.09-8.816-6.259-8.816H18.93v-3.32h1.023c5.021 0 9.579-1.574 13.665-4.725l2.69-.001zm43.047 43.687v5.109c0 5.707 1.996 8.561 6.003 8.561h1.658v3.316H62.618v-3.316h1.918c4.003 0 6.004-2.813 6.004-8.43v-5.24H46.012v-5.109l25.932-37.814h7.412v38.578h.639c2.47 0 4.299-1.953 5.489-5.873h3.066l-1.533 10.219-7.662-.001zm-6.773-5.109V26.86L50.866 59.049h21.716z'
        />
      </G>
    </Svg>
  );
}
