import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import styles from './styles';

export default function Energy(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 102 101' style={[styles.symbol, style]} {...rest}>
      <G fill='none' stroke='#fff'>
        <Path
          fill='#000'
          d='M20.796 1c31.629 5.815 45.711 4.744 58.731 0 0 0 4.376 42.061 21.428 62.559 0 0-30.335 8.504-50.112 37.308 0 0-19.364-27.014-49.842-37.789C10.543 49.957 19.358 24.003 20.797 1z'
        />
        <Path
          fill='#fff'
          d='M38.272 10.497c-.211-1.696 6.723 4.506 26.444-.587 0 0-14.239 11.917-15.834 31.303 0 0 15.408 3.458 29.732-1.089 0 0-21.436 27.626-26.954 52.361 0 0-6.005-13.6.205-36.533 0 0-7.38-5.067-33.694 1.59 0 0 22.678-26.323 20.101-47.044z'
        />
      </G>
    </Svg>
  );
}
