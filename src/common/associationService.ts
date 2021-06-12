import { ServiceResult } from "./serviceResult";

export interface IAssociationService<T, Dto> {
  getAll: (id: number) => Promise<ServiceResult<T[]>>;
  get: (id: number, associationId: number) => Promise<ServiceResult<T>>;
  create: (id: number, associationid: number | null, data: Dto) => Promise<ServiceResult<T>>;
  update: (id: number, associationId: number, data: Dto) => Promise<ServiceResult<T>>;
  delete: (id: number | null, associationId: number | null) => Promise<ServiceResult<boolean>>;
}
