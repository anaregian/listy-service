export interface IService<T> {
  getAll: () => Promise<T[]>;
  get: (data: any) => Promise<T>;
  create: (data: any) => Promise<T>;
  update: (data: any) => Promise<T>;
  delete: (data: any) => Promise<void>;
}
