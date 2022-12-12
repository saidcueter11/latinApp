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

private populateTables(): void {
    function txFunction(tx: any): void {
      let options: string[] = [];

      let users = "INSERT OR IGNORE INTO users (userId,name,user,pass,creationDate) VALUES " +
        "(1,'Jaime Sanchez','jsanchez','12345', '12/02/2022'  )," +
        "(2,'Ruben Munoz','rmunoz','12345', '12/02/2022'  );";

      let categories = 'INSERT OR IGNORE INTO categories (categoryId,name) VALUES ' +
        '(1,"Transportation"),' +
        '(2,"Food") ;';


      tx.executeSql(users, options, () => {console.info("Success: Table users populated");}, DatabaseService.errorHandler);
      tx.executeSql(categories, options, () => {console.info("Success: Table categories populated");}, DatabaseService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseService.errorHandler, () => {console.log("Success: Population transaction successful");});
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
        this.populateTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

}
