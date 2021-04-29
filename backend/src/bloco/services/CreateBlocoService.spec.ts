import AppError from "../../shared/erros";
import FakeBlocoRepository from "../repositories/fakes/FakeBlocoRepository";
import CreateBlocoService from "./CreateBlocoService";

let fakeUsuariosRepository: FakeBlocoRepository;
let createUsuarioService: CreateBlocoService;

//TODO: alterar paras regras de BLOCO

describe('Criar usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeBlocoRepository();
    createUsuarioService = new CreateBlocoService(fakeUsuariosRepository);
  });

  it('Usuário criado com sucesso.', async () => {
    const user = await createUsuarioService.ExecuteAsync({ id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' });

    expect(user).toBe(undefined);
  });

  it('Não é possível criar o mesmo ususário mais de uma vez.', async () => {
    await createUsuarioService.ExecuteAsync({ id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' });

    await expect(createUsuarioService.ExecuteAsync({ id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' })).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar ususário com mesmo cartão de acesso.', async () => {
    await createUsuarioService.ExecuteAsync({ id: '1425368188', nome: 'teste', email: 'teste1@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' });

    await expect(createUsuarioService.ExecuteAsync({ id: '1425368189', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' })).rejects.toBeInstanceOf(AppError);
  });
});
