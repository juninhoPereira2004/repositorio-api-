import { Router, Request, Response } from 'express';
import knex from '../database/knex';

const vacinaRoutes = Router();

vacinaRoutes.get('/', async (req: Request, res: Response) => {
    const vacinas = await knex('vacinas').select('*');
    res.json(vacinas);
});

vacinaRoutes.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const vacina = await knex('vacinas').where({ id }).first();
    if (vacina) {
      res.json(vacina);
    } else {
      res.status(404).send('Vacina não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar vacina:', error);
    res.status(500).send('Erro ao buscar vacina');
  }
});

vacinaRoutes.post('/', async (req: Request, res: Response) => {//ajustar para saber qual campo é obrigatorio
    const { nome, descricao, idade_recomendada, obrigatoria } = req.body;
    const novaVacina = await knex('vacinas').insert({ nome, descricao, idade_recomendada, obrigatoria }).returning('*');
    res.status(201).json(novaVacina);
});

vacinaRoutes.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
    const { nome, descricao, idade_recomendada, obrigatoria } = req.body;
    await knex('vacinas').where({ id }).update({ nome, descricao, idade_recomendada, obrigatoria });
    res.send('Vacina atualizada com sucesso!');
});

vacinaRoutes.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await knex('vacinas').where({ id }).del();
    res.send('Vacina excluída com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir vacina:', error);
    res.status(500).send('Erro ao excluir vacina');
  }
});

export default vacinaRoutes;
