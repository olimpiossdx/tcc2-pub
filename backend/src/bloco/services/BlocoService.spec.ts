import AppError from '../../shared/erros';
import Usuario from '../infra/firebase/entities/Bloco';
import FakeBlocoRepository from '../repositories/fakes/FakeBlocoRepository';
import CreateBlocoService from './CreateBlocoService';
import UpdateBlocoService from './UpdateBlocoService';

let fakeUsuariosRepository: FakeBlocoRepository;
let createUsuarioService: CreateBlocoService;
let updateUsuarioAccessKeyService: UpdateBlocoService;

//TODO: alterar paras regras de BLOCO

describe('Atualizar bloco(s)', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeBlocoRepository();
    createUsuarioService = new CreateBlocoService(fakeUsuariosRepository);
    updateUsuarioAccessKeyService = new UpdateBlocoService(fakeUsuariosRepository);
  });

  it('Bloco(s) atualizado com sucesso.', async () => {
    const { id, email, ...rest }: Usuario = { id: '1425368188', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' };

    await createUsuarioService.ExecuteAsync({ ...rest, id, email });
    const updateUsuario = await updateUsuarioAccessKeyService.execute({ id, accessKey: 'atulizacao-key' });

    expect(updateUsuario).toEqual(undefined);
  });
});
