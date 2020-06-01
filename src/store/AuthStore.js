import {observable, action, configure} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import UserStore from './UserStore';
import config from '../config';
import axios from 'axios';

configure({
  enforceActions: 'observed',
});

class AuthStore {
  @observable isLogin = false;
  @observable token = null;

  @action.bound async saveToken(token, data) {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound async removeToken() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userInfo');
      await UserStore.removeUser();
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }

  @action.bound async setupAuth() {
    await this.getToken();
  }

  @action.bound async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('userInfo');
      if (!token || !userData) this.isLogin = false;
      else {
        const {data} = await axios.get(
          `${config.API.apiURL}/get_TokenCheck/${
            config.API.accessToken
          }&_token=${token}`,
        );
        if (data.header.status) {
          await UserStore.setUser(JSON.parse(userData));
          this.token = token;
          this.isLogin = true;
        } else {
          this.token = null;
          this.isLogin = false;
        }
      }
    } catch (e) {
      console.log(e);
      this.isLogin = false;
    }
  }
}

export default new AuthStore();
