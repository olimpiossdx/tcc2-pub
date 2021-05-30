import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../config/firebase.config';
import AppError from '../../erros';
import IBaseRepository from '../../service/IBaseRepository';

export interface objecToArray {
  [key: string]: any;
};

class BaseRepository implements IBaseRepository {
  protected contextDatabaseRef: database.Reference;

  constructor(databaseRef: string) {
    this.contextDatabaseRef = firebaseDatabase.ref(databaseRef);
  };
  
  //TODO: verificar outro modo de retorno
  public async GetAsync<T>(orderBy: string = 'id'): Promise<T[]> {
    const response = await this.contextDatabaseRef.orderByChild(orderBy).get();
    let entities = new Array<T>();

    if (!response.exists()) {
      return entities;
    };

    const entitiesJson = response.val() as objecToArray;

    entities = Object.entries(entitiesJson).map(([prop, value], index) => (entities[index] = value as T));

    return entities;
  };

  public async GetByIdAsync<T>(id: string): Promise<T | undefined> {
    const response = await this.contextDatabaseRef.orderByChild('id').equalTo(id).get();

    if (!response.exists()) {
      return undefined;
    };

    let entity: T = {} as T;
    const entitiesJson = response.val() as objecToArray;

    const hashkey = Object.keys(entitiesJson)[0];
    Object.assign(entity, entitiesJson[hashkey]);

    return entity;
  };

  public async CreateOrUpdateAsync<T>(data: T | any): Promise<T> {
    try {
      await this.contextDatabaseRef.child(data.id).update(data);
    } catch (error) {
      new AppError(error);
    };

    return data;
  };

  public async DeleteAsync<T>(id: string, model: T): Promise<void> {
    try {
      await this.contextDatabaseRef.child(id).update(model);
    } catch (error) {
      new AppError(error);
    };
  };
};

export default BaseRepository;
