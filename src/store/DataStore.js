import {observable, configure, action, runInAction} from 'mobx';
import config from '../config';
import axios from 'axios';

configure({
  enforceActions: 'observed',
});

class DataStore {
  @observable allEvents = [];
  @observable events = [];
  @observable page = 0;
  @observable isLoading = true;

  @action pageIncrement = () => {
    this.page++;
  };

  @action loadingChanged = check => {
    this.isLoading = check;
  };

  @action.bound async getEvent() {
    try {
      const {data} = await axios.get(
        `${config.API.apiURL}/get_Event/${config.API.accessToken}&page=${
          this.page
        }`,
      );
      runInAction(() => {
        if (data.body.length != 0) {
          const newRecords = [];
          let pageIndex = this.page * 10;
          for (let i = pageIndex; i < pageIndex + 10; i++) {
            newRecords.push(data.body[i]);
          }
          this.allEvents = [...this.allEvents, ...newRecords];
        }
      });
      this.loadingChanged(false);
    } catch (e) {
      console.log(e);
      this.loadingChanged(false);
    }
  }
}
export default new DataStore();
