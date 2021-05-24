import AppError from "../../shared/erros";
import Usuario from "../infra/firebase/entities/Usuario";
import FakeUsuariosRepository from "../repositories/fakes/FakesUsuariosRepository";
import AuhenticateUsuarioService from "./AuthenticationUsuarioService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let auhenticateUsuarioService: AuhenticateUsuarioService;
let usuarioAgendamentoService: UsuarioAgendamentoService;

describe('Listagem de agendamentos de usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    auhenticateUsuarioService = new AuhenticateUsuarioService(fakeUsuariosRepository);
  });

  it('Usuário não cadastrado.', async () => {
    const usuario: Usuario = { id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] };
    await fakeUsuariosRepository.CreateAsync(usuario);

    await expect(usuarioAgendamentoService.ExecuteAsync({ email: 'errado@errado.com' })).toBe(Agendamento[]));
  });
});
