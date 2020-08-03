import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

// import avatar from "assets/img/faces/marc.jpg";

import { getStock, getInvestedAssets } from "store/actions/dashboard.actions";
import { setAsset, updateAsset } from "store/actions/invest.actions";

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

  const [localError, setLocalError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");

  const fetchErrorMessage = useSelector(
    (state) => state.dashboard.errorMessage
  );
  const errorMessage = useSelector((state) => state.invest.errorMessage);
  const successMessage = useSelector((state) => state.invest.successMessage);
  const stocks = useSelector((state) => state.dashboard.stocks);
  const assets = useSelector((state) => state.dashboard.assets);

  function fetchAllStocks() {
    dispatch(getStock("msft", "Microsoft"));
    dispatch(getStock("ibm", "IBM"));
    dispatch(getStock("goog", "Google"));
    dispatch(getStock("nke", "Nike"));
    dispatch(getStock("sbux", "Starbucks"));
  }

  useEffect(() => {
    fetchAllStocks();
    dispatch(getInvestedAssets()); // Apenas caso inicie nessa página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChangeQuantity(value) {
    if (value !== "" && isNaN(parseFloat(value))) {
      setLocalError("Quantidade inválida.");
      return;
    }

    setLocalError("");
    setQuantity(value.replace(",", "."));
  }

  function onChangeStock(value) {
    setLocalError("");
    setStock(value.toUpperCase());
  }

  function onInvest() {
    const code = stock.toUpperCase();

    // Verifica se a ação existe na lista.
    if (!(code in stocks)) {
      setLocalError("Ação selecionada indisponível.");
      return;
    }

    // Verifica se é nova ou update.
    let update = false;
    let id;
    for (let i = 0; i < assets.length; i++) {
      if (assets[i].type === "stock" && assets[i].code === code) {
        update = true;
        id = assets[i]._id;
        break;
      }
    }

    const amount = parseFloat(quantity);
    const value = stocks[code].value * amount;
    if (!value) {
      setLocalError("Quantidade selecionada inválida.");
      return;
    }

    const type = "stock";
    const name = stocks[code].name;
    if (update) dispatch(updateAsset({ value, name, amount, code, type }, id));
    else dispatch(setAsset({ value, name, amount, code, type }));
  }

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
                    value={quantity}
                    onChange={(e) => onChangeQuantity(e.target.value)}
                    id="quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ação (e.g. GOOG)"
                    value={stock}
                    onChange={(e) => onChangeStock(e.target.value)}
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
                    Total a ser investido:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      U$
                      {(quantity &&
                        stocks[stock] &&
                        (
                          parseFloat(quantity) * parseFloat(stocks[stock].value)
                        ).toFixed(2)) ||
                        "0.00"}
                    </span>
                  </h4>
                  <p style={{ color: "green" }}>{successMessage}</p>
                  <p style={{ color: "red" }}>{errorMessage}</p>
                  <p style={{ color: "red" }}>{localError}</p>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={onInvest}>
                Investir
              </Button>
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
                tableHead={["Ação", "Nome", "Valor"]}
                tableData={Object.keys(stocks).map((s) => {
                  const stock = stocks[s];
                  return [
                    stock.symbol,
                    stock.name,
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
