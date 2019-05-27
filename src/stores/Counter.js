// @flow

import { observable, action } from 'mobx';

class Store {
  @observable count = 0;
  @observable sessionId = '';
  @observable policyData = '';
  @action onPlus() {
    this.count += 1;
  }

  @action onMinus() {
    this.count -= 1;
  }

  @action getsessionId(value) {
    this.sessionId = value;
  }

  @action getPolicyData = (value) => {
    this.policyData = value;
  }
}

export default new Store();
