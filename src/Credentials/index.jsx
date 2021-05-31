import { Form } from "../Common";
import { Security, VpnKey } from "@material-ui/icons";
import { useState } from "react";
import { Grid } from "@material-ui/core";

function Credentials() {
  const [form, setForm] = useState({});
  const fields = [
    {
      id: "secret",
      type: "text",
      label: "Secret",
      startIcon: {
        icon: <VpnKey />
      }
    },
    {
      id: "apiKey",
      type: "text",
      label: "Api key",
      startIcon: {
        icon: <Security />
      }
    },
  ];

  const onChange = (field) => {
    setForm({ ...form, [field.id]: field.value });
  }

  const onSubmit = () => {
    if (!form.apiKey.trim() || !form.secret.trim()) {
      alert("Rellena todos los campos");
      return;
    }
    localStorage.setItem("secret", form.secret.trim());
    localStorage.setItem("apiKey", form.apiKey.trim());
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  return (
    <Grid container>
      <Form
        fields={fields}
        values={form}
        btnLabel="Configurar"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Grid>
  );
}

export default Credentials;