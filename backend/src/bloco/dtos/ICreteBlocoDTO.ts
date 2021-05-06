interface ILaboratorio {
  nome: string,
  numero: number
};

export default interface ICreteBlocoDTO {
  nome: string,
  laboratorios: ILaboratorio[]
};