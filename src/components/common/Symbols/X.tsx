import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import styles from './styles';

export default function X(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none'>
        <Path
          fill='#CAC5C0'
          d='M100 49.998C100 77.613 77.617 100 50 100 22.387 100 0 77.613 0 49.998 0 22.385 22.387 0 50 0c27.617 0 50 22.385 50 49.998z'
        />
        <Path
          fill='#0D0F0F'
          d='M56.641 80v-3.297c4.703-.521 7.059-1.887 7.059-4.082 0-1.582-.629-3.164-1.883-4.746l-13.008-16.01-10.273 12.111c-2.57 2.973-3.863 5.432-3.863 7.354 0 2.976 2.354 4.771 7.07 5.387V80H16.692v-3.287c3.172-.609 5.867-1.752 8.102-3.416 1.539-1.223 3.637-3.371 6.285-6.438l15.449-17.915-17.867-21.66c-2.315-2.797-4.121-4.633-5.401-5.51-1.724-1.225-4.121-2.012-7.203-2.361V16h29.539v3.285c-4.453.877-6.676 2.234-6.676 4.074 0 1.23.594 2.586 1.793 4.072l11.816 14.322 9.508-11.691c1.711-2.104 2.57-3.941 2.57-5.52 0-2.629-2.105-4.34-6.301-5.129V16h23.512v3.291c-2.055.439-3.473.834-4.23 1.188-2.57 1.229-6.496 4.869-11.797 10.92-.852.969-4.453 5.393-10.789 13.285l18.977 23.363c4.113 5.078 8.305 7.971 12.586 8.666V80H56.641z'
        />
      </G>
    </Svg>
  );
}
