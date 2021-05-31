import TradesView from "./TradesView";
import {
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { getTrades, getWallet } from "../api";
import { Select, Switch } from "../Common";
import { Replay } from "@material-ui/icons";
import Wallet from "./Wallet";
import { AppContext } from "../AppContext";
import SelectedTrades from "./SelectedTrades";

const BinanceWallet = () => {
  const [tradingType, setTradingType] = useState("SPOT");
  const [wallet, setWallet] = useState();
  const [trades, setTrades] = useState();
  const [error, setError] = useState();
  const [avgValues, setAvgValues] = useState();
  const { appState: { selectedPair }, setAppState } = useContext(AppContext);

  const fetchPair = useCallback(async () => {
    const trades = await getTrades(tradingType, selectedPair)
      .catch(setError);

    setTrades(trades);
    setAppState((prev => ({ ...prev, loading: false })));
  }, [tradingType, selectedPair, setAppState]);

  const setSelectedPair = (selectedPair) => setAppState(prev => ({ ...prev, selectedPair}));

  useEffect(function updateWhenPairChanges() {
    setError(null);
    if (!selectedPair) return;

    setTrades(null);
    setAppState((prev => ({ ...prev, loading: true })));
    fetchPair();
  }, [selectedPair, fetchPair, setAppState]);

  useEffect(function updateWallet() {
    getWallet(tradingType)
      .then(wallet => {
        const inWallet = selectedPair && wallet.some(e => selectedPair.indexOf(e.asset) !== -1);
        if (!inWallet) setSelectedPair("");
        setWallet(wallet);
      })
      .catch(setError);
  }, [tradingType]);

  return (
    <Grid
      item
      container
      xs={9}
      alignContent="flex-start"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h5">Transacciones Criptomonedas</Typography>
      </Grid>
      <Grid item xs={3}>
        <Switch
          options={["SPOT", "MARGIN"]}
          value={tradingType} onChange={setTradingType}
        />
        <Grid item container style={{ alignItems: "flex-end" }}>
          <Select
            options={wallet?.map(e => e.asset) || []}
            onChange={setSelectedPair}
            value={selectedPair}
          />
          {selectedPair && (
            <Tooltip title="Recargar" aria-label="reload">
              <IconButton
                color="primary"
                aria-label="reload"
                onClick={() => fetchPair()}
                style={{ margin: "4px 0" }}
              >
                <Replay />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Wallet wallet={wallet} selectedPair={selectedPair} />
      </Grid>
      <Grid item xs={4}>
        <SelectedTrades calcValues={avgValues} />
      </Grid>
      {trades && (
        <Grid item xs={12}>
          <TradesView
            trades={trades}
            error={error}
            tradingType={tradingType}
            setAvgValues={setAvgValues}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default BinanceWallet;