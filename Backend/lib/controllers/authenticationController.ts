import { Request, Response } from 'express';

import UserAccount from "../models/userAccountModel";

export class AuthenticationController {

  public registerUserAccount(req: Request, res: Response) {

    
    let newUserAcoount = new UserAccount(req.body)
  }

  public addNewProduct (req: Request, res: Response) {
    let newProduct = new Product(req.body);

    newProduct.save((err, product) => {
      if(err) {
        res.send(err);
      }
      res.json(product);
    });
  }

  public getProductById (req: Request, res: Response) {
    Product.findById(req.params.productId, (err, product) => {
      if(err) {
        res.send(err);
      }
      res.json(product);
    });
  }

  public updateProduct (req: Request, res: Response) {
    Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
      if(err) {
        res.send(err);
      }
      res.json(product);
    });
  }

  public deleteProduct (req: Request, res: Response) {
    Product.remove({ _id: req.params.productId }, (err, product) => {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    })
  }
}