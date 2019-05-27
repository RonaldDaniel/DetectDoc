import {Dimensions, PixelRatio} from 'react-native';
const wp = Dimensions.get('window').width/100;
const hp = Dimensions.get('window').height/100;
export default {
  wp,
  hp
};