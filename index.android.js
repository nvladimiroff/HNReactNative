/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var apiurl = "https://hacker-news.firebaseio.com/v0/";

var HNReactNative = React.createClass({
  getInitialState: function() {
    return {
      topStories: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    var stories = {};

    fetch(apiurl + "topstories.json")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          topStories: responseData.slice(0,30),
          loaded: true,
        });
      }).then(() => {
        this.state.topStories.forEach((item) => {
          this.fetchStory(item).then((storyJson) => {
            stories[storyJson.id] = storyJson;
          }).then(() => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(stories),
            });
          }).done();
        });
      }).done();
  },

  fetchStory: function(story) {
    return fetch(apiurl + "item/" + story + ".json")
      .then((response) => response.json())
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoad();
    } else {
      return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderStory}
            style={styles.listView}
          />
      );
    }
  },

  renderLoad: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading...
        </Text>
      </View>
    );
  },

  renderStory: function(story) {
    return (
      <View style={styles.container}>
        <Text>
          {story.id}
        </Text>
        <Text>
          {story.title}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 25,
    backgroundColor: "#F5FCFF",
  }
});

AppRegistry.registerComponent('HNReactNative', () => HNReactNative);
