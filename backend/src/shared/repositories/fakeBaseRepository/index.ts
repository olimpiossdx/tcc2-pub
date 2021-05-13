import IBaseRepository from '../../service/IBaseRepository';

export interface objecToArray {
  [key: string]: any;
};

// TODO: criar uma base model com campos base
class FakeBaseRepository<T = any> implements IBaseRepository {
  protected contextDatabase: T[] | any[];

  constructor(databaseRef: string) {
    this.contextDatabase = new Array<T>();
  };

  public async GetAsync<T>(orderBy: string): Promise<T[]> {
    return this.contextDatabase.sort((a, b) => (a.id > b.id ? 1 : -1)) as unknown as T[];
  };

  public async GetByIdAsync<T>(id: string): Promise<T | undefined> {
    return await this.contextDatabase.find(contextEntity => contextEntity.id === id);
  };

  public async CreateOrUpdateAsync<T>(model: T | any): Promise<T> {
    const entityIndex = this.contextDatabase.findIndex(contextEntity => contextEntity.id === model.id);

    if (entityIndex === -1) {
      this.contextDatabase.push(model);
    }
    else {
      this.contextDatabase[entityIndex] = model;
    };

    return model;
  };

  public async DeleteAsync<T>(id: string, model: T | any): Promise<void> {
    const entityIndex = this.contextDatabase.findIndex(contextEntity => contextEntity.id === model.id);
    this.contextDatabase.splice(entityIndex, 1);
  };
};

export default FakeBaseRepository;
