import Agendamento from '../../agendamento/infra/firebase/entities/Agendamento';
import ICreteUsuarioDTO from '../dtos/ICreteUsuarioDTO';
import Usuario from '../infra/firebase/entities/Usuario';
import IBaseRepository from '../../shared/service/IBaseRepository';

export default interface IUsuariosRepository extends IBaseRepository {
  FindByAuthIdAsync(authId: string): Promise<Usuario | undefined>;
  FindByEmailAsync(email: string): Promise<Usuario | undefined>;
  IsUnicKeyAsync(acessKey: string): Promise<boolean>;
  CreateAsync(data: ICreteUsuarioDTO): Promise<void>;
  UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void>;
  AddOrUpdateAgendamentoAsync(id: string, agendamento: Agendamento): Promise<void>;
};
