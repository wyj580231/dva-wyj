# dva-wyj
阿里dva数据流的简单实现

## api基本和dva一样，只实现了数据流部分，仅120行左右代码

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
附使用demo https://github.com/wyj580231/webpack4-react-wyj.git
