import { Request, Response, NextFunction } from 'express';
import firebase, { FirebaseError } from 'firebase-admin';
import { firebaseAdminInstance } from '../../../../config/firebase.config';
import AppError from '../../../../shared/erros';

export default async function ensureAuthenticatedAsync(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  const [, token] = authHeader.split(' ');
  try {

    const decodeToken = await firebaseAdminInstance.auth().verifyIdToken(token) as firebase.auth.DecodedIdToken;
    request.usuario = { id: decodeToken.uid, email: decodeToken?.email as string };
    return next();
    
  } catch (error) {
    //TODO: padronizar formatação de erros
    const { code, message } = error as FirebaseError;
    console.error(`\n error code: ${code}\n message: ${message}\ndata : ${new Date()}\n`);
    throw new AppError('Token expirado, por logue novamente.', 401);
  }
}
