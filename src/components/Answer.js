import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import HTML from 'react-native-render-html';
import axios from 'axios';
import { Spinner } from './common';

class Answer extends Component {
  state = {
    answer: [],
    loading: true
  };
  componentWillMount() {
    axios({
      method: 'POST',
      url: 'http://192.168.43.228:3090/answer',
      data: {
        title: this.props.title,
        id: this.props.id
      }
    })
      .then((res) => {
        console.log(res.data.answer);
        this.setState({ answer: res.data.answer });
      })
      .then(() => this.setState({ loading: false }));
  }
  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    } else if (!this.state.loading) {
      return (
        <FlatList
          data={this.state.answer}
          renderItem={({ item }) => (
            <View style={{ borderBottomColor: 'black', borderWidth: 1 }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                >
                  Answered by: {item.person}
                </Text>
                <Text
                  style={{ color: 'blue', fontSize: 15, fontWeight: 'bold' }}
                >
                  Votes:{item.votes}
                </Text>
              </View>
              <HTML
                html={item.ans}
                tagsStyles={{
                  code: {
                    color: 'red',
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                  }
                }}
                imagesMaxWidth={Dimensions.get('window').width}
              />
            </View>
          )}
          keyExtractor={item => item.person}
          numColumns={1}
        />
      );
    }
  }
}

export default Answer;
