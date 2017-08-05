import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Style, LoadingView, Title, CardView } from '../../components/ui';
import { Tools } from '../../utils';
import { noImage } from '../../utils/Constants';
import * as homeActions from '../../reducers/home/actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      data: []
    };
  }

  componentWillMount() {
    this.fetch();
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

  fetch(after = '') {
    const { dispatch } = this.props;
    dispatch(homeActions.fetch(after));
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
        <Text>{errorMessage || 'No error'}</Text>
      );
    }

    return (
      <Title
        text={'Chanel is empty, please try later'}
        level={'h3'}
        style={styles.title}
      />
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
      <CardView title={title} image={url} link={permalink} id={id}/>
    );
  }

  renderContent() {
    const { dataSource } = this.state;
    const { errorMessage, isFetching } = this.props;

    return (
      <ListView
        dataSource={dataSource}
        renderRow={(data) => this.renderRow(data)}
        renderHeader={() => errorMessage && this.renderHeader()}
        renderFooter={() => isFetching && this.renderLoading()}
      />
    );
  }

  render() {
    const { isFetching, posts } = this.props;
    const content = posts.length ? this.renderContent() : this.renderEmpty();

    return (
      <View style={styles.container}>
        { isFetching ? this.renderLoading() : content }
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Style.spaces.s
  },

  title: {
    textAlign: 'center'
  }
});

export default connect(mapStateToProps)(HomeScreen);
