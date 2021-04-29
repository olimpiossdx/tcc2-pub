class Laboratorio {
  id: string;
  nome: string;
  numero: number;
};

class Bloco {
  id: string;
  nome: string;
  laboratorios: Laboratorio[];
};

export default Bloco;