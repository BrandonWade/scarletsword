import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  deckItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#797e7f44',
    borderBottomWidth: 1,
  },
  size: {
    fontSize: 15,
  },
  colors: {
    flexDirection: 'row',
    columnGap: 0.5,
    marginTop: 10,
  },
});
