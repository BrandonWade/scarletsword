import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function One(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' transform='translate(0 -1)'>
        <Circle cx={50} cy={50.998} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='M55.685 11.001v64.108c0 7.671 3.226 11.504 9.687 11.504h1.684v4.388H32.945v-4.388h2.141c6.247 0 9.369-3.833 9.369-11.504V33.055c0-7.758-2.697-11.643-8.081-11.643h-3.429v-4.247h1.237c6.66 0 12.691-2.057 18.08-6.165l3.423.001z'
        />
      </G>
    </Svg>
  );
}
