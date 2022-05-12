import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import * as statusCodes from './constants/statusCodes';
import joiErrors from './resources/middlewares/celebrateErrors';
// import swaggerUI from 'swagger-ui-express';
// import docs from './swagger/v1'
import routes from './resources/routes';
import { connectionHandler } from './resources/middlewares/connection';

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '2mb', extended: true, parameterLimit: 50000 }),
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    return res.status(statusCodes.BAD_REQUEST).json({
      status: statusCodes.BAD_REQUEST,
      accepted: 'PUT, POST, GET, DELETE',
    });
  }
  return next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  connectionHandler(req, next)
})

if (process.env.NODE_ENV === "production") {
  app.use('/api/docs', (req, res, next) => {
    res.status(404).send("Not Found");
  });
}

app.use('/api', routes);

// app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use(joiErrors());

app.use((req: Request, res: Response) => {
  res.status(statusCodes.BAD_REQUEST).json({
    status: statusCodes.BAD_REQUEST,
    message: 'Refer to the document => /api/docs',
  });
});

export default app;
