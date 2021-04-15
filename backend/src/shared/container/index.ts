// Todo: Adicionar importão de repostory e instalar lib
import { container } from 'tsyringe';

import UsuariosRepository from '../../usuarios/infra/firebase/repositories/UsuariosRepository';
import IUsuariosRepository from '../../usuarios/repositories/IUsuariosRepository';

container.registerSingleton<IUsuariosRepository>('UsuariosRepository', UsuariosRepository);