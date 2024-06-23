import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const agenteSaudeRoutes = Router();

agenteSaudeRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const agentes = await knex('agentesaude').select('*');
        res.json(agentes);
    } catch (error) {
        console.error('Erro ao listar agentes de saúde:', error);
        res.status(500).send('Erro ao listar agentes de saúde');
    }
});

agenteSaudeRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const agente = await knex('agentesaude').where({ id }).first();
        if (agente) {
            res.json(agente);
        } else {
            res.status(404).send('Agente de saúde não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar agente de saúde:', error);
        res.status(500).send('Erro ao buscar agente de saúde');
    }
});

agenteSaudeRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { nome, email, telefone } = req.body;
        const novoAgente = await knex('agentesaude').insert({ nome, email, telefone }).returning('*');
        res.status(201).json(novoAgente);
    } catch (error) {
        console.error('Erro ao criar novo agente de saúde:', error);
        res.status(500).send('Erro ao criar novo agente de saúde');
    }
});

agenteSaudeRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const { nome, email, telefone } = req.body;
        await knex('agentesaude').where({ id }).update({ nome, email, telefone });
        res.send('Agente de saúde atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar agente de saúde:', error);
        res.status(500).send('Erro ao atualizar agente de saúde');
    }
});

agenteSaudeRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await knex('agentesaude').where({ id }).del();
        res.send('Agente de saúde excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir agente de saúde:', error);
        res.status(500).send('Erro ao excluir agente de saúde');
    }
});

export default agenteSaudeRoutes;
