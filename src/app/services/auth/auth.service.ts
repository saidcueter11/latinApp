import {Injectable} from '@angular/core';
import {UserModel} from "../../models/user";
import {Observable, of} from "rxjs";
import {DALService} from "../database/dal.service";
import {FavoriteModel} from "../../models/favorite";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;
  public user: UserModel | any;

  constructor(private dbContext: DALService) {
    this.readToken();
    this.readUser();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  login(user: UserModel): Promise<any> {
    let obj: any = null;
    return new Promise((resolve, reject) => {
      this.dbContext.getUserByUserPass(user.user, user.pass).then((user: UserModel) => {
        obj = {
          code: 200,
          status: true,
          message: "Login",
          ...user
        };
        this.saveUser(user);
        this.saveToken(obj.userId.toString())

        resolve(obj);
      }).catch((err) => {

        obj = {
          code: 404,
          status: false,
          message: err
        };
        reject(obj);
      });
    });

  }


  login2(user: UserModel): Promise<any> {
    let obj: any = null;
    return new Promise((resolve, reject) => {
      this.dbContext.setLike(0, 1, 1, true).then((favorites) => {

        console.log(favorites);

        //        resolve(obj);
      }).catch((err) => {

        obj = {
          code: 404,
          status: false,
          message: err
        };
        reject(obj);
      });
    });

  }

  register(user: UserModel) {

  }

  saveToken(idToken: string) {

    this.token = idToken;
    localStorage.setItem("token", idToken);

  }

  saveUser(user: UserModel) {

    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));

  }

  readToken() {
    return this.token = localStorage.getItem("token") || "";
  }

  readUser() {
    return this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  isLoggedIn(): boolean {
    return this.token.length > 0
  }


}
