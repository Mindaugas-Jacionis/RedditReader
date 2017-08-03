import { Navigation } from 'react-native-navigation';
import * as top from './top';

export function registerScreens() {
  Navigation.registerComponent('RedditReader.HomeScreen', () => top.HomeScreen);
  Navigation.registerComponent('RedditReader.FavoritesScreen', () => top.FavoritesScreen);
}
