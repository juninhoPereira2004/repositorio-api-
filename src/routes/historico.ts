import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const historicoRoutes = Router();

// GET /historico - Retorna todos os registros de histórico
historicoRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const historico = await knex('historico').select('*');
        res.json(historico);
    } catch (error) {
        console.error('Erro ao listar histórico:', error);
        res.status(500).send('Erro ao listar histórico');
    }
});

// GET /historico/:id - Retorna um registro de histórico específico pelo ID
historicoRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const registro = await knex('historico').where({ id }).first();
        if (registro) {
            res.json(registro);
        } else {
            res.status(404).send('Registro de histórico não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar registro de histórico:', error);
        res.status(500).send('Erro ao buscar registro de histórico');
    }
});

// POST /historico - Cria um novo registro de histórico
historicoRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { idoso_id, vacina_id, data_aplicacao, agente_saude_id } = req.body;
        const novoRegistro = await knex('historico').insert({ idoso_id, vacina_id, data_aplicacao, agente_saude_id }).returning('*');
        res.status(201).json(novoRegistro);
    } catch (error) {
        console.error('Erro ao criar novo registro de histórico:', error);
        res.status(500).send('Erro ao criar novo registro de histórico');
    }
});

// PUT /historico/:id - Atualiza um registro de histórico existente pelo ID
historicoRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const { idoso_id, vacina_id, data_aplicacao, agente_saude_id } = req.body;
        await knex('historico').where({ id }).update({ idoso_id, vacina_id, data_aplicacao, agente_saude_id });
        res.send('Registro de histórico atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar registro de histórico:', error);
        res.status(500).send('Erro ao atualizar registro de histórico');
    }
});

// DELETE /historico/:id - Exclui um registro de histórico pelo ID
historicoRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await knex('historico').where({ id }).del();
        res.send('Registro de histórico excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir registro de histórico:', error);
        res.status(500).send('Erro ao excluir registro de histórico');
    }
});

export default historicoRoutes;
