import React from 'react';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';
import { ApiMiddleware } from './utils';
import { host } from './utils/Constants';
import { registerScreens } from './screens';
import { Style } from './components/ui';

const persistorConfig = {
  whitelist: [ 'posts' ],
  storage: AsyncStorage
};

const middlewares = [thunk, ApiMiddleware(host)];
const toolChain = [ autoRehydrate(), applyMiddleware(...middlewares) ];
const store = compose(...toolChain)(createStore)(reducer, {});
const persistor = persistStore(store, persistorConfig);

registerScreens(store, Provider, persistor);

class App {
  constructor() {
    this.startApp();
    console.disableYellowBox = true;
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Programmer Humor',
          screen: 'RedditReader.HomeScreen',
          title: 'Programmer Humor',
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
