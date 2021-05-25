import AppError from "../../shared/erros";
import Usuario from "../infra/firebase/entities/Usuario";
import FakeUsuariosRepository from "../repositories/fakes/FakesUsuariosRepository";
import AuhenticateUsuarioService from "./AuthenticationUsuarioService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let auhenticateUsuarioService: AuhenticateUsuarioService;

describe('Autenticação de usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    auhenticateUsuarioService = new AuhenticateUsuarioService(fakeUsuariosRepository);
  });

  it('Usuário não cadastrado.', async () => {
    await fakeUsuariosRepository.CreateOrUpdateAsync({ id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] });

    await expect(auhenticateUsuarioService.ExecuteAsync({ email: 'errado@errado.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('Usuário auten1ticado com sucesso.', async () => {
    const entity = await fakeUsuariosRepository.CreateOrUpdateAsync<Usuario>({ id: 'teste', nome: 'teste', email: 'teste@teste.com', accessKey: '41526378', urlImg: 'teste', agendamentos: [] });
    const accessKey = await auhenticateUsuarioService.ExecuteAsync({ email: entity.email });

    expect(accessKey).toEqual(entity.accessKey);
  });
});
