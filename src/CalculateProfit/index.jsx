import { useContext, useEffect, useState } from "react";
import { Button, Grid, Tooltip, Typography } from '@material-ui/core';
import { AppContext } from "../AppContext";
import { AttachMoney, BlurOn, GetApp } from "@material-ui/icons";
import { Switch, Form } from "../Common";
import { getAvgPrice } from "../api";

function CalculateProfit() {
  const [calcType, setCalcType] = useState('COMPRA');
  const [form, setForm] = useState({});
  const [results, setResults] = useState();
  const { appState, setAppState } = useContext(AppContext);
  const fields = [
    {
      id: "invested",
      type: "number",
      label: "Invertido",
      startIcon: {
        icon: <AttachMoney />
      }
    },
    {
      id: "assetQty",
      type: "number",
      label: "Cantidad Obtenida",
      startIcon: {
        icon: <BlurOn />
      }
    },
    {
      id: "startPrice",
      type: "number",
      label: "Precio de entrada",
      startIcon: {
        icon: <AttachMoney />
      },
      endIcon: {
        icon: <Tooltip title="Cargar precio mercado"><GetApp /></Tooltip>,
        action: getPrice
      }
    },
    {
      id: "endPrice",
      type: "number",
      label: "Precio de salida",
      startIcon: {
        icon: <AttachMoney />
      },
      endIcon: {
        icon: <Tooltip title="Cargar precio mercado"><GetApp /></Tooltip>,
        action: getPrice
      }
    },
  ];

  useEffect(() => {
    setAppState(prev => ({ ...prev, calcValues: null }));
    setResults(null);
  }, [form, setAppState]);

  const onChange = (field) => {
    const values = Object.assign({}, form, { [field.id]: field.value });

    if (field.id === "invested" && form.assetQty) {
      values.startPrice = calcFromSiblings(field.value, form.assetQty, '/');
    } else if (field.id === "invested" && form.startPrice) {
      values.assetQty = calcFromSiblings(field.value, form.startPrice, '/');
    } else if (field.id === "assetQty" && form.invested) {
      values.startPrice = calcFromSiblings(form.invested, field.value, '/');
    } else if (field.id === "startPrice" && form.assetQty) {
      values.invested = calcFromSiblings(form.assetQty, field.value, '*');
    }

    setForm(values);
  }

  function calcFromSiblings(sibling1, sibling2, op) {
    const s1 = parseFloat(sibling1);
    const s2 = parseFloat(sibling2);

    if (op === '*') return (s1 * s2).toString();
    else if (op === '/') return (s1 / s2).toString();
  }

  useEffect(function updateFromContext() {
    if (!appState.calcValues) return;
    const { calcValues } = appState;

    const form = {
      invested: calcValues.invested,
      assetQty: calcValues.qty,
      startPrice: calcValues.avgPrice
    }
    setForm(form);
  }, [appState]);

  async function getPrice(e) {
    const field = e.currentTarget.dataset.field;
    const avgPrice = await getAvgPrice(appState.selectedPair);
    setForm({ ...form, [field]: avgPrice });
  }

  const calculate = () => {
    let profit;
    const { invested, assetQty, endPrice } = form;
    const totalEnd = parseFloat(endPrice) * parseFloat(assetQty);
    const startFee = parseFloat(invested) * 0.001;
    const endFee = totalEnd * 0.001;

    if (calcType === "VENTA")
      profit = invested - totalEnd - startFee - endFee;
    else
      profit = totalEnd - invested - startFee - endFee;

    const results = {
      profit,
      totalEnd,
      startFee,
      endFee
    }
    setResults(results);
  }

  return (
    <Grid item container xs={3} direction="column">
      <Typography variant="h5">Calculadora</Typography>
      <Switch
        options={["COMPRA", "VENTA"]}
        value={calcType}
        onChange={setCalcType}
      />
      <Form
        fields={fields}
        values={form}
        btnLabel="Calcular"
        onChange={onChange}
        onSubmit={calculate}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setForm({})}
          style={{ marginLeft: "1rem" }}
        >
          Reset
        </Button>
      </Form>
      {results && (
        <>
          <p>Total Venta: {results.totalEnd}</p>
          <p>Ganancia: {results.profit}</p>
          <p>Comisión Entrada: {results.startFee}</p>
          <p>Comisión Salida: {results.endFee}</p>
        </>
      )}
    </Grid>
  );
}

export default CalculateProfit;
