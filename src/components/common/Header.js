import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#e6e1e0',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 115,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#F8F8F8',
    elevation: 2,
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { Width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
};

export { Header };
