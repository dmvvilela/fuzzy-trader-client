import React, { useEffect, useState } from "react";
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

import {
  getCriptocoin,
  getInvestedAssets,
} from "store/actions/dashboard.actions";
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

export default function UserProfile() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const fetchErrorMessage = useSelector(
    (state) => state.dashboard.errorMessage
  );
  const errorMessage = useSelector((state) => state.invest.errorMessage);
  const successMessage = useSelector((state) => state.invest.successMessage);
  const cripto = useSelector((state) => state.dashboard.criptocoins);
  const assets = useSelector((state) => state.dashboard.assets);

  const [localError, setLocalError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coin, setCoin] = useState("");

  function fetchAllCriptocoins() {
    dispatch(getCriptocoin("btc"));
    dispatch(getCriptocoin("eth"));
    dispatch(getCriptocoin("bch"));
    dispatch(getCriptocoin("xmr"));
    dispatch(getCriptocoin("ltc"));
  }

  useEffect(() => {
    fetchAllCriptocoins();
    dispatch(getInvestedAssets()); // Apenas caso inicie nessa página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChangeQuantity(value) {
    if (value !== "" && isNaN(parseFloat(value))) {
      setLocalError("Valor inválido.");
      return;
    }

    setLocalError("");
    setQuantity(value.replace(",", "."));
  }

  function onChangeCoin(value) {
    setLocalError("");
    setCoin(value.toUpperCase());
  }

  function onInvest() {
    const code = coin.toUpperCase();

    // Verifica se a ação existe na lista.
    if (!(code in cripto)) {
      setLocalError("Moeda selecionada indisponível.");
      return;
    }

    // Verifica se é nova ou update.
    let update = false;
    let id;
    for (let i = 0; i < assets.length; i++) {
      if (assets[i].type === "cripto" && assets[i].code === code) {
        update = true;
        id = assets[i]._id;
        break;
      }
    }

    const value = parseFloat(quantity);
    const amount = value / cripto[code].value;
    if (!amount) {
      setLocalError("Valor selecionado inválido.");
      return;
    }

    const type = "cripto";
    const name = cripto[code].name;
    if (update) dispatch(updateAsset({ value, amount, name, code, type }, id));
    else dispatch(setAsset({ value, amount, name, code, type }));
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Investir em Criptomoedas
              </h4>
              <p className={classes.cardCategoryWhite}>
                Escolha o valor e clique na moeda desejada
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Valor a ser investido (U$)"
                    value={quantity}
                    onChange={(e) => onChangeQuantity(e.target.value)}
                    id="value"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Moeda (e.g. BTC)"
                    value={coin}
                    onChange={(e) => onChangeCoin(e.target.value)}
                    id="coin"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitle}>
                    Quantidade em Criptomoeda:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {coin}
                      {(quantity &&
                        cripto[coin] &&
                        (
                          parseFloat(quantity) / parseFloat(cripto[coin].value)
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
              <h6 className={classes.cardCategory}>Criptomoedas Recentes</h6>
              <h4 className={classes.cardTitle}>Últimos valores encontrados</h4>
              <p style={{ color: "red" }}>{fetchErrorMessage}</p>
              <Table
                tableHeaderColor="warning"
                tableHead={["Moeda", "Nome", "Valor"]}
                tableData={Object.keys(cripto).map((c) => {
                  const coin = cripto[c];
                  return [
                    coin.code,
                    coin.name,
                    `U$${parseFloat(coin.value).toFixed(2)}`,
                  ];
                })}
              />
              <Button
                color="primary"
                round
                style={{ marginTop: 40 }}
                onClick={() => fetchAllCriptocoins()}
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
