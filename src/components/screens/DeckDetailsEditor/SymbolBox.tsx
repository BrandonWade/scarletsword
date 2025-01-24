import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { symbolMap } from '../../../utils/symbols';
import { SymbolBoxProps } from './types';

export default function SymbolBox({ symbol, isActive, onPressSymbol }: SymbolBoxProps) {
  const Symbol = symbolMap[symbol];

  return (
    <TouchableOpacity onPress={() => onPressSymbol(symbol)}>
      <View style={[styles.symbolBox, isActive ? styles.activeSymbolBox : {}]}>
        <Symbol style={styles.symbol} />
      </View>
    </TouchableOpacity>
  );
}
