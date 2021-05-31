import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "1rem"
  },
  radio: {
    display: "none"
  },
  label: {
    width: "4.5rem",
    display: "inline-block",
    cursor: "pointer",
    textAlign: "center",
    color: "#FAFAFA",
    fontWeight: "bold",
    padding: "0.5rem",
    border: "solid 1px black",
    borderColor: "#BDBDBD",
    backgroundColor: "#BDBDBD",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#707070",
      borderColor: "#707070"
    },
    "&[aria-selected=true]": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main
    }
  }
}));

function Switch({ options, value, onChange }) {
  const classes = useStyles();

  const onRadioChange = (e) => {
    onChange(e.target.value);
  }

  return (
    <Grid item container className={classes.container}>
      {options.map(option => (
        <div key={option}>
          <label
            htmlFor={option}
            className={classes.label}
            aria-selected={value === option}
          >
            {option.toLowerCase()}
          </label>
          <input
            className={classes.radio}
            type="radio"
            id={option}
            value={option}
            checked={value === option}
            onChange={onRadioChange}
          />
        </div>
     ))}
    </Grid>
  );
}

export default Switch;