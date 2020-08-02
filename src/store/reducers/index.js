import { combineReducers } from "redux";
import dashboardReducer from "./dashboard.reducer";
import investReducer from "./invest.reducer";

export default () =>
  combineReducers({
    dashboard: dashboardReducer,
    invest: investReducer,
  });
