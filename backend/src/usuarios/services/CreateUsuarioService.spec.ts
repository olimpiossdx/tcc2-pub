import AppError from "../../shared/erros";
import FakeUsuariosRepository from "../repositories/fakes/FakesUsuariosRepository";
import CreateUsuarioService from "./CreateUsuarioService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let createUsuarioService: CreateUsuarioService;

describe('Criar usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createUsuarioService = new CreateUsuarioService(fakeUsuariosRepository);
  });

  it('Usuário criado com sucesso.', async () => {
    const user = await createUsuarioService.execute({ id: '1425368188', nome: 'teste', email: 'teste@email.com', acessKey: 'teste-key', urlImg: 'http://teste.com' });

    expect(user).toBe(undefined);
  });

  it('Não é possível criar o mesmo ususário mais de uma vez.', async () => {
    await createUsuarioService.execute({ id: '1425368188', nome: 'teste', email: 'teste@email.com', acessKey: 'teste-key', urlImg: 'http://teste.com' });

    await expect(createUsuarioService.execute({ id: '1425368188', nome: 'teste', email: 'teste@email.com', acessKey: 'teste-key', urlImg: 'http://teste.com' })).rejects.toBeInstanceOf(AppError);
  });
});
