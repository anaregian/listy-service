export const TYPES = {
  IShoppingListRepository: Symbol.for("IRepository<ShoppingListModel>"),
  IShoppingListService: Symbol.for("IService<ShoppingListModel>"),

  IItemRepository: Symbol.for("IRepository<ItemModel>"),
  IItemService: Symbol.for("IService<ItemModel>"),

  ICategoryRepository: Symbol.for("IRepository<CategoryModel>"),
  ICategoryService: Symbol.for("IService<CategoryModel>"),

  IShoppingListItemService: Symbol.for("IAssociationService<ShoppingListModel>"),
  IShoppingListItemRepository: Symbol.for("IAssociationRepository<ShoppingListModel>"),

  IVendorRepository: Symbol.for("IRepository<VendorModel>"),
  IVendorService: Symbol.for("IService<VendorModel>"),

  IVendorItemPriceService: Symbol.for("IAssociationService<ItemModel>"),
  IVendorItemPriceRepository: Symbol.for("IAssociationRepository<ItemModel>"),

  IUnitRepository: Symbol.for("IRepository<UnitModel>"),
  IUnitService: Symbol.for("IService<UnitModel>")
};
