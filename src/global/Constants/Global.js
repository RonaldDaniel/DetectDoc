// @flow

import { Platform }   from 'react-native';
import { Navigation } from 'react-native-navigation';
import Constants      from '../Constants';

const startSingleScreenApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      ...Constants.Screens.LOGIN_SCREEN,
      navigatorStyle: {
        navBarHidden: true,
        tabBarHidden: true,
        statusBarHidden: true,
      },
    },
  });
}
export default {
  startSingleScreenApp,
}
