import AppError from '../../shared/erros';
import Usuario from '../infra/firebase/entities/Usuario';
import FakeUsuariosRepository from '../repositories/fakes/FakesUsuariosRepository';
import CreateUsuarioService from './CreateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let createUsuarioService: CreateUsuarioService;

describe('Criar usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createUsuarioService = new CreateUsuarioService(fakeUsuariosRepository);
  });

  it('Usuário criado com sucesso.', async () => {
    const entity = { id: 'teste', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' };

    const newEntity = await createUsuarioService.ExecuteAsync(entity);
    expect(newEntity).toMatchObject(entity);
  });

  it('Não é possível criar o mesmo ususário mais de uma vez.', async () => {
    const entity = Object.assign({ id: 'teste', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' }, new Usuario());

    await createUsuarioService.ExecuteAsync(entity);
    await expect(createUsuarioService.ExecuteAsync(entity)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar ususário com mesmo cartão de acesso.', async () => {
    const entity = Object.assign({ id: 'teste', nome: 'teste', email: 'teste@email.com', accessKey: 'chave-duplicada', urlImg: 'http://teste.com' }, new Usuario());

    await createUsuarioService.ExecuteAsync(entity);
    await expect(createUsuarioService.ExecuteAsync({ ...entity, id: 'chave-duplicada', email: 'teste1@email.com', accessKey: 'chave-duplicada' })).rejects.toBeInstanceOf(AppError);
  });
});
