import { Injectable } from '@angular/core';

declare function openDatabase (shortName: string, version: string, displayName: string,
  dbSize: number, dbCreateSuccess: () => void): any;

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  get db (): any {
    return this._db;
  }

  private _db: any = null;

  constructor() {
  }

  private static errorHandler (error: string): any {
    console.error("Error: " + error);
  }

  private createDatabase (): void {
    let shortName = "LatinAppDB";
    let version = "1.0";
    let displayName = "DB for LatingApp";
    let dbSize = 2 * 1024 * 1024;

    this._db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables (): void {
    function txFunction (tx: any): void {
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
        " title VARCHAR(40) NOT NULL," +
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


      tx.executeSql(userTable, options, () => {
        console.info("Success: Table users created");
      }, DatabaseService.errorHandler);
      tx.executeSql(notificationTable, options, () => {
        console.info("Success: Table notification created");
      }, DatabaseService.errorHandler);
      tx.executeSql(categoryTable, options, () => {
        console.info("Success: Table categories created");
      }, DatabaseService.errorHandler);
      tx.executeSql(favoriteTable, options, () => {
        console.info("Success: Table favorites created");
      }, DatabaseService.errorHandler);
      tx.executeSql(postTable, options, () => {
        console.info("Success: Table posts created");
      }, DatabaseService.errorHandler);
      tx.executeSql(commentTable, options, () => {
        console.info("Success: Table comments created");
      }, DatabaseService.errorHandler);
      tx.executeSql(likeTable, options, () => {
        console.info("Success: Table likes created");
      }, DatabaseService.errorHandler);
    }

    this._db.transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  private populateTables (): void {
    function txFunction (tx: any): void {
      let options: string[] = [];

      let users = "INSERT OR IGNORE INTO users (userId,name,user,pass,creationDate) VALUES " +
        "(1,'Jaime Sanchez','jsanchez','12345', '12/02/2022'  )," +
        "(2,'Emmanuel Kawas','ekawas','12345', '12/02/2022'  )," +
        "(3,'Juan Acevedo','jacevedo','12345', '12/02/2022'  )," +
        "(4,'Said Cueter','scueter','12345', '12/02/2022'  )," +
        "(5,'Ruben Munoz','rmunoz','12345', '12/02/2022'  );";

      let notifications = "INSERT OR IGNORE INTO notifications (notificationID,userID,description,creationDate) VALUES " +

        '(1,5, "Someone has commented your post!", "13/12/2022" ),' +
        '(2,4, "Someone has liked your post!", "15/12/2022" ),' +
        '(3,3, "Someone has commented your post!", "15/12/2022" ),' +
        '(4,2, "Someone has commented your post!", "16/12/2022" ),' +
        '(5,1, "Someone has liked your post!", "16/12/2022" ) ;';

      let favorites = "INSERT OR IGNORE INTO favorites (favoriteId,userID,categoryID) VALUES " +
        "(1,5,1 )," +
        "(1,5,2 )," +
        "(1,5,3 )," +
        "(2,4,4 )," +
        "(2,4,5 )," +
        "(2,4,6 )," +
        "(3,3,7 )," +
        "(3,3,8 )," +
        "(3,3,1 )," +
        "(4,2,2 )," +
        "(4,2,3 )," +
        "(4,2,4 )," +
        "(5,1,5 )," +
        "(5,1,6 )," +
        "(5,1,7 );";

      let categories = 'INSERT OR IGNORE INTO categories (categoryId,name) VALUES ' +
        '(1,"Food" ),' +
        '(2,"Transportation" ),' +
        '(3,"Jobs" ),' +
        '(4,"Migration" ),' +
        '(5,"Health" ),' +
        '(6,"Taxes" ),' +
        '(7,"Childcare" ),' +
        '(8,"Others" ) ;';

      let posts = 'INSERT OR IGNORE INTO posts (postId,userId,categoryId,title,phone,email,description,urlImage,openDate,closeDate,creationDate) VALUES ' +

        '(1,1,3, "cualquier cosa",5483335570, "jaime@latinapp.com", "I am looking for a junior web developer to run my new business, please submit a copy of your CV to my email in the given times", "XXXX", "14/12/2022", "16/12/2022", "12/12/2022" ),' +
        '(2,2,1, "cualquier cosa",5482235570, "emmanuel@latinapp.com", "I am selling tacos, burritos, enchiladas, and chilaquiles in Waterloo. Please contact me to the number 5486661247", "XXXX", "20/12/2022", "25/12/2022", "10/12/2022" ),' +
        '(3,3,4, "cualquier cosa",5483335571, "juan@latinapp.com", "I need someone to help me with some pieces of advice about finding a place where I can get my SIN number. Please call me 5483335571", "XXXX", "12/12/2022", "13/12/2022", "12/12/2022" ),' +
        '(4,4,6, "cualquier cosa",5487854422, "said@latinapp.com", "Does anybody know where can I fill mi taxes for 2023?", "XXXX", "15/12/2022", "25/12/2022", "15/12/2022" ),' +
        '(5,5,2, "cualquier cosa",3569867758, "ruben@latinapp.com", "I am planning to travel to my origin country next week. Do you know someone who can take me up there?", "XXXX", "01/01/2023", "27/01/2023", "15/12/2023" ) ;';

      let comments = 'INSERT OR IGNORE INTO comments (commentId,userId,postId,description,creationDate) VALUES ' +

        '(1,4,5, "Call Victor Ramirez to 3212145570 he is a very good person and speaks Spanish too", "12/12/2022" ),' +
        '(1,5,5, "I also called Victor but he did not reply.", "13/12/2022" ),' +
        '(2,1,4, "Call Maria 9856664741, she speaks Spanish and is very good with filling taxes!", "10/12/2022" ),' +
        '(2,2,4, "I need someone too! I am going to try calling Maria to see what happens.", "11/12/2022" ),' +
        '(3,3,3, "I called you but you did not reply. You can go to Service Canada located in King / Frederick Street!", "12/12/2022" ),' +
        '(3,4,3, "What is the difference between Service Canada and Service Ontario?", "13/12/2022" ),' +
        '(4,5,2, "I recommend his fajitas! They are the best in K-W area!", "15/12/2022" ),' +
        '(4,1,2, "I need an order of 40 tacos please!", "15/12/2022" ),' +
        '(5,2,1, "I have a friend of mine about this job offer. Her name is Marta", "16/12/2022" ),' +
        '(5,3,1, "Check with Conestoga´s IT students!", "16/12/2022" ) ;';

      let likes = 'INSERT OR IGNORE INTO likes (likeId,userId,postId,type,creationDate) VALUES ' +

        '(1,2,5,1,"12/12/2022" ),' +
        '(22,2,5,1,"12/12/2022" ),' +
        '(31,2,5,0,"12/12/2022" ),' +
        '(2,4,4,0,"10/12/2022" ),' +
        '(3,1,3,1,"12/12/2022" ),' +
        '(4,3,2,1,"15/12/2022" ),' +
        '(5,2,1,0,"15/12/2022" ) ;';

      tx.executeSql(users, options, () => {
        console.info("Success: Table users populated");
      }, DatabaseService.errorHandler);
      tx.executeSql(notifications, options, () => {
        console.info("Success: Table users populated");
      }, DatabaseService.errorHandler);
      tx.executeSql(favorites, options, () => {
        console.info("Success: Table favorites populated");
      }, DatabaseService.errorHandler);
      tx.executeSql(categories, options, () => {
        console.info("Success: Table categories populated");
      }, DatabaseService.errorHandler);
      tx.executeSql(posts, options, () => {
        console.info("Success: Table posts populated");
      }, DatabaseService.errorHandler);
      tx.executeSql(comments, options, () => {
        console.info("Success: Table comments populated");
      }, DatabaseService.errorHandler)
      tx.executeSql(likes, options, () => {
        console.info("Success: Table likes populated");
      }, DatabaseService.errorHandler);
    }

    this._db.transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Population transaction successful");
    });
  }

  public initDB (): void {
    if (this._db == null) {
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
