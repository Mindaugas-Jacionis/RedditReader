import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { isApple } from '../../utils/Constants';
import Title from './Title';
import Style from './Style';

class CardView extends Component {
  render() {
    const { style, image, title, link } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => alert(link)}>
        <Image
          source={{uri: image}}
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
