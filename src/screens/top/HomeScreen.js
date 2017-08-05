import React, { Component } from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native';
import { Style, LoadingView, Title, CardView } from '../../components/ui';
import { chanel } from '../../utils/Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      data: [],
      isLoading: false,
      after: ''
    };
  }

  componentWillMount() {
    this.request();
  }

  request(after = '') {
    const { dataSource } = this.state;
    this.setState({ isLoading: true });

    return fetch(`${chanel}?after=${after}`)
      .then((response) => response.json())
      .then((json) => {
        const { after, children } = json.data;

        this.setState({
          dataSource: dataSource.cloneWithRows(children),
          data: children,
          isLoading: false,
          after
        });
      })
      .catch((error) => {
        console.log('Error:', error);
        this.setState({ isLoading: false });
      });
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  renderEmpty() {
    return (
      <Title
        text={'Chanel is empty, please try later'}
        level={'h3'}
        style={styles.title}
      />
    );
  }

  renderRow({data}) {
    const { title, permalink, preview } = data;
    const { url } = preview.images['0'].source;
    console.log('data', url);

    return (
      <CardView title={title} image={url} link={permalink}/>
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
    const { data, isLoading } = this.state;
    const content = data.length ? this.renderContent() : this.renderEmpty();


    return (
      <View style={styles.container}>
        { isLoading ? this.renderLoading() : content }
      </View>
    );
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

export default HomeScreen;
