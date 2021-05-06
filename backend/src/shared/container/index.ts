import { container } from 'tsyringe';

import UsuariosRepository from '../../usuarios/infra/firebase/repositories/UsuariosRepository';
import IUsuariosRepository from '../../usuarios/repositories/IUsuariosRepository';

import IBLocoRepository from '../../bloco/repositories/IBlocoRepository';
import BlocoRepository from '../../bloco/infra/firebase/repositories/BlocoRepository';

container.registerSingleton<IUsuariosRepository>('UsuariosRepository', UsuariosRepository);
container.registerSingleton<IBLocoRepository>('BlocoRepository', BlocoRepository);