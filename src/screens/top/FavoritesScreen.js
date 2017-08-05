import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Style, NavigationStyle, CardView, Title } from '../../components/ui';
import { Tools } from '../../utils';
import _ from 'underscore';

class FavoritesScreen extends Component {
  static navigatorStyle = NavigationStyle.bottom;

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.state;
    const { posts } = nextProps;

    if (!Tools.compare(posts, this.props.posts)) {
      this.setState({
        dataSource: dataSource.cloneWithRows(posts)
      });
    }
  }

  onPress(permalink, id) {
    const { navigator } = this.props;

    navigator.push({
      screen: 'RedditReader.PostWebScreen',
      passProps: { permalink, id }
    });
  }

  renderEmpty() {
    const emptyText = 'You have no favorites. Go ahead and add some by clicking on <3';
    return (
      <Title
        text={emptyText}
        level={'h3'}
        style={styles.empty}
      />
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

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(data) => this.renderRow(data)}
      />
    );
  }

  render() {
    const { posts } = this.props;
    const hasFavorites = posts.length > 0;

    return (
      <View style={styles.container}>
        { hasFavorites ? this.renderContent() : this.renderEmpty() }
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { favorites } = state.posts;

  return {
    posts: _.filter(state.home.posts, post => favorites.includes(post.id))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.lightBlue,
    paddingHorizontal: Style.spaces.s
  },

  empty: {
    textAlign: 'center',
    paddingVertical: Style.spaces.m
  }
});

export default connect (mapStateToProps)(FavoritesScreen);
