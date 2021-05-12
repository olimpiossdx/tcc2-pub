import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../config/firebase.config';
import IBaseFirebaseRepository from './IBaseFirebaseRepository';

export interface objecToArray {
  [key: string]: any;
};


class BaseFirebaseRepository implements IBaseFirebaseRepository {
  protected contextDatabaseRef: database.Reference;

  constructor(databaseRef: string) {
    this.contextDatabaseRef = firebaseDatabase.ref(databaseRef);
  };

  public async GetAsync<T>(orderBy: string = 'id'): Promise<T[]> {
    const response = await this.contextDatabaseRef.orderByChild(orderBy).get();
    let modelTs = new Array<T>();

    if (response.exists()) {
      const modelTsJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(modelTsJson)[0];
      Object.assign(modelTs, modelTsJson[hashkey]);
    }

    return modelTs;
  };

  public async GetByIdAsync<T>(id: string, orderBy: string = 'id'): Promise<T | undefined> {
    const response = await this.contextDatabaseRef.orderByChild(orderBy).get();

    if (!response.exists()) {
      return undefined;
    }

    let modelT: T = {} as T;
    const modelTJson = response.toJSON() as objecToArray;
    
    const hashkey = Object.keys(modelTJson)[0];
    Object.assign(modelT, modelTJson[hashkey]);

    return modelT;
  };

  public async CreateOrUpdateAsync<T>(id: string, data: T): Promise<T> {
    await this.contextDatabaseRef.child(id).update(data);
    return data;
  };

  public async DeleteAsync<T>(id: string, model: T): Promise<void> {
    await this.contextDatabaseRef.child(id).update(model);
  };
};

export default BaseFirebaseRepository;
