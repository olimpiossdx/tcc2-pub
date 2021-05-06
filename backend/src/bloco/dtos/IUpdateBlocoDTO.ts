import { Laboratorio } from "../infra/firebase/entities/Bloco";

export default interface IUpdateBlocoDTO {
  id: string;
  nome: string,
  laboratorios: Laboratorio[]
};