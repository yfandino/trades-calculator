import { Grid, makeStyles, Tooltip, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pill: {
    width: "100%",
    margin: "0 0 1rem 0",
    padding: "0.5rem 1rem 1rem 1rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "& .MuiTypography-root": {
      color: "#fff"
    }
  },
  title: {
    height: "3rem"
  },
  columns: {
    fontSize: "0.8rem",
    "& > div": {
      flex: "1 1 0px",
      padding: "8px 16px"
    },
    "& > div:nth-child(1)": {
      paddingLeft: 0,
      paddingRight: 32
    },
    "& > div:nth-child(2)": {
      borderLeft: "1px solid #fff",
      borderRight: "1px solid #fff"
    }
  }
}));

function InfoPill({ title, columns, action }) {
  const classes =useStyles();

  return (
    <Grid className={classes.pill}>
      <Grid
        item
        container
        justify="space-between"
        wrap="nowrap"
        alignItems="center"
        className={classes.title}
      >
        <Typography variant="h6" component="span">{title}</Typography>
        {action && (
          <Tooltip title={action.title}>
            {action.component}
          </Tooltip>
        )}
      </Grid>
      <Columns columns={columns} />
    </Grid>
  );
}

export default InfoPill;

const Columns = ({ columns }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.columns} justify="space-between">
      {columns.map(item => (
        <Grid key={item.title}>
          <div>{item.title}</div>
          <div>{item.value < 0.9999
            ? parseFloat(item.value).toFixed(8)
            : parseFloat(item.value).toPrecision(8)
          }</div>
        </Grid>
      ))}
    </Grid>
  );
}