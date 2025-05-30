import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import styles from './styles';

export default function Drop(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <Path d='M50.646 92H15V9h35.646c5.127.075 9.393.676 12.798 1.802 5.8 1.914 10.497 5.424 14.09 10.53 2.882 4.13 4.846 8.596 5.894 13.401S85 44.118 85 48.473c0 11.036-2.208 20.384-6.624 28.042C72.388 86.838 63.145 92 50.646 92ZM63.5 30.172c-2.657-4.504-7.915-6.757-15.773-6.757H31.784v54.17h15.943c8.158 0 13.846-4.036 17.064-12.107 1.76-4.43 2.639-9.704 2.639-15.823 0-8.446-1.31-14.94-3.93-19.483Z' />
    </Svg>
  );
}
