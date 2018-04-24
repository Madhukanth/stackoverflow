import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { searchChanged } from '../actions/SearchActions';
import { Card, Header } from './common';

class Main extends Component {
  get = () => {};

  render() {
    return (
      <Card>
        <Header headerText="StackOverFlow" />
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 2,
            borderColor: 'black',
            backgroundColor: 'grey',
            marginTop: 10,
          }}
        >
          <TextInput
            style={{ width: 300, color: 'white' }}
            placeholder="Search"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            value={this.props.search}
            onChangeText={(text) => {
              this.props.searchChanged(text);
            }}
          />
          <TouchableOpacity
            style={{ paddingTop: 10 }}
            onPress={() => this.get()}
          >
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={require('../a.png')}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search.search,
});

export default connect(mapStateToProps, { searchChanged })(Main);
