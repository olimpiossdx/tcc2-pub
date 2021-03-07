export interface IBlocoModel {
  id?: string;
  nome: string;
};

export interface ILaboratorioModel {
  id?: string;
  nome: string;
  isAvailable: boolean;
};

export interface NovoAgendamentoModel {
  id?: string;
  laboratorio: string;
  bloco: string;
  horaInicio: string;
  horaFim: string;
  data: string;
};