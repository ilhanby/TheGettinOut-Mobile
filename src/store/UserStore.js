import {observable, configure, action} from 'mobx';

configure({
  enforceActions: 'observed',
});

class UserStore {
  @observable id = '';
  @observable mail = '';
  @observable name = '';
  @observable passw = '';
  @observable position = '';
  @observable notification = '';
  @observable verified = '';
  @observable verifiedCode = '';

  @action.bound async setUser(data) {
    this.id = data.Id;
    this.mail = data.mail;
    this.name = data.name;
    this.passw = data.passw;
    this.position = data.position;
    this.notification = data.notification;
    this.verified = data.verified;
    this.verifiedCode = data.verifiedCode;
  }

  @action.bound async removeUser() {
    this.id = '';
    this.mail = '';
    this.name = '';
    this.passw = '';
    this.position = '';
    this.notification = '';
    this.verified = '';
    this.verifiedCode = '';
  }
}
export default new UserStore();
