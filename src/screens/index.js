import { Navigation } from 'react-native-navigation';
import * as top from './top';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('RedditReader.HomeScreen', () => top.HomeScreen, store, Provider);
  Navigation.registerComponent('RedditReader.FavoritesScreen', () => top.FavoritesScreen, store, Provider);
}
