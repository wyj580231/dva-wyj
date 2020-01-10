# dva-wyj
阿里dva数据流的简单实现

## api基本和dva一样，只实现了数据流部分，仅120行左右代码
index.js
```
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./global";
import "./global.scss";
import App from "./App";
import WRedux from "dva-wyj";
import toDoList from "./models/toDoList";

const models = [toDoList];
const wApp = WRedux(models);
const store = wApp.run();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

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
附使用demo https://github.com/wyj580231/webpack4-react-wyj.git
