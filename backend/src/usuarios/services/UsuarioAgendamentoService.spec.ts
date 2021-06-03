import AppError from "../../shared/erros";
import Usuario from "../infra/firebase/entities/Usuario";
import FakeUsuariosRepository from "../repositories/fakes/FakesUsuariosRepository";
import AuhenticateUsuarioService from "./AuthenticationUsuarioService";
import UsuarioAgendamentoService from "./UsuarioAgendamentoService";

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
});
