import { Router, Request, Response } from 'express';
import { generatePdfFromUrl } from '../services/documents.service';
import { validateUrl } from '../middleware/url.validator';

const router = Router();

router.post(
  '/pdf',
  validateUrl,
  async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    try {
      res.setHeader('Content-Type', 'application/pdf');

      await generatePdfFromUrl(url, res);
    } catch (err) {
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res
        .status(500)
        .send({ success: false, message: 'Failed to generate PDF' });
    }
  }
);

export default router;
