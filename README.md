# dva-wyj
阿里dva数据流的简单实现

## api基本和dva一样，只实现了数据流部分，仅120行左右代码
## 支持initialState、onStateChange、onError钩子
index.js
```
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import { MenuProvider } from 'react-native-popup-menu';
import App from './App';
import theme from './config/theme';
import Loading from './components/loading';
import DeviceStorage from './utils/storgae';
import WRedux from './redux';
import app from './models/app';
import note from './models/note';

const AppRoot = () => {
  const [store, setStore] = useState(null);
  useEffect(() => {
    DeviceStorage.get('appState', {}).then(initialState => {
      const models = [app, note];
      const onError = ({ e, action, namespace }) =>
        Alert.alert(
          '系统错误',
          `namespace: ${namespace}\nactionType: ${action.type}\nmessage: ${e.message}\nstack: ${e.stack}`
        );
      const onStateChange = ({ stateChanged, namespace, stateBefore }) => {
        const model = models.find(v => v.namespace === namespace);
        let { storeFields } = model;
        storeFields = storeFields ? (storeFields === 'all' ? Object.keys(stateChanged) : storeFields) : [];
        const stateNeedStore = {};
        storeFields.forEach(key => {
          stateNeedStore[key] = stateChanged[key];
        });
        DeviceStorage.update('appState', { [namespace]: stateNeedStore });
      };
      const wApp = WRedux(models, { initialState, onError, onStateChange });
      const store = wApp.run();
      global.store = store;
      setStore(store);
    });
  }, []);
  return store ? (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MenuProvider backHandler>
          <App />
        </MenuProvider>
      </ThemeProvider>
    </Provider>
  ) : (
    <Loading />
  );
};

export default AppRoot;


```
示例model
```
import { delay } from "redux-saga";
export default {
  namespace: "toDoList",
  state: {
    sagaTab: "Everything",
    list: [
      { text: "test1", time: "2018-12-06 09:39:17", completed: false },
      { text: "test2", time: "2018-12-07 09:39:17", completed: false },
      { text: "test3", time: "2018-12-08 09:39:17", completed: true },
      { text: "test4", time: "2018-12-09 09:39:17", completed: true },
      { text: "test5", time: "2018-12-10 09:39:17", completed: false }
    ]
  },
  effects: {
    *sagaTest({ put, select }, { payload }) {
      let { list } = yield select(state => state.toDoList);
      yield delay(2000);
      list.push(payload.item);
      yield put({ type: "toDoList/save", payload: { list } });
      return "sagareturnvalue";
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};

```
附使用demo 
PC： https://github.com/wyj580231/webpack4-react-wyj.git
RN： https://github.com/wyj580231/WNote
