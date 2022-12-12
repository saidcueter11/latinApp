import {Injectable} from '@angular/core';

declare function openDatabase(shortName: string, version: string, displayName: string,
                              dbSize: number, dbCreateSuccess: () => void): any;

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() {
  }

  private static errorHandler(error: string): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "LatinAppDB";
    let version = "1.0";
    let displayName = "DB for LatingApp";
    let dbSize = 2 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {
    function txFunction(tx: any): void {
      let options: string[] = [];
      let userTable: string = "CREATE TABLE IF NOT EXISTS users(" +
        " userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " name VARCHAR(20) NOT NULL," +
        " user VARCHAR(20) NOT NULL," +
        " pass VARCHAR(20) NOT NULL," +
        " creationDate DATETIME NOT NULL);";

      let notificationTable: string = "CREATE TABLE IF NOT EXISTS notifications(" +
        " notificationId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userId INTEGER NOT NULL," +
        " description TEXT NOT NULL," +
        " creationDate DATETIME NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(userId));";

      let categoryTable: string = "CREATE TABLE IF NOT EXISTS categories(" +
        " categoryId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " name VARCHAR(40) NOT NULL);";

      let favoriteTable: string = "CREATE TABLE IF NOT EXISTS favorites(" +
        " favoriteId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userId INTEGER NOT NULL," +
        " categoryId INTEGER NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(userId)," +
        "FOREIGN KEY(categoryId) REFERENCES categories(categoryId));";


      let postTable: string = "CREATE TABLE IF NOT EXISTS posts(" +
        " postId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userId INTEGER NOT NULL," +
        " categoryId INTEGER NOT NULL," +
        " phone VARCHAR(10) NOT NULL," +
        " email VARCHAR(40) NOT NULL," +
        " description TEXT NOT NULL," +
        " urlImage TEXT NOT NULL," +
        " openDate DATETIME NOT NULL," +
        " closeDate DATETIME NOT NULL," +
        " creationDate DATETIME NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(userId)," +
        "FOREIGN KEY(categoryId) REFERENCES categories(categoryId));";

      let commentTable: string = "CREATE TABLE IF NOT EXISTS comments(" +
        " commentId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userId INTEGER NOT NULL," +
        " postId INTEGER NOT NULL," +
        " description TEXT NOT NULL," +
        " creationDate DATETIME NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(userId)," +
        "FOREIGN KEY(postId) REFERENCES posts(postId));";

      let likeTable: string = "CREATE TABLE IF NOT EXISTS likes(" +
        " likeId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " userId INTEGER NOT NULL," +
        " postId INTEGER NOT NULL," +
        " type TINYINT NOT NULL," +
        " creationDate DATETIME NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES users(userId)," +
        "FOREIGN KEY(postId) REFERENCES posts(postId));";


      tx.executeSql(userTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(notificationTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(categoryTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(favoriteTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(postTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(commentTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
      tx.executeSql(likeTable, options, () => {console.info("Success: Table users created");}, DatabaseService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

}
