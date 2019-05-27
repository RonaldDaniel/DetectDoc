/*
*   author: denis
*   date:   7/30/2018
*/

import axios from 'axios';

const domain = 'https://ap-insurance-dev.cs67.force.com/services/apexrest/';

// const isServerProduction = () => domain === productionURL

export default class Api {
  //login
  static login(email, password) {
    return axios({
      method: 'get',
      url:  'https://ap-insurance-dev.cs67.force.com/services/apexrest/Login',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      params: {
        email: email,
        password: password
      }
    });
  }
  static getComplaints() {
    return axios({
      method: 'get',
      url:  'http://ec2-18-222-87-140.us-east-2.compute.amazonaws.com:7704/medvice/rest/api/v1/complaints',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    });
  }
  static submitSummary(data,comID) {
    return axios({
      method: 'post',
      url:  'http://ec2-18-222-87-140.us-east-2.compute.amazonaws.com:7704/medvice/rest/api/v1/summary/submit',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      data: {
        accountID: 1,
        name: "my first summary",
        complaints_ids: [
          2048
        ],
        answers: [
          {
            "question_id": 432,
            "complaint_id": 2048,
            "response": "response text to the question 4"
          },
          {
            "question_id": 433,
            "complaint_id": 2048,
            "response": "response text to the question 5"
          }
          
        ]
      }
    });
  }

}