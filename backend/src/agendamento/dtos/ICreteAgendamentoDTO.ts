export default interface ICreteAgendamentoDTO {
  bloco: {
    id: string,
    nome: string
    numero: number;
  },
  laboratorio: {
    nome: string;
    numero: string,
  },
  data: string,
  horarioInicio: string,
  horarioFim: string,
};