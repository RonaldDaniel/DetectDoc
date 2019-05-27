// @flow

import { Navigation } from 'react-native-navigation';

import Constants    from '../global/Constants';
import LoginScreen  from './LoginScreen';

export function registerScreens(store,Provider) {
  Navigation.registerComponent(Constants.Screens.LOGIN_SCREEN.screen,     () => LoginScreen, store, Provider);
}
