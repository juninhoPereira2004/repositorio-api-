const express = require('express');
const router = express.Router();
const Vacina = require('../models/vacina');

router.get('/', (req, res) => {
  res.send('Servidor Express está rodando!');
});

router.get('/vacinas', async (req, res) => {
  try {
    const vacinas = await Vacina.query();
    res.json(vacinas);
  } catch (error) {
    console.error('Erro ao listar vacinas:', error);
    res.status(500).send('Erro ao listar vacinas');
  }
});

router.get('/vacinas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const vacina = await Vacina.query().findById(id);
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

router.post('/vacinas', async (req, res) => {
  try {
    const { nome, descricao, idade_recomendada, obrigatoria } = req.body;
    const novaVacina = await Vacina.query().insert({ nome, descricao, idade_recomendada, obrigatoria });
    res.status(201).json(novaVacina);
  } catch (error) {
    console.error('Erro ao criar nova vacina:', error);
    res.status(500).send('Erro ao criar nova vacina');
  }
});

router.put('/vacinas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { nome, descricao, idade_recomendada, obrigatoria } = req.body;
    await Vacina.query().findById(id).patch({ nome, descricao, idade_recomendada, obrigatoria });
    res.send('Vacina atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar vacina:', error);
    res.status(500).send('Erro ao atualizar vacina');
  }
});

router.delete('/vacinas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Vacina.query().deleteById(id);
    res.send('Vacina excluída com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir vacina:', error);
    res.status(500).send('Erro ao excluir vacina');
  }
});

module.exports = router;
