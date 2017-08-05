import React, { Component } from 'react';
import { ListView, View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Style, LoadingView, Title, CardView } from '../../components/ui';
import { Tools } from '../../utils';
import { noImage } from '../../utils/Constants';
import * as homeActions from '../../reducers/home/actions';
import _ from 'underscore';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      searchQuery: ''
    };
  }

  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    const { searchQuery } = this.state;
    const { posts } = nextProps;

    if (!Tools.compare(posts, this.props.posts)) {
      this.setDataSource(posts, searchQuery);
    }
  }

  fetch(after = '') {
    const { dispatch } = this.props;
    dispatch(homeActions.fetch(after));
  }

  onPress(permalink, id) {
    const { navigator } = this.props;

    navigator.push({
      screen: 'RedditReader.PostWebScreen',
      passProps: { permalink, id }
    });
  }

  setDataSource(posts = [], searchQuery = '') {
    const { dataSource } = this.state;
    const query = searchQuery.toLowerCase();
    let filteredPosts = posts;

    if (query.length >= 3) {
      filteredPosts = _.filter(
        posts, post => post.title.toLowerCase().indexOf(query) !== -1
      );
    }

    this.setState({
      dataSource: dataSource.cloneWithRows(filteredPosts)
    });
  }

  handleSearch(searchQuery) {
    const previousSearchQuery = this.state.searchQuery;
    const { posts } = this.props;
    this.setState({ searchQuery: searchQuery });

    if (searchQuery.length >= 3 || previousSearchQuery.length >= 3) {
      this.setDataSource(posts, searchQuery);
    }
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderEmpty() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      return (
        <Text>{errorMessage}</Text>
      );
    }

    return (
      <Title
        text={'Chanel is empty, please try later'}
        level={'h3'}
        style={styles.empty}
      />
    );
  }

  renderSearch() {
    const { searchQuery } = this.state;

    return (
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.handleSearch(text)}
          value={searchQuery}
          placeholder={'Search by title'}
        />
      </View>
    );
  }

  renderHeader() {
    const { errorMessage } = this.props;

    return (
      <Text>{errorMessage}</Text>
    );
  }

  renderRow(data) {
    const { title, permalink, preview, url, id } = data;
    const imgUrl = idx(preview, p => p.images['0'].source.url) || noImage;

    return (
      <CardView
        title={title}
        image={url}
        onPress={() => this.onPress(permalink, id)}
      />
    );
  }

  renderContent() {
    const { dataSource } = this.state;
    const { errorMessage, isFetching, after } = this.props;

    return (
      <View>
        {this.renderSearch()}
        <ListView
          dataSource={dataSource}
          renderRow={(data) => this.renderRow(data)}
          renderHeader={() => errorMessage && this.renderHeader()}
          renderFooter={() => isFetching && this.renderLoading()}
          onEndReached={() => after && this.fetch(after)}
          onEndReachedThreshold={800}
          style={styles.list}
        />
      </View>
    );
  }

  render() {
    const { isFetching, posts } = this.props;
    const hasPosts = posts.length > 0;
    const content = hasPosts ? this.renderContent() : this.renderEmpty();

    return (
      <View style={styles.container}>
        { isFetching && !hasPosts ? this.renderLoading() : content }
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { isFetching, errorMessage, posts, after } = state.home;

  return {
    isFetching,
    errorMessage,
    posts,
    after
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.lightBlue,
  },

  list : {
    paddingHorizontal: Style.spaces.s,
    paddingBottom: Style.spaces.m
  },

  empty: {
    textAlign: 'center',
    paddingVertical: Style.spaces.m
  },

  search: {
    backgroundColor: Style.colors.transparentWhite,
    padding: Style.spaces.s
  },

  input: {
    height: 45,
    fontSize: 20,
    backgroundColor: Style.colors.transparentOrange,
    paddingHorizontal: Style.spaces.s,
    borderRadius: Style.radius.default
  }
});

export default connect(mapStateToProps)(HomeScreen);
