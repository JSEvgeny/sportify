import {Request, Response} from 'express';

export class IndexRoute {
  public route(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).json({
        message: "Hello I'm JSON!"
      })
    })
  }
}