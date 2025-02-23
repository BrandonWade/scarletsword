import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 5,
  },
  deckList: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#797e7f44',
    backgroundColor: 'white',
  },
  lastDeckItem: {
    borderBottomWidth: 0,
  },
});
