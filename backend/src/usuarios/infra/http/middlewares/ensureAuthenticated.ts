import { Request, Response, NextFunction } from 'express';
import firebase, { FirebaseError } from 'firebase-admin';
import { admin } from '../../../../config/firebase.config';
import AppError from '../../../../shared/erros';

export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    await admin.auth().verifyIdToken(token) as firebase.auth.DecodedIdToken;
    return next();
  } catch (error) {
    const { code, message } = error as FirebaseError;
    console.error(`\n\n code: ${code}\n message: ${message}\n\n`);
    throw new AppError('Token inválido', 401);
  }
}
