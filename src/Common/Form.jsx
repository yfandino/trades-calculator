import React from 'react';
import {
  Button,
  Grid,
  InputAdornment, makeStyles,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: "1rem"
  },
  textField: {
    width: "80%"
  },
  iconActionable: {
    cursor: "pointer"
  }
}));

function Form({ fields, values, btnLabel, onSubmit, onChange, children }) {
  const classes = useStyles();

  const onInputChange = (e) => {
    onChange(e.target);
  }

  return (
    <Grid
      item
      container
      spacing={3}
      direction="column"
      className={classes.form}
    >
      {fields.map(field => (
        <Grid item key={field.id}>
          <TextField
            variant="outlined"
            size="small"
            className={classes.textField}
            id={field.id}
            type={field.type}
            label={field.label}
            InputProps={{
              startAdornment: field.startIcon && <InputAdornment position="start">{field.startIcon.icon}</InputAdornment>,
              endAdornment: field.endIcon &&
                            <InputAdornment
                              className={classes.iconActionable}
                              position="end"
                              onClick={field.endIcon.action}
                              data-field={field.id}
                            >
                              {field.endIcon.icon}
                            </InputAdornment>
            }}
            value={values[field.id] || ""}
            onChange={onInputChange}
          />
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {btnLabel}
        </Button>
        {children}
      </Grid>
    </Grid>
  );
}

export default Form;