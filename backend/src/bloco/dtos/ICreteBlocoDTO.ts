//TODO: alterar paras regras de BLOCO
export default interface ICreteBlocoDTO {
  blocos: [
    {
      nome: string,
      laboratorios: [
        {
          nome: string,
          numero: number
        }
      ]
    }
  ]
};