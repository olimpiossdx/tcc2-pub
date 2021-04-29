import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import Bloco from '../infra/firebase/entities/Bloco';
import IBlocoRepository from '../repositories/IBlocoRepository';


@injectable()
class CreateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocosRepository: IBlocoRepository) { };

  public async ExecuteAsync({ id, nome, laboratorios }: Bloco): Promise<void> {

    //TODO: alterar paras regras de BLOCO
  };
};

export default CreateBlocoService;