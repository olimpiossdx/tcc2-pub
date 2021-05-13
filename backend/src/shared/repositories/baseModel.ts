//TODO: definição de campos de model base
class BaseModel  extends database.Reference{
  id:string;
  created:Date;
  updated:Date;
};

export default BaseModel;
