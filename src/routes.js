// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import InvestCripto from "views/InvestCripto/InvestCripto.js";
import InvestStocks from "views/InvestStocks/InvestStocks";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Painel Fuzzy Trader",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/invest/cripto",
    name: "Investir em Criptomoeda",
    icon: Person,
    component: InvestCripto,
    layout: "/admin",
  },
  {
    path: "/invest/stocks",
    name: "Investir em Ações",
    icon: "content_paste",
    component: InvestStocks,
    layout: "/admin",
  },
];

export default dashboardRoutes;
