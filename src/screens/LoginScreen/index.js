// // @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import DocumentScanner from 'react-native-documentscanner-android';

import { inject, observer } from 'mobx-react/native';
import Constants  from '../../global/Constants';
import glamorous from 'glamorous-native';
const {width,height} = Dimensions.get('window');

const ContainerView = glamorous(View)({
  flex: 1,
  width: '100%',
  height: '100%',
  flexDirection : 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Constants.Colors.backgroundColor,
});
const CamBefore = glamorous(View)({
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
})
const WelcomeText = glamorous(Text)({
  color: Constants.Colors.doneButtonTextColor,
  fontSize: 18,
  marginBottom: 20,
})
const ButtonText = glamorous(Text)({
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
})
const GoCamButton = glamorous(TouchableOpacity)({
  paddingHorizontal: 20,
  borderRadius: 20,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Constants.Colors.doneButtonColor
})
const CamStyle = {
  width: '100%',
  height: '100%',
}
@inject('App', 'Account','Counter') @observer
class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password : '',
      camera: true
    }
    Constants.rootNavigator = this.props.navigator;
  }

  render() {
    return (
            <ContainerView>
              {
                this.state.camera ?
                <CamBefore>
                  <WelcomeText>Thanks for using this App</WelcomeText>
                  <GoCamButton onPress = {() => this.setState({camera: false})}>
                    <ButtonText>Go to document detection</ButtonText>
                  </GoCamButton>
                </CamBefore>
                :
                <View style={{width: '100%',height: '100%'}}>
                  <GoCamButton onPress={() => this.setState({camera: true})}>
                    <ButtonText>Exist</ButtonText>
                  </GoCamButton>
                  <DocumentScanner
                    style={{flex: 1,width: '100%'}}
                    onPictureTaken={data => {
                      console.log(data.path);
                    }}
                    onProcessing = {(data) => {
                      console.log('process ===>>>',data)
                    }}
                    enableTorch={true}
                    detectionCountBeforeCapture={15}
                    contrast = {1}
                    noGrayScale = {true}
                    manualOnly = {false}
                    brightness = {10}
                  />
                </View>
              }         
            </ContainerView>
    );
  }
}


export default LoginScreen;