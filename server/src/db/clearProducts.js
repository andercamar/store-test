const ProductService = require('../services/product.service');

async function main(){
    try{
        console.log('Clear products in DB');
        await ProductService.clearProducts();
        console.log('Clear successful');
        process.exit(0);
    }catch (error){
        console.error('Error to add Products:',error);
        process.exit(1);
    }
}

main();