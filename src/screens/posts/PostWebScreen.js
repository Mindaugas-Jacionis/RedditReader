import React, { Component } from 'react';
import { View, TouchableOpacity, WebView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Style, LoadingView } from '../../components/ui';
import { host } from '../../utils/Constants';
import * as postsActions from '../../reducers/posts/actions';
import Icon from 'react-native-vector-icons/Ionicons';

class PostWebScreen extends Component {
  constructor(props) {
    super(props);
  }

  toggleFavorite() {
    const { id, dispatch } = this.props;
    dispatch(postsActions.toggleFavorite(id));
  }

  renderLoading() {
    return (
      <LoadingView />
    );
  }

  render() {
    const { permalink, id, favorites } = this.props;
    const isFavorite = favorites.includes(id);

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: `${host}${permalink}` }}
          style={styles.container}
          renderLoading={() => this.renderLoading()}
          startInLoadingState={true}
        />
        <TouchableOpacity
          style={styles.favorite}
          onPress={() => this.toggleFavorite()}
        >
          <Icon
            name={isFavorite ? 'md-heart' : 'md-heart-outline'}
            size={30}
            color={isFavorite ? Style.colors.orange : Style.colors.black}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    favorites: state.posts.favorites
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.lightBlue
  },

  favorite: {
    position: 'absolute',
    bottom: Style.spaces.xs,
    right: Style.spaces.s,
    width: 50,
    height: 50,
    backgroundColor: Style.colors.transparentWhite,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Style.colors.black
  },

  icon: {
    width: '100%',
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: 'transparent'
  }
});

export default connect(mapStateToProps)(PostWebScreen);
