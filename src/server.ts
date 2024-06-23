import express,  { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import cors from "cors"

import AppError from "./utils/AppError"

import routes from './routes';
import { ZodError } from 'zod'

const app = express();
app.use(cors())

app.use(express.json());

app.use('/', routes);

app.use((
    error: Error, req: Request,
    res: Response, next: NextFunction
) => {

    if (error instanceof ZodError) {
        return res.status(400)
            .send({
                message: "Erro de validação",
                issues: error.format()
            })
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "Erro",
            message: error.message
        })
    }

    return res.status(500).json({
        status: "erro",
        message: "Lasco"
    })
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log('Express iniciou na porta: ' + PORT);
});
