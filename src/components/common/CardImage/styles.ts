import { Dimensions, StyleSheet } from 'react-native';

const columns = 2;
const padding = 5;
const gridWidth = Dimensions.get('window').width;
const cardWidth = Math.floor(gridWidth / columns);

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: cardWidth - padding * 2,
    height: 255,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
    marginTop: 10,
  },
  actionsOverlay: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5,
    padding: 8,
    borderColor: '#797e7f44',
    borderWidth: 1,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
