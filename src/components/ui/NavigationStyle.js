import Style from './Style';
import { isApple } from '../../utils/Constants';

module.exports = {
  nav: {
    navBarTextColor: Style.colors.white,
    navBarBackgroundColor: Style.colors.orange,
    navBarButtonColor: Style.colors.white,
    navBarHidden: false,
    navBarTranslucent: isApple,
    navBarBlur: false,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    statusBarTextColorScheme: 'light',
    tabBarHidden: false,
    autoAdjustScrollViewInsets: true
  },

  navTabBarHidden: {
    navBarTextColor: Style.colors.white,
    navBarBackgroundColor: Style.colors.orange,
    navBarButtonColor: Style.colors.white,
    navBarHidden: false,
    navBarTranslucent: isApple,
    navBarBlur: false,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    statusBarTextColorScheme: 'light',
    tabBarHidden: true
  },

  navTabBarHiddenHideOnScroll: {
    navBarTextColor: Style.colors.white,
    navBarBackgroundColor: Style.colors.orange,
    navBarButtonColor: Style.colors.white,
    navBarHidden: false,
    navBarTranslucent: isApple,
    navBarBlur: false,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    statusBarTextColorScheme: 'light',
    tabBarHidden: true,
    navBarHideOnScroll: true
  },

  navBarHidden: {
    navBarHidden: true,
    tabBarHidden: true,
    statusBarTextColorScheme: 'light'
  },

  bottom: {
    navBarTextColor: Style.colors.white,
    navBarBackgroundColor: Style.colors.orange,
    navBarButtonColor: Style.colors.white,
    navBarHidden: false,
    navBarTranslucent: isApple,
    navBarBlur: false,
    drawUnderNavBar: false,
    drawUnderTabBar: false,
    statusBarTextColorScheme: 'light',
    tabBarHidden: false,
    bottomTabsSelectedButtonColor: Style.colors.orange,
    tabBarSelectedButtonColor: Style.colors.orange,
    autoAdjustScrollViewInsets: true
  }
}
