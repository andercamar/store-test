const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService{
    static async fetchAddProducts(){
        try{
            const response = await axios.get('https://fakestoreapi.com/products');
            for (const product of response.data){
                await prisma.product.create({
                    data: {
                        name: product.title,
                        description: product.description,
                        price: product.price,
                        stock: Math.floor(Math.random() * 100),
                        image_url: product.image,
                    }
                })
            }
        }catch(error){
            console.error('Error to find and add products: ',error);
        } finally{
            await prisma.$disconnect();
        }
    }
    static async clearProducts(){
        try{
            await prisma.product.deleteMany({});
        }catch(error){
            console.error('Error clear products: ',error);
        } finally{
            await prisma.$disconnect();
        }
    }
    static async getAllProducts(){
        try{
            const products = await prisma.product.findMany();
            return products
        }catch(error){
            console.error('Error to get products: ',error);
        }finally{
            await prisma.$disconnect();
        }
    }
}

module.exports = ProductService;