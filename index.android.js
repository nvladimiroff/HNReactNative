/**
 * A simple HN React Native client
 * https://github.com/nvladimiroff/HNReactNative
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

/**
 * API Docs: https://github.com/HackerNews/API
 * They suggest using Firebase's library, but I wasn't able to get it to work
 * on React Native (despite their claim of supporting it).
 */
var apiurl = "https://hacker-news.firebaseio.com/v0/";

var HNReactNative = React.createClass({
  /**
   * Our initial state consists of a list of the 30 top stories,
   * a ListView DataSource that contains a json object for each story
   * and a boolean to know if we've loaded everything or not yet.
   */
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
    // First, we load the list of top stories.
    fetch(apiurl + "topstories.json")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          topStories: responseData.slice(0,30),
        }); })
      .then(() => {
        // Once we have the list, we can load all individual JSON data for each
        // story. To do this, we create a list of Promises for each story
        // and then flatten them into a single one with Promise.all.
        Promise.all(this.state.topStories.map(this.fetchStory))
          .then((stories) => {
            // stories is our final list of JSON data that we will use for
            // the data source of each row.
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(stories),
              loaded: true,
            });
          }).done();
      }).done();
  },

  /**
   * Get the JSON of a single story. Returns a promise
   */
  fetchStory: function(story) {
    return fetch(apiurl + "item/" + story + ".json")
      .then((response) => response.json())
  },

  /**
   * The main render method that React will use to display the app.
   */
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoad();
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Hacker News
            </Text>
          </View>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderStory}
              style={styles.listView}
            />
        </View>
      );
    }
  },

  /**
   * Just render a loading message.
   */
  renderLoad: function() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>
          Loading...
        </Text>
      </View>
    );
  },

  /**
   * Given the JSON object for a story, render a single row.
   */
  renderStory: function(story) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.title}>
          {story.title}
        </Text>
        <Text style={styles.points}>
          {story.score} points
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    backgroundColor: "#ff6600",
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 7,
    marginBottom: 7,
    fontFamily: 'Verdana',
    color: '#000000',
  },
  rowContainer: {
    justifyContent: 'center',
    margin: 5,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Verdana',
    fontSize: 15,
    color: '#000000',
  },
  points: {
    fontSize: 11,
    color: "#828282",
  },
  listView: {
    paddingTop: 15,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('HNReactNative', () => HNReactNative);
