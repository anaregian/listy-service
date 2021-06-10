export const TYPES = {
  IShoppingListRepository: Symbol.for("IRepository<ShoppingListModel, ShoppingListDto"),
  IShoppingListService: Symbol.for("IService<ShoppingListModel, ShoppingListDto>"),
  IShoppingListValidator: Symbol.for("IValidator<ShoppingListDto>"),

  IItemRepository: Symbol.for("IRepository<ItemModel, ItemDto>"),
  IItemService: Symbol.for("IService<ItemModel, ItemDto>"),
  IItemValidator: Symbol.for("IValidator<ItemDto>"),

  ICategoryRepository: Symbol.for("IRepository<CategoryModel, CategoryDto>"),
  ICategoryService: Symbol.for("IService<CategoryModel, CategoryDto>"),
  ICategoryValidator: Symbol.for("IValidator<CategoryDto>"),

  IShoppingListItemService: Symbol.for("IAssociationService<ShoppingListItemModel, ShoppingListItemDto>"),
  IShoppingListItemRepository: Symbol.for("IAssociationRepository<ShoppingListItemModel, ShoppingListItemDto>"),
  IShoppingListItemValidator: Symbol.for("IValidator<ShoppingListItemDto>"),

  IVendorRepository: Symbol.for("IRepository<VendorModel, VendorDto>"),
  IVendorService: Symbol.for("IService<VendorModel, VendorDto>"),
  IVendorValidator: Symbol.for("IValidator<VendorDto>"),

  IVendorItemPriceService: Symbol.for("IAssociationService<VendorItemPriceModel, VendorItemPriceDto>"),
  IVendorItemPriceRepository: Symbol.for("IAssociationRepository<VendorItemPriceModel, VendorItemPriceDto>"),
  IVendorItemPriceValidator: Symbol.for("IValidator<VendorItemPriceDto>"),

  IUnitRepository: Symbol.for("IRepository<UnitModel, UnitDto>"),
  IUnitService: Symbol.for("IService<UnitModel, UnitDto>"),
  IUnitValidator: Symbol.for("IValidator<UnitDto>")
};
