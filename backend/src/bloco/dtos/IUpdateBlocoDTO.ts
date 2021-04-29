export default interface ICreteBlocoDTO {
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