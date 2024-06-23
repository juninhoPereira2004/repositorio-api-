const express = require('express');
const Vacina = require('../models/vacina');
const router = express.Router();

router.post('/vacina', async (req, res) => {
    try {
        const novaVacina = await Vacina.query().insert(req.body);
        res.status(201).json({ message: 'Vacina cadastrada com sucesso', vacina: novaVacina });
    } catch (error) {
        console.error('Erro ao cadastrar vacina:', error);
        res.status(500).json({ message: 'Erro ao cadastrar vacina' });
    }
});

router.put('/vacina/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Vacina.query().findById(id).patch(req.body);
        res.status(200).json({ message: 'Vacina atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar vacina:', error);
        res.status(500).json({ message: 'Erro ao atualizar vacina' });
    }
});

router.delete('/vacina/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Vacina.query().deleteById(id);
        res.status(200).json({ message: 'Vacina excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir vacina:', error);
        res.status(500).json({ message: 'Erro ao excluir vacina' });
    }
});

router.get('/vacinas', async (req, res) => {
    try {
        const vacinas = await Vacina.query();
        res.json(vacinas);
    } catch (error) {
        console.error('Erro ao listar vacinas:', error);
        res.status(500).json({ message: 'Erro ao listar vacinas' });
    }
});

module.exports = router;