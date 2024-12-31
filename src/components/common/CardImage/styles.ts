import { Dimensions, StyleSheet } from 'react-native';

const columns = 2;
const padding = 5;
const gridWidth = Dimensions.get('window').width;
const cardWidth = Math.floor(gridWidth / columns);

export default StyleSheet.create({
  container: {
    rowGap: 10,
  },
  image: {
    width: cardWidth - padding * 2,
    height: 255,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5,
    padding: 8,
    borderColor: '#797e7f44',
    borderWidth: 1,
  },
});
