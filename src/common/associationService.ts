export interface IAssociationService<T> {
  create: (data: any) => Promise<T>;
  update: (data: any) => Promise<T>;
  delete: (data: any) => Promise<void>;
}
