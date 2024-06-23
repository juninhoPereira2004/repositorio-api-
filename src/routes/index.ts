import { Router, Request, Response } from 'express';

import vacinaRoutes from './vacina';
import idosoRoutes from './idoso';
import agendaRoutes from './agenda';
import agenteSaudeRoutes from './agenteSaude';
import historicoRoutes from './historico';
import agendamentoRoutes from './agendamentoRoutes';
import idososRoutes from './idososRoutes';


const routes = Router();

routes.use('/vacinas', vacinaRoutes);
routes.use('/idosos', idosoRoutes);
routes.use('/agenda', agendaRoutes);
routes.use('/agenteSaude', agenteSaudeRoutes);
routes.use('/historico', historicoRoutes);
routes.use('/agendamentoRoutes', agendamentoRoutes);
routes.use('/idososRoutes', idososRoutes);


export default routes;
