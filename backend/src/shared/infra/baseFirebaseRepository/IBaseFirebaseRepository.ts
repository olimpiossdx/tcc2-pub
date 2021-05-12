export default interface IBaseFirebaseRepository {
  GetAsync<T>(orderBy: string): Promise<T[]>;
  GetByIdAsync<T>(id: string, orderBy: string): Promise<T | undefined>;
  CreateOrUpdateAsync<T>(id: string, model: T): Promise<T>;
  DeleteAsync<T>(id: string, model: T): Promise<void>;
}
