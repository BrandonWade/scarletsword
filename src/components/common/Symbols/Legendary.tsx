import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import styles from './styles';

export default function Legendary(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <Path d='M21 9v83h58.704V76.655H39.251V9z' />
    </Svg>
  );
}
