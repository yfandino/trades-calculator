import { InfoPill } from "../Common";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { IconButton } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

function SelectedTrades({ calcValues }) {
  const { setAppState } = useContext(AppContext);

  if (!calcValues) return <div></div>;

  const ITEMS = [
    { title: "Invertido", value: calcValues.invested },
    { title: "Entrada", value: calcValues.avgPrice },
    { title: "Cantidad", value: calcValues.qty }
  ];

  const action = {
    title: "Pasar a calculadora",
    component:
      <IconButton
        onClick={() => setAppState(prev => ({ ...prev, calcValues }))}
      >
        <AddBox style={{ color: "#fff" }} />
      </IconButton>
  }

  return (
    <InfoPill
      title="Promedio"
      columns={ITEMS}
      action={action}
    />
  );
}

export default SelectedTrades;