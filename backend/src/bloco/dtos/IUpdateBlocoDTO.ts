export default interface IUpdateBlocoDTO {
  blocos: [
    {
      id: string;
      nome: string,
      laboratorios: [
        {
          id?: string,
          nome: string,
          numero: number
        }
      ]
    }
  ]
};