const OrderService = require('../services/order.service');

class OrderController{
    static async createOrder(req,res){
        try{
            const data = req.body;

            if (!data.user_name || !data.user_email) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Nome ou email incompleto' 
                });
            }

            if (!data.address || !data.city || !data.state || !data.postal_code) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Endereço incompleto' 
                });
            }

            if (!data.payment_method){
                return res.status(400).json({
                    success: false,
                    message: 'Metodo de pagamento invalido',
                })
            }
            if (!data.products || data.products.length === 0 ){
                return res.status(400).json({
                    success: false,
                    message: 'Nenhum produto no pedido',
                })
            }

            const total = data.products.reduce((sum,product) => sum + product.price * product.quantity,0)
            data.total = total
            const result = await OrderService.newOrder(data);
            if (result.success){
                return res.status(201).json({
                    success: true,
                    message: 'Pedido Criado com sucesso',
                });
            }else{
                return res.status(500).json({
                    success: false,
                    message: result.error,
                })
            }
        }catch (error){
            console.error('error to create order:', error);
            return res.status(500).json({error: "Server error"});
        }
    }
}

module.exports = OrderController;