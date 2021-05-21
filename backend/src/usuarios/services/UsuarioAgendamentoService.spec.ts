import AppError from "../../shared/erros";
import Usuario from "../infra/firebase/entities/Usuario";
import FakeUsuariosRepository from "../repositories/fakes/FakesUsuariosRepository";
import AuhenticateUsuarioService from "./AuthenticationUsuarioService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let auhenticateUsuarioService: AuhenticateUsuarioService;
// TODO: alterar para teste de listar agendamentos do usuário
describe('Autenticação de usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    auhenticateUsuarioService = new AuhenticateUsuarioService(fakeUsuariosRepository);
  });

  it('Usuário não cadastrado.', async () => {
    const usuario: Usuario = { id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] };
    await fakeUsuariosRepository.CreateAsync(usuario);

    await expect(auhenticateUsuarioService.ExecuteAsync({ email: 'errado@errado.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('Usuário autenticado com sucesso.', async () => {
    const usuario: Usuario = { id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] };

    fakeUsuariosRepository.CreateAsync(usuario);
    const accessKey = await auhenticateUsuarioService.ExecuteAsync({ email: usuario.email });

    expect(accessKey).toEqual(usuario.accessKey);
  });
});
