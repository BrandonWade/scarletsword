import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    minWidth: 120,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#797e7f44',
    borderWidth: 1,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    minWidth: 40,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderColor: '#797e7f44',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
