import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../components/AddressForm';
import Info from '../components/Info';
import InfoMobile from '../components/InfoMobile';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import SitemarkIcon from '../components/SitemarkIcon';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { useCart } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import { checkoutService } from "../services/api.service";
import OrderStatusMessage from '../components/Status';

const steps = ['Endereço', 'Pagamento', 'Revisão'];

export default function Checkout(props) {
  const { cart,clearCart,calculateTotal } = useCart();
  const { checkoutData, updateCheckoutData,clearCheckoutData } = useCheckout();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState({ success: null, message: '' });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm onSave={(data) => updateCheckoutData("address", data)} />;
      case 1:
        return <PaymentForm onSave={(data) => updateCheckoutData("payment", data)} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0 && !checkoutData.address || !checkoutData.user_name || !checkoutData.user_email || !checkoutData.city || !checkoutData.state || !checkoutData.postal_code) {
      alert("Por favor, preencha os campos!");
      return;
    }
    if (activeStep === 1 && !checkoutData.payment_method) {
      alert("Por favor, preencha os dados de pagamento!");
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = async () =>{
    setLoading(true);
    setError(null);

    const checkoutWithProducts = {
      ...checkoutData,
      products: cart,
    }

    try{
      const result = await checkoutService(checkoutWithProducts);
      if(result.success){
        setOrderPlaced(true);
        setOrderStatus({ success: true, message: result.message });
        clearCart();
        clearCheckoutData();
      }else{
        setOrderStatus({ success: false, message: result.message });
        setError(result.message);
      }
      }catch(error){
        setOrderStatus({ success: false, message: "Erro ao finalizar compra" });
        setError("Erro ao finalizar compra");
      }finally{
        setLoading(false);
      }
    };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid container sx={{ height: '100%', mt: { xs: 4, sm: 0 } }}>
        <Grid
          item xs={12} md={5} lg={4}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            pt: 16, px: 10, gap: 4,
          }}
        >
          <SitemarkIcon />
          <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
            <Info />
          </Box>
        </Grid>

        <Grid
          item xs={12} md={7} lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">{calculateTotal()}</Typography>
              </div>
              <InfoMobile totalPrice={calculateTotal()} />
            </CardContent>
          </Card>

          {loading ? (<div style={{ marginTop: 20, textAlign: "center" }}>
                        <CircularProgress />
                      </div>):(
          <Box sx={{ flexGrow: 1, maxWidth: { sm: '100%', md: 600 }, maxHeight: '720px' }}>
            {orderPlaced ? (
              <OrderStatusMessage  success={orderStatus.success} message={orderStatus.message}/>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, alignItems: 'end', flexGrow: 1, gap: 1 }}>
                  {activeStep !== 0 && (
                    <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="outlined" fullWidth>
                      Voltar
                    </Button>
                  )}
                  <Button 
                    disabled={calculateTotal() == 0}
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar pedido' : 'Próximo'}
                  </Button>
                </Box>
              </>
            )}
          </Box>)}
        </Grid>
      </Grid>
    </AppTheme>
  );
}
