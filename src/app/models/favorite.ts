export class FavoriteModel {

  static fromValues(favoriteId: number, userId: number, categoryId: number): FavoriteModel {
    var model = new FavoriteModel();
    model.userId = userId;
    model.categoryId = categoryId;
    model.favoriteId = favoriteId;

    return model;
  }


  userId: number = 0;
  categoryId: number = 0;
  favoriteId: number = 0;
}
