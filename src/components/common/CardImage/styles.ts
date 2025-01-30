import { StyleSheet } from 'react-native';

const width = 488;
const height = 680;

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width,
    height,
    aspectRatio: width / height,
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
    opacity: 0.8,
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
  },
});
