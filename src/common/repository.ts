export interface IRepository<T> {
  getAll: () => Promise<T[]>;
  get: (id: number) => Promise<T>;
  create: (data: any) => Promise<T>;
  update: (data: any) => Promise<T>;
  delete: (data: any) => Promise<void>;
}
