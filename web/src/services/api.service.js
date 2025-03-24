import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchProducts = () => {
    return api.get('/product')
    .then(response => response.data)
    .catch(error => {
        console.error('Error to get products: ', error);
        throw error;
    });
};

export const checkoutService = async (checkoutData) =>{
    try{
        const response = await api.post("/order/new",checkoutData);
        if (response.status === 201){
            return {success: true, message: response.data.message}
        }else{
            return {success: false, message: response.data.error}
        }
    }catch(error){
        console.error("Erro ao enviar dados do checkout:", error);
        return {success: false, message: "Erro ao tentar finalizar a compra."}
    }
}