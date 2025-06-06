import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';
import styles from './styles';

export default function Two(props: SvgProps) {
  const { style, ...rest } = props || {};

  return (
    <Svg viewBox='0 0 100 100' style={[styles.symbol, style]} {...rest}>
      <G fill='none' fillRule='evenodd'>
        <Circle cx={50} cy={50} r={50} fill='#CAC5C0' />
        <Path
          fill='#0D0F0F'
          d='m78.442 69.105-5.681 19.898H25.555v-4.254c2.293-2.652 7.318-8.001 15.076-16.053a331.261 331.261 0 0 0 13.882-15.371c2.291-2.651 4.057-4.942 5.287-6.862 2.733-4.114 4.1-8.32 4.1-12.624 0-4.204-1.254-7.912-3.766-11.112-2.512-3.204-5.752-4.808-9.722-4.808-8.548 0-15.246 5.998-20.094 17.98l-4.235-1.647c5.73-16.829 14.763-25.249 27.106-25.249 6.083 0 11.261 2.149 15.536 6.448 4.278 4.3 6.414 9.604 6.414 15.92 0 8.052-4.449 15.918-13.353 23.601l-9.254 7.956c-5.908 5.127-10.804 9.929-14.676 14.412-.27.273-.796.916-1.587 1.921h24.59c3.79 0 6.656-.776 8.594-2.335 1.672-1.372 3.309-3.98 4.895-7.821h4.094Z'
        />
      </G>
    </Svg>
  );
}
