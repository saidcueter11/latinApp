import {Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Observable, of} from "rxjs";
import {UserModel} from "../../models/user";
import {FavoriteModel} from "../../models/favorite";

@Injectable({
  providedIn: 'root'
})
export class DALService {
  private db: any = null;

  constructor(private database: DatabaseService) {
    this.db = this.database.db;
  }

  private static errorHandler(error: string): any {
    console.error("Error: " + error);
  }

  public getUserByUserPass(username: string, pass: string): Promise<any> {
    let options = [username, pass];
    let user: UserModel;
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM users WHERE user=? and pass = ?;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            user = UserModel.fromValues(row['userId'], row['name'], row['user'], row['pass'], row['creationDate']);
            resolve(user);
          } else {
            reject("No user found");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Login transaction successful');
      });
    });
  }


  public getFavoritesByUserId(userId: number): Promise<any> {
    let options = [userId];
    let user: UserModel;
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM favorites f INNER JOIN categories c ON c.categoryId = f.categoryId WHERE userId=?;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            resolve(results.rows);
          } else {
            reject("No favorites found for user");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Login transaction successful');
      });
    });
  }

  public getFavoritesPostsByUserId(userId: number): Promise<any> {
    let options = [userId, userId];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName, " +
          " COUNT(CASE WHEN l.type = 1 THEN 1  END) as likes, " +
          " COUNT(CASE WHEN l.type = 0 THEN 1  END) as dislikes," +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END)as userLikesIt" +
          " FROM posts p INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " WHERE p.categoryId IN (SELECT categoryId FROM favorites WHERE userId=? )" +
          " GROUP BY p.postId;"
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0 && results.rows[0].postId != null) {
            resolve(results.rows);
          } else {
            reject("No favorites posts found for user");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Login transaction successful');
      });
    });
  }

  public getPostsByUserId(userId: number): Promise<any> {
    let options = [userId, userId];
    console.log({options})
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName," +
          " COUNT(CASE WHEN l.type = 1 THEN 1 END) as likes, " +
          "COUNT(CASE WHEN l.type = 0 THEN 1 END) as dislikes," +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END) as userLikesIt" +
          " FROM posts p " +
          " INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " WHERE p.userId=? " +
          " GROUP BY p.postId;"
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          console.log(results.rows)
          if (results.rows.length > 0 && results.rows[0].postId != null) {
            resolve(results.rows);
          } else {
            reject("No posts found for user");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Post By UserId transaction successful');
      });
    });
  }

  public getPosts(userId: number): Promise<any> {
    let options = [userId];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName, " +
          " COUNT(CASE WHEN l.type = 1 THEN 1  END) as likes, " +
          " COUNT(CASE WHEN l.type = 0 THEN 1  END) as dislikes," +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END)as userLikesIt" +
          " FROM posts p " +
          " INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " GROUP BY p.postId" +
          " ORDER BY postId desc;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0 && results.rows[0].postId != null) {
            resolve(results.rows);
          } else {
            reject("No posts at all");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: Get all Post transaction successful');
      });
    });
  }


  public getPostsByCategoryId(cateogryId: number, userId: number): Promise<any> {
    let options = [userId, cateogryId];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName, " +
          "COUNT(CASE WHEN l.type = 1 THEN 1 END) as likes, " +
          "COUNT(CASE WHEN l.type = 0 THEN 1 END) as dislikes,  " +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END)as userLikesIt" +
          " FROM posts p " +
          " INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " GROUP BY p.postId" +
          " WHERE p.categoryId=? ;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0 && results.rows[0].postId != null) {
            resolve(results.rows);
          } else {
            reject("No posts found for this category");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Post By UserId transaction successful');
      });
    });
  }

  public getCategories(): Promise<any> {
    let options: [] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM categories;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            resolve(results.rows);
          } else {
            reject("No categories found");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Post By UserId transaction successful');
      });
    });
  }


  public getCommentsByPostId(postId: number): Promise<any> {
    let options = [postId];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT c.*, u.name as userName " +
          " FROM comments c " +
          " INNER JOIN users u ON u.userId = c.userId" +
          " INNER JOIN posts p ON p.postId = c.postId" +
          " WHERE p.postId=? ;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            resolve(results.rows);
          } else {
            reject("No posts found for user");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User Post By UserId transaction successful');
      });
    });
  }

  public setLike(type: number, postId: number, userId: number, hasLike: boolean): Promise<any> {
    let options: any = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "";
        if (type != null) {
          let today: any = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          if (!hasLike) {
            options = [type, postId, userId];
            sql = `INSERT INTO likes (type,postId,userId,creationDate) VALUES (?,?,?,"${dd}/${mm}/${yyyy}");`;
          } else {
            options = [type, postId, userId];
            sql = `UPDATE likes SET type = ? , creationDate = "${dd}/${mm}/${yyyy}" WHERE postId=? AND userId=?;`;

          }
        } else {
          options = [postId, userId];
          sql = "DELETE FROM likes WHERE  postId=? AND userId = ?;";
        }

        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results) {
            resolve(true);
          } else {
            reject("No like was found for user");
          }
        }, DALService.errorHandler);
      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: Likes transaction successful');
      });
    });
  }

  public registerUser(user: UserModel): Promise<any> {

    let options: any = [];
    return new Promise((resolve, reject) => {


      function txFunction(tx: any) {

        let today: any = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        user.creationDate = `${dd}/${mm}/${yyyy}`;
        options = [user.user];
        let options2 = [user.name, user.user, user.pass, user.creationDate];

        let sqlExist = `SELECT * FROM users WHERE user=?`;
        tx.executeSql(sqlExist, options, (tx: any, res: any) => {

          if (res.rows.length == 0) {
            let sql = `INSERT INTO users (name,user,pass,creationDate) VALUES (?,?,?,?)`;

            tx.executeSql(sql, options2, (tx: any, results: { rows: string | any[]; }) => {
              tx.executeSql(sqlExist, options, (tx: any, res: any) => {
                user = res.rows[0];
                options=[user.userId,user.userId,user.userId];
                tx.executeSql("INSERT INTO favorites(userId,categoryId) VALUES (?,1),(?,2),(?,3)", options, () => {
                  resolve(res.rows[0]);
                });
              });


            }, DALService.errorHandler);
          } else {
            reject("The username has been already taken. ");
          }


        }, DALService.errorHandler);


      }

      this.db.transaction(txFunction, DALService.errorHandler, () => {
        console.log('Success: User registration successful');
      });
    });
  }


}
