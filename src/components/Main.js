import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { searchChanged } from '../actions/SearchActions';
import { Card, Spinner } from './common';

class Main extends Component {
  state = {
    hello: [],
    loading: false
  };
  get = () => {
    axios({
      method: 'POST',
      url: 'http://192.168.43.228:3090/',
      data: {
        search: this.props.search
      }
    })
      .then((res) => {
        this.setState({ hello: res.data.result });
      })
      .then(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <Card>
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
            onPress={() => {
              this.setState({ loading: true });
              this.get();
            }}
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
        {(() => {
          if (this.state.loading) {
            return (
              <View style={{ marginTop: 200, height: 100 }}>
                <Spinner size="large" />
              </View>
            );
          } else if (!this.state.loading) {
            return (
              <FlatList
                data={this.state.hello}
                renderItem={({ item }) => (
                  <View style={{ borderBottomColor: 'black', borderWidth: 1 }}>
                    <TouchableOpacity
                      onPress={() =>
                        Actions.answer({ id: item.id, title: item.title })
                      }
                    >
                      <Text
                        key={item.title}
                        style={{
                          paddingBottom: 5,
                          color: 'blue',
                          fontWeight: 'bold',
                          fontSize: 15
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        key={item.title}
                        style={{ paddingBottom: 5, fontStyle: 'italic' }}
                      >
                        Asked by : {item.question}
                      </Text>
                      <Text
                        key={item.title}
                        style={{ paddingBottom: 5, fontWeight: 'bold' }}
                      >
                        Votes:{item.votes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id}
                numColumns={1}
              />
            );
          }
        })()}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search.search
});

export default connect(mapStateToProps, { searchChanged })(Main);
