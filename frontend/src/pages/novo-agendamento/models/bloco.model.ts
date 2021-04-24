export class LaboratorioModel {
  id: string = '';
  nome: string = '';
  numero: number = 0;
  disponivel?: boolean;
};

export default class BlocoModel {
  id: string = '';
  nome: string = '';
  laboratorios: LaboratorioModel[] = [];
};