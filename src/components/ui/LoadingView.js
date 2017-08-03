import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class LoadingView extends Component {
  render() {
    const { style, containerStyle, color } = this.props;
    
    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator
          animating={true}
          color={color}
          style={[styles.center, style]}
          size={'large'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default LoadingView;
