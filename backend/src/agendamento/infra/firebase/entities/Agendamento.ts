export class Bloco {
  id: string;
  nome: string;
};

export class Laboratorio {
  id: string;
  nome: string;
  numero: number;
};

class Agendamento {
  id: string;
  horarioInicio: number;
  horarioFim: number;
  data: number;
  
  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;