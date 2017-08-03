import React from 'react';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { Style } from './components/ui';

registerScreens();

class App {
  constructor() {
    this.startApp();
    console.disableYellowBox = true;
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Home',
          screen: 'RedditReader.HomeScreen',
          title: 'Home',
          icon: require('./assets/icons/Home.png'),
          selectedIcon: require('./assets/icons/HomeSelected.png')
        },
        {
          label: 'Favorites',
          screen: 'RedditReader.FavoritesScreen',
          title: 'Favorites',
          icon: require('./assets/icons/Favorites.png'),
          selectedIcon: require('./assets/icons/FavoritesSelected.png')
        }
      ],
      tabsStyle: {
        bottomTabsSelectedButtonColor: Style.colors.orange,
        tabBarSelectedButtonColor: Style.colors.orange
      }
    });
  }
}

export default App;
