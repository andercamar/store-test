const ProductService = require('../services/product.service');

class ProductController{
    static async getAllProducts(req,res){
        try{
            const products = await ProductService.getAllProducts()
            res.status(200).json(products)
        }catch (error){
            res.status(500).json({message: 'Erro ao buscar os dados'})
        }
    }
}

module.exports = ProductController;