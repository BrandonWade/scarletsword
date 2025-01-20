import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#797e7f44',
    borderBottomWidth: 1,
  },
  count: {
    flexBasis: '10%',
  },
  faceInfoList: {
    rowGap: 5,
    flex: 1,
  },
  faceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  manaCost: {
    flexBasis: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  name: {
    flex: 1,
  },
  removeCard: {
    fontSize: 20,
  },
});
