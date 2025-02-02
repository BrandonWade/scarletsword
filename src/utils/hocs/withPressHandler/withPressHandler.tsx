import { TouchableOpacity } from 'react-native';
import { withPressHandlerOptions } from './types';

export default function withPressHandler(
  children: React.JSX.Element,
  options: withPressHandlerOptions
) {
  const { onPress, onLongPress } = options || {};

  if (typeof onPress !== 'function' && typeof onLongPress !== 'function') {
    return children;
  }

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  );
}
