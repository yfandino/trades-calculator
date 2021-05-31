import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "1rem 1rem 1rem 0",
    minWidth: 190,
    verticalAlign: "bottom",
  },
  hidden: {
    display: "none",
  },
}));

function Select({ options, value, onChange }) {
  const classes = useStyles();

  const iconComponent = (props) => (
    <ExpandMoreIcon className={props.className}/>
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="pair-select">Par</InputLabel>
      <MuiSelect
        native
        disableUnderline
        IconComponent={iconComponent}
        inputProps={{
          name: 'age',
          id: 'pair-select',
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled className={classes.hidden}>Selecciona un opción</option>
        {options.map(option => (
          <option key={option} value={`${option}USDT`}>{`${option}USDT`}</option>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;