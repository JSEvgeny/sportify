import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import { IndexRoute } from './routes/indexRoute';
import { ProductRoutes } from './routes/productRoutes';

class App {

  public app: express.Application;
  public mongoUrl: String = 'mongodb://localhost:32773/';

  public indexRoute: IndexRoute = new IndexRoute();
  public productRoutes: ProductRoutes = new ProductRoutes();

  constructor() {
    this.app = express();
    this.config();    
    this.configMongo();    
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // support routes
    this.indexRoute.route(this.app);
    this.productRoutes.routes(this.app);
    
  }

  private configMongo(): void {
    // create connection to MongoDB instance
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
      .then(() => console.log("Connected to DB"))
      .catch(err => console.log(err));
  }
}

export default new App().app;