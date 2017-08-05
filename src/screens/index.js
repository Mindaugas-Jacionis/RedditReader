import { Navigation } from 'react-native-navigation';
import * as top from './top';
import * as posts from './posts';

export function registerScreens(store, Provider) {
  /* top level screens */
  Navigation.registerComponent('RedditReader.HomeScreen', () => top.HomeScreen, store, Provider);
  Navigation.registerComponent('RedditReader.FavoritesScreen', () => top.FavoritesScreen, store, Provider);

  /* posts screens */
  Navigation.registerComponent('RedditReader.PostWebScreen', () => posts.PostWebScreen, store, Provider);
}
