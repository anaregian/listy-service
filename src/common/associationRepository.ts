export interface IAssociationRepository {
  create: (data: any) => Promise<void>;
  update: (data: any) => Promise<void>;
  delete: (data: any) => Promise<void>;
}
