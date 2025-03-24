const ProductService = require('../services/product.service');

async function main(){
    try{
        console.log('Find and Add products in DB');
        await ProductService.fetchAddProducts();
        console.log('Add successful');
        process.exit(0);
    }catch (error){
        console.error('Error to add Products:',error);
        process.exit(1);
    }
}

main();