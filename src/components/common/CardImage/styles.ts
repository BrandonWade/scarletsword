import { Dimensions, StyleSheet } from 'react-native';

const columns = 2;
const padding = 5;
const gridWidth = Dimensions.get('window').width;
const cardWidth = Math.floor(gridWidth / columns);

export default StyleSheet.create({
  image: {
    width: cardWidth - padding * 2,
    height: 255,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
