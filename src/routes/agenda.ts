import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const agendaRoutes = Router();

// GET /agenda - Retorna todas as agendas
agendaRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const agendas = await knex('agenda').select('*');
        res.json(agendas);
    } catch (error) {
        console.error('Erro ao listar agendas:', error);
        res.status(500).send('Erro ao listar agendas');
    }
});

agendaRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const agenda = await knex('agenda').where({ id }).first();
        if (agenda) {
            res.json(agenda);
        } else {
            res.status(404).send('Agenda não encontrada');
        }
    } catch (error) {
        console.error('Erro ao buscar agenda:', error);
        res.status(500).send('Erro ao buscar agenda');
    }
});

agendaRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { idoso_id, agente_saude_id, vacina_id, data_agendada, realizada } = req.body;
        console.log('Dados recebidos:', req.body);
        const novaAgenda = await knex('agenda').insert({ idoso_id, agente_saude_id, vacina_id, data_agendada, realizada }).returning('*');
        res.status(201).json(novaAgenda);
    } catch (error) {
        console.error('Erro ao criar nova agenda:', error);
        res.status(500).send('Erro ao criar nova agenda');
    }
});

agendaRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const { idoso_id, vacina_id, data_aplicacao } = req.body;
        await knex('agenda').where({ id }).update({ idoso_id, vacina_id, data_aplicacao });
        res.send('Agenda atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar agenda:', error);
        res.status(500).send('Erro ao atualizar agenda');
    }
});

agendaRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await knex('agenda').where({ id }).del();
        res.send('Agenda excluída com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir agenda:', error);
        res.status(500).send('Erro ao excluir agenda');
    }
});

export default agendaRoutes;
