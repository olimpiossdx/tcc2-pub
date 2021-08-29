export interface IParametroAgendamento {
  id: string;
  periodo: number;
};

export default class AgendamentoModel {
  id?: string;
  idUsuario?: string;
  dataInicio: string = '';
  dataFim: string = '';
  blocoNome: string = '';
  blocoNumero: number = 0;
  laboratorioNome: string = '';
  laboratorioNumero: number = 0;
};