import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { isApple, noImage } from '../../utils/Constants';
import Title from './Title';
import Style from './Style';

class CardView extends Component {
  onPress() {
    const { onPress } = this.props;
    onPress && onPress();
  }

  formatImg() {
    const { image } = this.props;
    const empty = image === '';
    const wrongImgur = image.indexOf('imgur') !== -1 && image.indexOf('i.imgur') === -1;
    /* Line bellow could be improved */
    const isSomethingElse = image.indexOf('imgur') === -1 && image.indexOf('i.redd') === -1 && image.indexOf('media.giphy') === -1;

    if (wrongImgur || empty || isSomethingElse) {
      return noImage;
    }

    return image.replace('http://', 'https://').replace('.gifv', '.gif');
  }

  render() {
    const { style, image, title } = this.props;
    const uri = this.formatImg();

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => this.onPress()}
      >
        <Image
          source={{ uri }}
          style={styles.image}
        />
        <Title text={title} style={styles.title} level={'h4'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.colors.grey,
    marginVertical: Style.spaces.s,
    borderRadius: Style.radius.default,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: isApple ? 0 : Style.radius.default
  },

  title: {
    paddingVertical: Style.spaces.xs,
    paddingHorizontal: Style.spaces.s,
    backgroundColor: 'transparent'
  }
});

export default CardView;
