import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.js";


import App from "./components/App";
import reducers from "./reducers";

// document.addEventListener("DOMContentLoaded", function() { // how to practice info
//   var elems = document.querySelectorAll(".collapsible");
//   var instances = M.Collapsible.init(elems, {});
// });


document.addEventListener('DOMContentLoaded', function() { // modal
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
});


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
