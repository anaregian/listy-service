import { ServiceResult } from "./ServiceResult";

export interface IRepository<T, Dto> {
  getAll: () => Promise<ServiceResult<T[]>>;
  get: (id: number) => Promise<ServiceResult<T>>;
  create: (data: Dto) => Promise<ServiceResult<T>>;
  update: (id: number, data: Dto) => Promise<ServiceResult<T>>;
  delete: (id: number) => Promise<ServiceResult<T>>;
}
