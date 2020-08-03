import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {
  // getCriptocoin,
  // getStock,
  getInvestedAssets,
} from "store/actions/dashboard.actions";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const isLoading = useSelector((state) => state.dashboard.isLoading);
  // const errorMessage = useSelector((state) => state.dashboard.errorMessage);
  const assets = useSelector((state) => state.dashboard.assets);
  // const stocks = useSelector((state) => state.dashboard.stocks);
  // const cripto = useSelector((state) => state.dashboard.criptocoins);

  let criptoQtt = 0;
  let stocksQtt = 0;
  let criptoTotal = 0;
  let stocksTotal = 0;
  let assetsTotal = 0;
  if (assets) {
    for (let i = 0; i < assets.length; i++) {
      if (assets[i].type === "cripto") {
        criptoQtt++;
        criptoTotal += assets[i].value;
      } else if (assets[i].type === "stock") {
        stocksQtt++;
        stocksTotal += assets[i].value;
      }
    }

    assetsTotal = criptoTotal + stocksTotal;
  }

  useEffect(() => {
    dispatch(getInvestedAssets());
    // dispatch(getCriptocoin("btc"));
    // dispatch(getCriptocoin("eth"));
    // dispatch(getCriptocoin("bch"));
    // dispatch(getCriptocoin("xmr"));
    // dispatch(getCriptocoin("ltc"));
    // dispatch(getStock("msft"));
    // dispatch(getStock("ibm"));
    // dispatch(getStock("goog"));
    // dispatch(getStock("nke"));
    // dispatch(getStock("sbux"));
  }, [dispatch]);

  // console.log(assets);
  // console.log(stocks);
  // console.log(cripto);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Investimentos</p>
              <h3
                className={classes.cardTitle}
              >{`${criptoQtt}/${stocksQtt}`}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>Criptomoedas/Ações</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Total em Ativos</p>
              <h3 className={classes.cardTitle}>
                U${`${assetsTotal.toFixed(2)}`}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>Criptomoedas + Ações</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total em Criptomoedas</p>
              <h3 className={classes.cardTitle}>
                {`${criptoTotal.toFixed(2)}`}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>Quantidade de criptomedas</div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total em Ações</p>
              <h3 className={classes.cardTitle}>
                U${`${stocksTotal.toFixed(2)}`}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>Valor em ações</div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ativos em Criptomoedas</h4>
              <p className={classes.cardCategoryWhite}>
                Sua carteira de investimentos em criptomoedas.
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Moeda", "Nome", "Quantidade"]}
                tableData={assets
                  .filter((asset) => asset.type === "cripto")
                  .map((asset) => {
                    return [
                      asset.code,
                      asset.name,
                      `${parseFloat(asset.value).toFixed(2)}`,
                    ];
                  })}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Ativos em Ações</h4>
              <p className={classes.cardCategoryWhite}>
                Sua carteira de investimentos em ações.
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Ação", "Valor"]}
                tableData={assets
                  .filter((asset) => asset.type === "stock")
                  .map((asset) => {
                    return [
                      asset.code,
                      `U$${parseFloat(asset.value).toFixed(2)}`,
                    ];
                  })}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
