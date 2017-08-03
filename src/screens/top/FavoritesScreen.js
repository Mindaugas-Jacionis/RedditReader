import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Style } from '../../components/ui';

class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Here will be FavoritesScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: Style.colors.black,
    fontWeight: '700'
  }
});

export default FavoritesScreen;
