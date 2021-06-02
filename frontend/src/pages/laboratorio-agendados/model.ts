interface IBaseModel {
  id: string;
  created?: number;
  updated?: number;
};

export interface IBloco extends IBaseModel {
  nome: string;
};

export interface ILaboratorio extends IBaseModel {
  nome: string;
  numero: number;
};

export interface IAgendamentoModel extends IBaseModel {
  usuarioId: string;
  data: number;
  horarioInicio: number;
  horarioFim: number;

  bloco: IBloco;
  laboratorio: ILaboratorio;
};