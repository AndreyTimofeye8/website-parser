import { Request, Response, NextFunction } from 'express';

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateUrl(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { url } = req.body;

  if (!url) {
    res.status(400).send({ success: false, message: 'Missing URL' });

    return;
  }

  if (!isValidUrl(url)) {
    res.status(400).send({ success: false, message: 'Invalid URL' });

    return;
  }

  next();
}
