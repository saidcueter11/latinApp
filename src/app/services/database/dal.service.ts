import { Injectable } from '@angular/core';
import { DatabaseService } from "./database.service";
import { Observable, of } from "rxjs";
import { UserModel } from "../../models/user";
import { FavoriteModel } from "../../models/favorite";

@Injectable({
  providedIn: 'root'
})
export class DALService {
  private db: any = null;

  constructor(private database: DatabaseService) {
    this.db = this.database.db;
  }

  private static errorHandler (error: string): any {
    console.error("Error: " + error);
  }

  public getUserByUserPass (username: string, pass: string): Promise<any> {
    let options = [username, pass];
    let user: UserModel;
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
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


  public getFavoritesByUserId (userId: number): Promise<any> {
    let options = [userId];
    let user: UserModel;
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
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

  public getFavoritesPostsByUserId (userId: number): Promise<any> {
    let options = [userId, userId];
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName, " +
          " COUNT(CASE WHEN l.type = 1 THEN 1  END) as likes, " +
          " COUNT(CASE WHEN l.type = 0 THEN 1  END) as dislikes," +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END)as userLikesIt" +
          " FROM posts p INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " GROUP BY p.postId" +
          " WHERE p.categoryId IN (SELECT categoryId FROM favorites WHERE userId=? );";
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

  public getPostsByUserId (userId: number): Promise<any> {
    let options = [userId, userId];
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
        let sql = "SELECT p.*, c.name as category, u.name as userName," +
          " COUNT(CASE WHEN l.type = 1 THEN 1 END) as likes, " +
          "COUNT(CASE WHEN l.type = 0 THEN 1 END) as dislikes," +
          " (CASE WHEN l.type = 0 AND u.userId = ? THEN 0 WHEN l.type = 1 THEN 1 ELSE null END)as userLikesIt" +
          " FROM posts p " +
          " INNER JOIN categories c ON c.categoryId = p.categoryId " +
          " INNER JOIN users u ON u.userId = p.userId " +
          " LEFT JOIN likes l ON l.postId = p.postId" +
          " GROUP BY p.postId" +
          " WHERE p.userId=? ;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
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

  public getPosts (userId: number): Promise<any> {
    let options = [userId];
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
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


  public getPostsByCategoryId (cateogryId: number, userId: number): Promise<any> {
    let options = [userId, cateogryId];
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
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


  public getCategories (): Promise<any> {
    let options: [] = [];
    return new Promise((resolve, reject) => {
      function txFunction (tx: any) {
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


}
