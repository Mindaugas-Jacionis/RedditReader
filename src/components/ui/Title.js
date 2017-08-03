import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Style from './Style';

class Title extends Component {
  getStyle() {
    const { style, level, color } = this.props;
    return [styles[level], { color: color || Style.colors.black }, style];
  }

  render() {
    const { text } = this.props;
    const style = this.getStyle();

    return (
      <Text style={style}>{text}</Text>
    )
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: Style.sizes.h1,
    fontWeight: '800'
  },

  h2: {
    fontSize: Style.sizes.h2,
    fontWeight: '600'
  },

  h3: {
    fontSize: Style.sizes.h3,
    fontWeight: '600'
  },

  h4: {
    fontSize: Style.sizes.h4,
    fontWeight: '600'
  },

  h5: {
    fontSize: Style.sizes.h5,
    fontWeight: '600'
  }
});

export default Title;
