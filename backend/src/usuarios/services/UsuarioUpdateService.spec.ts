import AppError from '../../shared/erros';
import Usuario from '../infra/firebase/entities/Usuario';
import FakeUsuariosRepository from '../repositories/fakes/FakesUsuariosRepository';
import CreateUsuarioService from './CreateUsuarioService';
import UpdateUsuarioAccessKeyService from './UpdateUsuarioAccessKeyService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let createUsuarioService: CreateUsuarioService;
let updateUsuarioAccessKeyService: UpdateUsuarioAccessKeyService;

describe('Atualizar usuário', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createUsuarioService = new CreateUsuarioService(fakeUsuariosRepository);
    updateUsuarioAccessKeyService = new UpdateUsuarioAccessKeyService(fakeUsuariosRepository);
  });

  it('Usuário atualizado com sucesso.', async () => {
    const { id, email, ...rest }: Usuario = { id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' };

    await createUsuarioService.ExecuteAsync({ ...rest, id, email });
    const updateUsuario = await updateUsuarioAccessKeyService.execute({ id, accessKey: 'atulizacao-key' });

    expect(updateUsuario).toEqual(undefined);
  });

  it('Erro ao atualizar chave de acesso do usuário.', async () => {
    const { id, email, ...rest }: Usuario = { id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' };

    await createUsuarioService.ExecuteAsync({ ...rest, id, email });

    await expect(updateUsuarioAccessKeyService.execute({ id: 'erro-ao-atualizar', accessKey: 'atulizacao-key' })).rejects.toBeInstanceOf(AppError);
  });
});
