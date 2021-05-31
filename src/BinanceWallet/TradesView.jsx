import { useEffect, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Table } from "../Common";

const useStyles = makeStyles(theme => ({
  isBuyer: {
    background: "#158F4F",
    color: "#fff"
  },
  isSeller: {
    background: "#8F1B0E",
    color: "#fff"
  }
}));

function TradesView({ trades, error, tradingType, setAvgValues }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const TRADES_TABLE_COLUMNS = [
    {
      title: "Fecha",
      id: 'time',
      getValue: (time) => new Date(time).toLocaleDateString()
    },
    { title: "Precio ($)", id: "price" },
    { title: "Cantidad", id: "qty" },
    { title: "Total ($)", id: "quoteQty" },
    { title: "Comisión", id: "commission" },
    { title: "Comisión en", id: "commissionAsset" },
    {
      title: "Tipo",
      id: "isBuyer",
      getValue: (isBuyer) => isBuyer ? 'Compra' : 'Venta',
      className: (isBuyer) => isBuyer ? classes.isBuyer : classes.isSeller
    }
  ];

  useEffect(function calculateFromSelected() {
    if (!selected.length) {
      setAvgValues(null);
      return
    };

    const calcValues = selected.reduce((acc, current, index) => {
      acc.invested += tradingType === "SPOT"
        ? parseFloat(current.quoteQty)
        : parseFloat(current.price) * parseFloat(current.qty);
      acc.price += parseFloat(current.price);
      acc.qty += parseFloat(current.qty);
      return acc;
    }, { invested: 0, price: 0, qty: 0 });

    calcValues.avgPrice = calcValues.price / (selected.length);
    delete calcValues.price;
    setAvgValues(calcValues);
  }, [selected, setAvgValues, tradingType]);

  const onCheckboxChange = (e) => {
    const id = parseInt(e.target.value);
    const isChecked = e.target.checked;
    const item = trades.find(e => e.id === id);

    if (isChecked) setSelected([...selected, item]);
    else {
      selected.splice(selected.findIndex(e => e.id === item.id), 1);
      setSelected(Array.from(selected));
    }
  }

  if (error) return <Typography>{error.msg}</Typography>;

  return (
    <Grid item container direction="column">
      {trades && (
        <Table
          selectable
          columns={TRADES_TABLE_COLUMNS}
          rows={trades}
          onSelect={onCheckboxChange}
        />
      )}
    </Grid>
  );
}

export default TradesView;