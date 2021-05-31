import { AppContext } from "./AppContext";
import CalculateProfit from "./CalculateProfit";
import BinanceWallet from "./BinanceWallet";
import { useEffect, useState } from "react";
import {
  CssBaseline,
  Grid, LinearProgress,
  makeStyles
} from "@material-ui/core";
import Credentials from "./Credentials";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const [hasCredentials, setHasCredentials] = useState(false);
  const [appState, setAppState] = useState({
    loading: true,
    selectedPair: "",
    calcValues: {}
  });

  useEffect(function checkCredentials() {
    const SECRET = localStorage.getItem('secret');
    const API_KEY = localStorage.getItem('apiKey');

    if (!SECRET || !API_KEY) {
      setHasCredentials(false);
    } else {
      setAppState(prev => ({ ...prev, loading: false }));
      setHasCredentials(true);
    }
  }, [hasCredentials]);

  if (!hasCredentials) return <Credentials />;

  return (
    <div>
      <CssBaseline />
      {appState.loading && <LinearProgress />}
      <Grid container className={classes.container}>
        <AppContext.Provider value={{ appState, setAppState }}>
          <CalculateProfit />
          <BinanceWallet />
        </AppContext.Provider>
      </Grid>
    </div>
  );
}

export default App;
