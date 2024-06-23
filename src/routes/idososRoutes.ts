import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const idososRoutes = Router();

idososRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const sqlQuery = `
            select nome, ag.idoso_id from idosos id
            left JOIN agenda ag
            on id.id = ag.id
        `;

        const result = await knex.raw(sqlQuery);
        res.json(result[0]);
    } catch (error) {
        console.error('Erro ao buscar nomes dos idosos:', error);
        res.status(500).send('Erro ao buscar nomes dos idosos');
    }
});

export default idososRoutes;
