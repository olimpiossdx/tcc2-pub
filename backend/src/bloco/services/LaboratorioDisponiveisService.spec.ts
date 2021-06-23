import FakeAgendamentoRepository from '../../agendamento/repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from '../../agendamento/services/CreateAgendamentoService';
import FakeParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import CreateParametroPeriodoAgendamentoService from '../../parametro-periodo-agendamento/services/CreateParametroPeriodoAgendamentoService';
import FakeUsuariosRepository from '../../usuarios/repositories/fakes/FakesUsuariosRepository';
import CreateUsuarioService from '../../usuarios/services/CreateUsuarioService';
import FakeBlocoRepository from '../repositories/fakes/FakeBlocoRepository';
import CreateBlocoService from './CreateBlocoService';
import BlocoLaboratorioDisponiveisService from './LaboratorioDisponiveisService';

let fakeBlocoRepository: FakeBlocoRepository;
let fakeAgendamentoRepository: FakeAgendamentoRepository;
let fakeParametroAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let fakeUsuariosRepository: FakeUsuariosRepository

let createBlocoService: CreateBlocoService;
let createParametroPeriodoAgendamentoServeice: CreateParametroPeriodoAgendamentoService;
let createAgendamentoService: CreateAgendamentoService;
let createUsuarioService: CreateUsuarioService;
let blocoLaboratorioDisponiveisService: BlocoLaboratorioDisponiveisService;

describe('Laboratórios disponíveis', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeBlocoRepository = new FakeBlocoRepository();
    fakeAgendamentoRepository = new FakeAgendamentoRepository();
    fakeParametroAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();

    createUsuarioService = new CreateUsuarioService(fakeUsuariosRepository);
    createBlocoService = new CreateBlocoService(fakeBlocoRepository);
    createParametroPeriodoAgendamentoServeice = new CreateParametroPeriodoAgendamentoService(fakeParametroAgendamentoRepository);
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository, fakeParametroAgendamentoRepository, fakeUsuariosRepository);
    blocoLaboratorioDisponiveisService = new BlocoLaboratorioDisponiveisService(fakeBlocoRepository, fakeAgendamentoRepository, fakeParametroAgendamentoRepository);

  });

  it('Laboratórios disponíveis com sucesso.', async () => {
    await createUsuarioService.ExecuteAsync({ id: 'teste-usuario', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' });
    await createParametroPeriodoAgendamentoServeice.ExecuteAsync({ periodo: 50, horarioInicio: new Date(2021, 5, 10, 8), horarioFim: new Date(2021, 5, 10, 23, 0) });

    const entityBloco = await createBlocoService.ExecuteAsync({
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    });

    const entities = await blocoLaboratorioDisponiveisService.ExecuteAsync({ blocoId: entityBloco.id, laboratorioId: entityBloco.laboratorios[0].id, data: new Date(2021, 5, 10, 23, 0).toString() });
    expect(entities.length).toBeLessThan(19);
  });

  // it('Não é possível listar laboratórios disponíveis sem parâmetro', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: [{
  //       nome: 'teste-laboratorio',
  //       numero: 1
  //     }]
  //   };

  //   await createBlocoService.ExecuteAsync(bloco);

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });

  // it('Não é possível listar laboratórios disponíveis sem bloco.', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: []
  //   };

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });

  // it('Não é possível listar laboratórios disponíveis sem laboratório.', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: []
  //   };

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });
});
