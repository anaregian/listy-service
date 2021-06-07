export const TYPES = {
  IShoppingListService: Symbol.for("IService<ShoppingList, ShoppingListDto>"),
  IShoppingListRepository: Symbol.for("IRepository<ShoppingList, ShoppingListDto"),
  IShoppingListValidator: Symbol.for("IValidator<ShoppingListDto>"),
  IItemService: Symbol.for("IService<Item, ItemDto>"),
  IItemRepository: Symbol.for("IRepository<Item, ItemDto>"),
  IItemValidator: Symbol.for("IValidator<ItemDto>")
};
