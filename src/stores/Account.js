// @flow
import Constants from '../global/Constants'
import { observable, action, toJS,computed } from 'mobx';
import { persist } from 'mobx-persist';

import Models from './models';

class Store {
  @persist('object', Models.Account) @observable current = new Models.Account
  @persist @observable authorized = false;
  
  @action logout = () => {
    return new Promise((resolve, reject) => {
      this.authorized = false;
      this.current = {};
      resolve();
    });
  }
@observable complaintName = ''
@action insertComplaintName(data){
  this.complaintName = data
}
@observable standardData = []
@action addToStandardData(name,data){
  this.standardData[name] = data
}
@observable slideData = []
@action initSlideData = (data) => {
    this.slideData = data
}
@observable order = -1
@computed get percent() {
  let data = (this.order)/this.slideData.length*(100-49)+35;
  return Math.floor(toJS(data))
}
@action rearrangeInitailSummary(){
  
}
@action goBack(navigator){
  if(this.order > -1){
    this.order -= 1
  }
  navigator.pop()
  this.summaryInitialData.pop()
}
@observable summaryInitialData = []
@action addSummaryInitialData(data){
  this.summaryInitialData.push(data);
}
@action goToNext(navigator, skip, questions, data){
  let condition = true
  if(this.order >= 0){
    if(skip){
      this.addSummaryInitialData({})
    }
    else{
      this.addSummaryInitialData(toJS({question: questions, answer: data}))
    }
  }
  else{
    this.insertComplaintName(data);
  }
  do{
    this.order += 1;
    if(this.order >= this.slideData.length){
      condition = false
      navigator.push({
        ...Constants.Screens.COMADDITIONAL,
        navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
        }
      })
      break;
    }else{
      switch(this.slideData[this.order].template){
        case 'Zoom' : navigator.push({
          ...Constants.Screens.DUMMYZOOM,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        case 'SliderOnly' : navigator.push({
          ...Constants.Screens.PAININTENSE,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        case 'Localization' : navigator.push({
          ...Constants.Screens.DUMMYBODY,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          },
        }); condition = false;break;
        case 'ButtonSearch' : navigator.push({
          ...Constants.Screens.NATURECOM,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        case 'SliderTime' : navigator.push({
          ...Constants.Screens.PAINSTART,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        case 'Binary' : navigator.push({
          ...Constants.Screens.BINARY_PAGE,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        case 'ButtonSix' : navigator.push({
          ...Constants.Screens.MULTICHOIC6,
          navigatorStyle: {
            tabBarHidden: true,
            navBarHidden: true,
            statusBarHidden: true,
          },
          passProps: {
            pass: this.slideData[this.order]
          }
        }); condition = false;break;
        default: break;
      }
    }
  }while(condition)
}
@observable finalSummary = ''
@action createSummary(){
  let summary = 'Patient '
  let severity = '';
  let localization = '';
  let localization_zoom = '';
  let duration = '';
  let onset = '';
  let course = '';
  let nature = '';
  let cause  = '';
  const data = (this.summaryInitialData.slice());
  for(let i=0; i< data.length; i++) {
    if(data[i].question){
      const  preset = data[i].question.content.preset;
      switch(preset){
        case 'Localisation Main': localization      += data[i].answer;break;
        case 'Localisation Zoom': localization_zoom += data[i].answer;break;
        case 'Nature'           : nature            += data[i].answer;break;
        case 'Duration'         : duration          += data[i].answer;break;
        case 'OnSet'            : onset             += data[i].answer;break;
        case 'Cause'            : cause             += data[i].answer;break;
        case 'Course'           : course            += data[i].answer;break;
        case 'Severity'         : severity          += data[i].answer;break;
        default: break;
      }
    }
  }
  (severity !='') ? summary += ` has a ${severity} ${this.complaintName.bold}` : summary+=` has a ${this.complaintName}`;
  if(localization !='' || localization_zoom != '') {summary += `.${this.complaintName} located at the ${localization}  ${localization_zoom} ` }
  if(duration !='')  {summary += `.Since ${duration}.The ${this.complaintName}` }
  if(onset !='')     {summary += ` started ${onset}` }
  if(course !='')    {summary += ` and ${course}` }
  if(nature !='')  {summary += `.The ${this.complaintName} is ${nature} in nature` }
  if(cause !='') {summary += `.It is caused by ${cause}` }
  if(this.standardData['additionalcom'] != undefined){
    summary += `${"\n"}Additional complaint are `
    this.standardData['additionalcom'].map(item => {
      summary += `${item}   `
    })
  }
  this.finalSummary = summary
  }

}

export default new Store();
