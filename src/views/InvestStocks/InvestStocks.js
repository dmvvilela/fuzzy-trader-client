import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

// import avatar from "assets/img/faces/marc.jpg";

import { getStock } from "store/actions/dashboard.actions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function InvestStocks() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const fetchErrorMessage = useSelector(
    (state) => state.dashboard.errorMessage
  );
  const errorMessage = useSelector((state) => state.invest.errorMessage);
  const successMessage = useSelector((state) => state.invest.successMessage);
  const stocks = useSelector((state) => state.dashboard.stocks);

  function fetchAllStocks() {
    dispatch(getStock("msft"));
    dispatch(getStock("ibm"));
    dispatch(getStock("goog"));
    dispatch(getStock("nke"));
    dispatch(getStock("sbux"));
  }

  useEffect(() => {
    fetchAllStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Investir em Ações</h4>
              <p className={classes.cardCategoryWhite}>
                Escolha a quantidade e indique a ação desejada
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Quantidade de ações"
                    id="quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ação (e.g. goog)"
                    id="stock"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitle}>
                    Valor total investido: U$0.00
                  </h4>
                  <p style={{ color: "green" }}>{successMessage}</p>
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Investir</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Ações Recentes</h6>
              <h4 className={classes.cardTitle}>Últimos valores encontrados</h4>
              <p style={{ color: "red" }}>{fetchErrorMessage}</p>
              <Table
                tableHeaderColor="warning"
                tableHead={["Ação", "Valor"]}
                tableData={Object.keys(stocks).map((s) => {
                  const stock = stocks[s];
                  return [
                    stock.symbol,
                    `U$${parseFloat(stock.value).toFixed(2)}`,
                  ];
                })}
              />
              <Button
                color="primary"
                round
                style={{ marginTop: 40 }}
                onClick={() => fetchAllStocks()}
              >
                Atualizar
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
