import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContentContainer: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#797e7f44',
    backgroundColor: '#f3f3f3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  itemContentContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
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
