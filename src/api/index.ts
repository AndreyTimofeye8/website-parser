import { Router } from 'express';
import documentRoute from './document.route';

const router = Router();

router.use('/documents', documentRoute);

export default router;
