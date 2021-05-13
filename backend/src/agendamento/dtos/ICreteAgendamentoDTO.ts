import { Laboratorio, Bloco } from "../infra/firebase/entities/Agendamento";

export default interface ICreteAgendamentoDTO {
  id?: string;
  bloco: Bloco,
  laboratorio: Laboratorio,
  data: number,
  horarioInicio: number,
  horarioFim: number,
};
