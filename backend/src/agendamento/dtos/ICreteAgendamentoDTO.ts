import { Laboratorio, Bloco } from "../infra/firebase/entities/Agendamento";

export default interface ICreteAgendamentoDTO {
  bloco: Bloco,
  laboratorio: Laboratorio,
  data: number,
  horarioInicio: number,
  horarioFim: number,
};
