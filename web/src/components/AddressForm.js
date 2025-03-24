import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useCheckout } from '../context/CheckoutContext';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const { checkoutData, updateCheckoutData } = useCheckout();
  const [address, setAddress] = React.useState(checkoutData.address || "");
  const [user_name, setUser_name] = React.useState(checkoutData.user_name || "");
  const [user_email, setUser_email] = React.useState(checkoutData.user_email || "");
  const [city, setCity] = React.useState(checkoutData.city || "");
  const [state, setState] = React.useState(checkoutData.state || "");
  const [postal_code, setPostal_code] = React.useState(checkoutData.postal_code || "");

  const handleSave = () => {
    updateCheckoutData("address", address);
    updateCheckoutData("user_name", user_name);
    updateCheckoutData("user_email", user_email);
    updateCheckoutData("city", city);
    updateCheckoutData("state", state);
    updateCheckoutData("postal_code", postal_code);
  };

  const handleCepChange = (e) =>{
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    setPostal_code(value);
  }
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="user_name" required>
          Nome
        </FormLabel>
        <OutlinedInput
          id="user_name"
          name="user_name"
          type="name"
          placeholder="João"
          autoComplete="nome"
          onChange={(e) => setUser_name(e.target.value)}
          onBlur={handleSave}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="user_email" required>
          E-mail
        </FormLabel>
        <OutlinedInput
          id="user_email"
          name="user_email"
          type="user_email"
          placeholder="example@email.com"
          autoComplete="email"
          onChange={(e) => setUser_email(e.target.value)}
          onBlur={handleSave}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>
          Endereço
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder="Rua, número, Bairro"
          autoComplete="shipping address-line"
          onChange={(e) => setAddress(e.target.value)}
          onBlur={handleSave}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="Curitiba"
          autoComplete="City"
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleSave}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          Estado
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="Paraná"
          autoComplete="State"
          onChange={(e) => setState(e.target.value)}
          onBlur={handleSave}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="postal_code" required>
          CEP
        </FormLabel>
        <OutlinedInput
          id="postal_code"
          name="postal_code"
          value={postal_code}
          onChange={handleCepChange}
          type="text"
          placeholder="12345-123"
          autoComplete="shipping postal-code"
          onBlur={handleSave}
          required
          size="small"
          inputProps={{
            maxLength: 10,
          }}
        />
      </FormGrid>
    </Grid>
  );
}