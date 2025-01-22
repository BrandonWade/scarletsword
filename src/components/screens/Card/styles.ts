import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContent: {
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    rowGap: 15,
    marginBottom: 15,
  },
  image: {
    width: 322,
    height: 449,
    borderRadius: 10,
  },
  sectionContainer: {
    rowGap: 10,
  },
  section: {
    backgroundColor: 'white',
    borderColor: '#797e7f44',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  sectionItem: {
    borderColor: '#797e7f44',
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 10,
  },
  nameRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 5,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    marginRight: 10,
  },
  type: {
    fontSize: 14,
  },
  textBlock: {
    rowGap: 15,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLine: {
    fontWeight: 600,
  },
});
