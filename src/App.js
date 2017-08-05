import React from 'react';
import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { ApiMiddleware } from './utils';
import { host } from './utils/Constants';
import { registerScreens } from './screens';
import { Style } from './components/ui';
import * as reducers from "./reducers";

const middlewares = [thunk, ApiMiddleware(host)];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

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
