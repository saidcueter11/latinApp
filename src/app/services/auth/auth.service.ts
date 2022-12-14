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
  private _user: UserModel;

  constructor(private dbContext: DALService) {
    this.readToken();
  }

  get user(): UserModel {
    return this._user;
  }

  logout() {
    localStorage.removeItem("token");
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
        this._user = user;
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
      this.dbContext.getPostsByUserId(2).then((favorites: FavoriteModel[]) => {

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

  readToken() {
    return this.token = localStorage.getItem("token") || "";
  }

  isLoggedIn(): boolean {
    return this.token.length > 0
  }


}
