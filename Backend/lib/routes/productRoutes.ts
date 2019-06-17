import { ProductController } from '../controllers/productController';

export class ProductRoutes {
  public productController = new ProductController();

  public routes(app): void {
    app.route('/product')
    // GET endpoint (all products)
    .get(this.productController.getProducts)
    // POST endpoint (new product)
    .post(this.productController.addNewProduct);

    app.route('/product/:productId')
    // GET endpoint (specific product)
    .get(this.productController.getProductById)
    // PUT endpoint (update product)
    .put(this.productController.updateProduct)
    // DELETE endpoint (delete product)
    .delete(this.productController.deleteProduct)
  }
}