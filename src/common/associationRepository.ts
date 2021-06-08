import { ServiceResult } from "./ServiceResult";

export interface IAssociationRepository<T, Dto> {
  getAll: (id: number) => Promise<ServiceResult<T[]>>;
  get: (id: number, associationid: number) => Promise<ServiceResult<T>>;
  create: (id: number, associationid: number | null, data: Dto) => Promise<ServiceResult<T>>;
  update: (id: number, associationid: number, data: Dto) => Promise<ServiceResult<T>>;
  delete: (id: number | null, associationid: number | null) => Promise<ServiceResult<boolean>>;
}
