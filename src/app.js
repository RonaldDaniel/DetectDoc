// @flow

import Provider       from './utils/MobxRnnProvider';
import Stores         from './stores';
import Constants      from './global/Constants';
import React from 'react';

import { registerScreens } from './screens';
registerScreens(Stores, Provider);
Constants.Global.startSingleScreenApp();
// Stores.instance.hydrateStores()
// .then(() => {
//   registerScreens(Stores, Provider);
//   Constants.Global.startSingleScreenApp();
// })
