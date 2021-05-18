import BaseModel from "../repositories/baseModel";

export default interface IBaseRepository {
  GetAsync<T>(orderBy: string): Promise<T[]>;
  GetByIdAsync<T>(id: string): Promise<T | undefined>;
  CreateOrUpdateAsync<T>(model: T): Promise<T>;
  DeleteAsync<T>(id: string, model: T): Promise<void>;
};
