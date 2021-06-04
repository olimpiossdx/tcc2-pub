import Agendamento from '../../agendamento/infra/firebase/entities/Agendamento';
import AppError from '../../shared/erros';
import Usuario from '../infra/firebase/entities/Usuario';
import FakeUsuariosRepository from '../repositories/fakes/FakesUsuariosRepository';
import UsuarioAgendamentoService from './UsuarioAgendamentoService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let usuarioAgendamentoService: UsuarioAgendamentoService;

describe('Listagem de agendamentos de usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    usuarioAgendamentoService = new UsuarioAgendamentoService(fakeUsuariosRepository);
  });

  it('Usuário não cadastrado.', async () => {
    const usuario = Object.assign({ id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] }, new Usuario());
    await fakeUsuariosRepository.CreateOrUpdateAsync(usuario);

    await expect(usuarioAgendamentoService.ExecuteAsync('id-teste')).rejects.toBeInstanceOf(AppError);
  });


  it('Usuário sem agendamentos cadastrados.', async () => {
    const usuario = Object.assign({ id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste' }, new Usuario());
    usuario.agendamentos = undefined;
    await fakeUsuariosRepository.CreateOrUpdateAsync(usuario);
    const entity = await usuarioAgendamentoService.ExecuteAsync('teste');

    expect(entity).toMatchObject(new Array<Agendamento>());
  });
});
