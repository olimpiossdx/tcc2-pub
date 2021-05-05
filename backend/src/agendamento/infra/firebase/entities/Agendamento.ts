class Bloco {
  id: string;
  nome: string;
  numero: string;
};

class Laboratorio {
  id: string;
  nome: string;
  numero: string;
};

class Agendamento {
  id: string;
  horarioInicio: string;
  horarioFim: string;
  data: string;
  
  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;