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

import { getCriptocoin } from "store/actions/dashboard.actions";

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

  const errorMessage = useSelector((state) => state.dashboard.errorMessage);
  const cripto = useSelector((state) => state.dashboard.criptocoins);

  function fetchAllCriptocoins() {
    dispatch(getCriptocoin("btc"));
    dispatch(getCriptocoin("eth"));
    dispatch(getCriptocoin("bch"));
    dispatch(getCriptocoin("xmr"));
    dispatch(getCriptocoin("doge"));
  }

  useEffect(() => {
    fetchAllCriptocoins();
  }, [fetchAllCriptocoins]);

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
                    labelText="Valor a ser investido"
                    id="value"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Moeda"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitle}>
                    Quantidade em Criptomoeda: 0.00
                  </h4>
                  <p style={{ color: "green" }}>
                    Investimento realizado com sucesso! Verifique no painel seus
                    ativos.
                  </p>
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
              <h6 className={classes.cardCategory}>Criptomoedas Recentes</h6>
              <h4 className={classes.cardTitle}>Últimos preços encontrados</h4>
              <p style={{ color: "red" }}>{errorMessage}</p>
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
