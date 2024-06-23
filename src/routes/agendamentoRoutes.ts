import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const agendamentoRoutes = Router();

agendamentoRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const sqlQuery = `
          SELECT
                        id.id, ag.idoso_id, ags.nome AS nome_agente,
                        DATE_FORMAT(ag.data_agendada, '%Y-%m-%d') AS dia,
                        TIME(ag.data_agendada) AS disponibilidade,
                        va.nome AS nome_vacina
                    FROM
                        agentesaude ags
                    LEFT JOIN
                        agenda ag ON ags.id = ag.id
                    LEFT JOIN
                        vacinas va ON ag.id = va.id
                    LEFT JOIN
                    	idosos id ON va.id = id.id
        `;

        const result = await knex.raw(sqlQuery);
        res.json(result[0]);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).send('Erro ao buscar agendamentos');
    }
});

export default agendamentoRoutes;
