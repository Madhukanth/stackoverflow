import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { searchChanged } from '../actions/SearchActions';
import { Card, Header } from './common';

class Main extends Component {
  state = {
    hello: []
  };
  get = () => {
    axios({
      method: 'POST',
      url: 'http://192.168.43.228:3090/',
      data: {
        search: this.props.search
      }
    }).then((res) => {
      console.log(res.data.result);
      this.setState({ hello: res.data.result });
    });
  };

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
            marginTop: 10
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
            style={{ paddingTop: 10, marginLeft: 50 }}
            onPress={() => this.get()}
          >
            <Image
              style={{
                height: 30,
                width: 30
              }}
              source={require('../a.png')}
            />
          </TouchableOpacity>
        </View>
        {this.state.hello.map(item => (
          <View>
            <Text style={{ paddingBottom: 5 }}>{item.title}</Text>
            <Text style={{ paddingBottom: 5 }}>{item.question}</Text>
            <Text style={{ paddingBottom: 5 }}>{item.votes}</Text>
          </View>
        ))}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search.search
});

export default connect(mapStateToProps, { searchChanged })(Main);
