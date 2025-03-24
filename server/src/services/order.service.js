const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderService{
    static async newOrder(data){
        try{
            const order = await prisma.order.create({
                data: {
                    user_name: data.user_name,
                    user_email: data.user_email,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    postal_code: data.postal_code,
                    payment_method: data.payment_method,
                    total: data.total,
                    products: {
                        create: data.products.map(product => ({
                            productId: product.id,
                            quantity: product.quantity,
                            price: product.price,
                        })),
                    },
                }
            });
            for (const product of data.products){
                await prisma.product.update({
                    where: {id: product.id},
                    data: {stock: {decrement: product.quantity}},
                });
            }
            return {success: true,order};
        }catch(error){
            console.error('Error to create new order: ',error);
        }finally{
            await prisma.$disconnect
        }
    }
}

module.exports = OrderService