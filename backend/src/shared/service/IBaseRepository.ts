import BaseModel from "../repositories/baseModel";

export default interface IBaseRepository {
  GetAsync<T>(orderBy: string): Promise<T[]>;
  GetByIdAsync<T>(id: string): Promise<T | undefined>;
  CreateOrUpdateAsync<T>(model: BaseModel<T>): Promise<BaseModel<T>>;
  DeleteAsync<T>(id: string, model: BaseModel<T>): Promise<void>;
};
