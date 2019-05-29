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
  CheckBox,
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
const SettingScreen = glamorous(View)({
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
const ExitCamButton = glamorous(TouchableOpacity)({
  width: '100%',
  paddingBottom: 25,
  paddingTop: 15,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black'
})
const ExitText = glamorous(Text)({
  color: 'white',
  fontSize: 20,
  fontWeight: '800'
})
const CameraContainer = glamorous(View)(({backColor} = this.props) => ({
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: backColor || 'black'
}))
const ConExitContainer = glamorous(View) ({
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white'
})
const PathView = glamorous(View)({
  width: '80%',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 20
})
const PathDescription = glamorous(Text)({
  color: 'black',
  fontSize: 18,
  marginBottom: 20,
})
const ButtonRow = glamorous(View)({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around'
})
const ContinueExitButton = glamorous(TouchableOpacity)({
  width: '40%',
  borderRadius: 20,
  paddingVertical: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Constants.Colors.doneButtonColor
})
const SettingTop = glamorous(View) ({
  width: '80%',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})
const SettingRow = glamorous(View)({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
})
const CustomText = glamorous(Text)(({size,color} = this.props) => ({
  fontSize: size || 18,
  color: color || 'black'
}))
const SettingBottom = glamorous(View)({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
})
const EditText = {
  width: 25,
  paddingVertical: 5,
  marginRight: 5,
}
@inject('App', 'Account','Counter') @observer
class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      captured: false,
      camera: true,
      path: '',
      enableTorch: true,
      detectionCountBeforeCapture: '15',
      contrast: '1',
      noGrayScale: true,
      brightness: '10'
    }
    Constants.rootNavigator = this.props.navigator;
  }

  render() {
    return (
            <ContainerView>
              {
                this.state.camera ?
                  <SettingScreen>
                    <SettingTop>
                      <WelcomeText>
                        Document Detection Settings
                      </WelcomeText>
                      <SettingRow>
                        <CustomText>Allow flash</CustomText>
                        <CheckBox value={this.state.enableTorch} onValueChange = {(value) => this.setState({enableTorch: value})} />
                      </SettingRow>
                      <SettingRow>
                        <CustomText>Gray Picture Mode</CustomText>
                        <CheckBox value={this.state.noGrayScale} onValueChange = {(value) => this.setState({noGrayScale: value})} />
                      </SettingRow>
                      <SettingRow>
                        <CustomText>Rectangle Numbers</CustomText>
                        <TextInput 
                          style={EditText}
                          value={this.state.detectionCountBeforeCapture} 
                          maxLength = {2}
                          onChangeText={(value) => this.setState({detectionCountBeforeCapture: value})}
                        />
                      </SettingRow>
                      <SettingRow>
                        <CustomText>Contrast</CustomText>
                        <TextInput 
                          style={EditText}
                          value={this.state.contrast} 
                          maxLength = {3}
                          onChangeText={(value) => this.setState({contrast: value})}
                        />
                      </SettingRow>
                      <SettingRow>
                        <CustomText>Brightness</CustomText>
                        <TextInput 
                          style={EditText}
                          value={this.state.brightness} 
                          maxLength = {2}
                          onChangeText={(value) => this.setState({brightness: value})}
                        />
                      </SettingRow>
                    </SettingTop>
                    <SettingBottom>
                      <WelcomeText>Thanks for using this App</WelcomeText>
                      <GoCamButton onPress = {() => this.setState({camera: false})}>
                        <ButtonText>Go to document detection</ButtonText>
                      </GoCamButton>
                    </SettingBottom>
                  </SettingScreen>
                :
                  this.state.captured ?
                  <ConExitContainer>
                    <PathView>
                      <PathDescription>
                        {`Captured file is saved to ${this.state.path}`}
                      </PathDescription>
                    </PathView>
                    <ButtonRow>
                      <ContinueExitButton onPress = {() => this.setState({camera: false,captured: false})}>
                        <ButtonText>Continue</ButtonText>
                      </ContinueExitButton>
                      <ContinueExitButton onPress = {() => this.setState({camera: true,captured: false})}>
                        <ButtonText>
                          Exit
                        </ButtonText>
                      </ContinueExitButton>
                    </ButtonRow>
                  </ConExitContainer>
                :
                  <CameraContainer>
                    <DocumentScanner
                      style={{flex: 1,width: '100%'}}
                      onPictureTaken={data => {
                        console.log(data.path);
                        this.setState({path: data.path})
                        this.setState({captured: true})
                      }}
                      onProcessing = {(data) => {
                        console.log('process ===>>>',data)
                      }}
                      enableTorch={this.state.enableTorch}
                      detectionCountBeforeCapture={Number(this.state.detectionCountBeforeCapture)}
                      contrast = {Number(this.state.contrast)}
                      noGrayScale = {this.state.noGrayScale}
                      manualOnly = {false}
                      brightness = {Number(this.state.brightness)}
                    />
                    <ExitCamButton onPress={() => this.setState({camera: true})}>
                      <ExitText>Exist</ExitText>
                    </ExitCamButton>
                  </CameraContainer>
              }         
            </ContainerView>
    );
  }
}


export default LoginScreen;