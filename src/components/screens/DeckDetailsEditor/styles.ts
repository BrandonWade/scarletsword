import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  form: {
    gap: 20,
  },
  symbolBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbolBox: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSymbolBox: {
    borderColor: '#0b80ff',
    backgroundColor: '#e0efff',
  },
  symbol: {
    width: 30,
    height: 30,
  },
});
