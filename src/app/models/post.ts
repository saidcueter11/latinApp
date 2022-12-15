export class PostModel {

  static fromValues (
    postId: number,
    userId: number,
    categoryId: number,
    title: string,
    phone: string,
    email: string,
    description: string,
    urlImage: string,
    openDate: string,
    closeDate: string,
    creationDate: string,
    userLikesIt: number,
    likes: number,
    dislikes: number
  ): PostModel {
    var model = new PostModel();
    model.postId = postId;
    model.userId = userId;
    model.categoryId = categoryId;
    model.title = title
    model.phone = phone;
    model.email = email;
    model.description = description;
    model.urlImage = urlImage;
    model.openDate = openDate;
    model.closeDate = closeDate;
    model.creationDate = creationDate;
    model.userLikesIt = userLikesIt;
    model.likes = likes
    model.dislikes = dislikes
    return model;
  }



  postId: number = 0
  userId: number = 0
  categoryId: number = 0
  phone: string = ""
  title: string = ""
  email: string = ""
  description: string = ""
  urlImage: string = ""
  openDate: string = ""
  closeDate: string = ""
  creationDate: string = ""
  category: string = ""
  userName: string = ""
  userLikesIt: number = 0
  likes: number = 0
  dislikes: number = 0
}
