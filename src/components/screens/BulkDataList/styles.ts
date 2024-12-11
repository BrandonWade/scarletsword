import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    height: '100%',
  },
  bulkDataList: {
    height: '100%',
    padding: 15,
    display: 'flex',
    rowGap: 15,
  },
  bulkDataListItem: {
    display: 'flex',
    rowGap: 10,
    borderColor: '#33333322',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
