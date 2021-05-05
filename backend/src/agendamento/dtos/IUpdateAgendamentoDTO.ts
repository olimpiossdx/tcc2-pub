export default interface IUpdateAgendamentoDTO {
  id: string,
  bloco: {
    id: string,
    nome: string
    numero: number;
  },
  laboratorio: {
    id:string;
    nome: string;
    numero: string,
  },
  data: string,
  horarioInicio: string,
  horarioFim: string,
};