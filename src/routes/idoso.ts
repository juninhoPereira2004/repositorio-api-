import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const idosoRoutes = Router();

idosoRoutes.get('/', async (req: Request, res: Response) => {
    const idosos = await knex('idosos').select('*');
    res.json(idosos);
});

idosoRoutes.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const idoso = await knex('idosos').where({ id }).first();
        if (idoso) {
            res.json(idoso);
        } else {
            res.status(404).send('Idoso não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar idoso:', error);
        res.status(500).send('Erro ao buscar idoso');
    }
});

idosoRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { nome, idade, endereco, cidade, telefone } = req.body;
        const novoIdoso = await knex('idosos').insert({ nome, idade, endereco, cidade, telefone }).returning('*');
        res.status(201).json(novoIdoso);
    } catch (error) {
        console.error('Erro ao criar novo idoso:', error);
        res.status(500).send('Erro ao criar novo idoso');
    }
});

idosoRoutes.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const { nome, idade, endereco } = req.body;
        await knex('idosos').where({ id }).update({ nome, idade, endereco });
        res.send('Idoso atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar idoso:', error);
        res.status(500).send('Erro ao atualizar idoso');
    }
});

idosoRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await knex('idosos').where({ id }).del();
        res.send('Idoso excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir idoso:', error);
        res.status(500).send('Erro ao excluir idoso');
    }
});

export default idosoRoutes;
