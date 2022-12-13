export class UserModel {

  static fromValues(userId: number, name: string, user: string, pass: string, creationDate: string): UserModel {
    var model = new UserModel();
    model.userId = userId;
    model.name = name;
    model.user = user;
    model.pass = pass;
    model.creationDate = creationDate;

    return model;
  }


  userId: number = 0;
  name: string = "";
  user: string = "";
  pass: string = "";
  creationDate: string = "";
}
