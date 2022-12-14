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
    let displayName = "DB for LatinApp";
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
        "(5,'Ruben Munoz','rmunoz','12345', '12/02/2022'  )," +
        "(6,'Paula Zambrano','pzambrano','12345', '12/02/2022'  ),"+
        "(7,'Jhonatan Rodriguez' ,'jrodriguez','12345', '12/02/2022'  );";

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

        '(1,1,1, "Yummy burritos!",5482235570, "jaime@latinapp.com", "I am selling tacos, burritos, enchiladas, and chilaquiles in Waterloo. Please contact me.", "XXXX", "19/12/2022", "20/12/2022", "17/12/2022" ),' +
        '(2,2,1, "Ecuatorian menestro",5482235571, "emmanuel@latinapp.com", "I will be prepping Ecuatorian menestro. Anyone interested?", "XXXX", "21/12/2022", "22/12/2022", "20/12/2022" ),' +
        '(3,3,1, "Venezuelan arepas",5482235572, "juan@latinapp.com", "I have a bag of 10 Venezuelan arepas. Who wants them?", "XXXX", "23/12/2022", "24/12/2022", "22/12/2022" ),' +
        '(4,4,1, "Peruvian ceviche",5482235573, "said@latinapp.com", "Peruvian ceviche for your X-mas eve! Contact me.", "XXXX", "25/12/2022", "26/12/2022", "24/12/2022" ),' +
        '(5,5,1, "Colombian envueltos",5482235574, "ruben@latinapp.com", "Original Colombian envueltos prepped with pure corn.", "XXXX", "27/12/2022", "28/12/2022", "26/12/2022" ),' +
        '(6,1,1, "Ecuatorian plantains",5482235575, "jaime@latinapp.com", "My mom brought a lot of Ecuatorian plantains and I am selling them, 1CAD each. Contact me.", "XXXX", "29/12/2022", "30/12/2022", "28/12/2022" ),' +
        '(7,2,1, "Mexican sopes",5482235576, "emmanuel@latinapp.com", "Enjoy your new years eve with mexican sopes. I am in Waterloo, contact me!", "XXXX", "31/12/2022", "01/01/2022", "30/12/2022" ),' +
        '(8,3,1, "Venezuelan papelon",5482235577, "juan@latinapp.com", "Remember my delicious arepas? I am selling now exquisite papelon!", "XXXX", "02/01/2022", "03/01/2022", "01/01/2022" ),' +
        '(9,4,1, "Nicaraguan pupusas",5482235578, "said@latinapp.com", "My Nicaraguan wife has started a new pupusas business. 7 CAD three of them, contact me if you need more info.", "XXXX", "04/01/2022", "05/01/2022", "03/01/2022" ),' +
        '(10,5,1, "Colombian lechona",5482235579, "ruben@latinapp.com", "Me and some friends have in mind to prep Colombian lechona. 13 CAD the plate; anyone interested?", "XXXX", "06/01/2022", "07/01/2022", "05/01/2022" ),' +

        '(11,1,2, "Conestoga Doon Campus transportation",7482235570, "jaime@latinapp.com", "Does anyone know which bus can I take to Conestoga Doon Campus?", "XXXX", "19/11/2022", "20/11/2022", "17/11/2022" ),' +
        '(12,2,2, "I need a ride ASAP!",7482235571, "emmanuel@latinapp.com", "I need a ride to Guelph ASAP. I got a new job offer!", "XXXX", "21/11/2022", "22/11/2022", "20/11/2022" ),' +
        '(13,3,2, "ION to WLU",7482235572, "juan@latinapp.com", "In which ION station should I drop off to get to WLU?", "XXXX", "23/11/2022", "24/11/2022", "22/11/2022" ),' +
        '(14,4,2, "Conestoga Waterloo Campus Bus",7482235573, "said@latinapp.com", "I think I am lost. I need to know which bus can I take to get to Waterloo Campus", "XXXX", "25/11/2022", "26/11/2022", "24/11/2022" ),' +
        '(15,5,2, "UBER to Downtown",7482235574, "ruben@latinapp.com", "Does anyone know someone who can ride me to Kitchener Downtown? I am in Waterloo.", "XXXX", "27/11/2022", "28/11/2022", "26/11/2022" ),' +
        '(16,1,2, "GRT App",7482235575, "jaime@latinapp.com", "Am I the only one with issues using the GRT App?", "XXXX", "29/11/2022", "30/11/2022", "28/11/2022" ),' +
        '(17,2,2, "Add credit to my GRT pass",7482235576, "emmanuel@latinapp.com", "Which is the maximum amount of credit I can add to my GRT pass?", "XXXX", "30/11/2022", "01/12/2022", "30/11/2022" ),' +
        '(18,3,2, "Location to get my GRT pass",7482235577, "juan@latinapp.com", "Does anyone know where I can get my GRT pass?", "XXXX", "02/12/2022", "03/12/2022", "01/12/2022" ),' +
        '(19,4,2, "About transfers",7482235578, "said@latinapp.com", "Can you explain to me how transfers work?", "XXXX", "04/12/2022", "05/12/2022", "03/12/2022" ),' +
        '(20,5,2, "Bus to Fairview Mall",7482235579, "ruben@latinapp.com", "Can I take the bus number 6 to get to Fairview Mall?", "XXXX", "06/12/2022", "07/12/2022", "05/12/2022" ),' +

        '(21,1,3, "Cleaning services",8482235570, "jaime@latinapp.com", "A factory in Guelph is looking for a cleaning services member. Please contact me.", "XXXX", "19/01/2022", "20/01/2022", "17/01/2022" ),' +
        '(22,2,3, "Junior Developer",8482235571, "emmanuel@latinapp.com", "I need a Junior Developer ASAP. Please send me the CV (Minimum 2 years of experience).", "XXXX", "21/01/2022", "22/01/2022", "20/01/2022" ),' +
        '(23,3,3, "Cleaning services",8482235572, "juan@latinapp.com", "A restaurant in KW area needs someone who cleans the place in the evenings. Please contact me.", "XXXX", "23/01/2022", "24/01/2022", "22/01/2022" ),' +
        '(24,4,3, "Server needed",8482235573, "said@latinapp.com", "An Indian restaurant in Waterloo needs a servant. Preferably woman, please contact me.", "XXXX", "25/01/2022", "26/01/2022", "24/01/2022" ),' +
        '(25,5,3, "Pizza baker needed",8482235574, "ruben@latinapp.com", "I need a pizza baker ASAP for the best restaurant in Kitchener! Send me your CV to the email ruben@wineologikitchener.ca", "XXXX", "27/01/2022", "28/01/2022", "26/01/2022" ),' +
        '(26,1,3, "Crew member at Burger King",8482235575, "jaime@latinapp.com", "Burger King branch located in Waterloo is looking for a crew member. Please stop by and leave your CV with the manager.", "XXXX", "29/01/2022", "30/01/2022", "28/01/2022" ),' +
        '(27,2,3, "Store Manager needed",8482235576, "emmanuel@latinapp.com", "I need a store manager for my new startup. Please call me!", "XXXX", "31/01/2022", "01/02/2022", "30/01/2022" ),' +
        '(28,3,3, "Store associate needed",8482235577, "juan@latinapp.com", "Do you have experience with customer service? The store I work is looking for a person who knows about wine and 1 year of experience in customer service.", "XXXX", "02/02/2022", "03/02/2022", "01/02/2022" ),' +
        '(29,4,3, "Systems engineer needed",8482235578, "said@latinapp.com", "I need a systems engineer for a start-up I am running with a friend of mine. Please call me ASAP.", "XXXX", "04/02/2022", "05/02/2022", "03/02/2022" ),' +
        '(30,5,3, "Junior Instructional Designer",8482235579, "ruben@latinapp.com", "Conestoga College is looking for a Junior Instructional Designer, please send your CV through the portal or to my e-mail.", "XXXX", "06/02/2022", "07/02/2022", "05/02/2022" ),' +

        '(31,1,4, "Immigration lawyer",9482235570, "jaime@latinapp.com", "I need an immigration lawyer. I am a tourist and I need to change my legal status in Canada.", "XXXX", "19/03/2022", "20/03/2022", "17/03/2022" ),' +
        '(32,2,4, "SIN Number",9482235571, "emmanuel@latinapp.com", "Where can I get my service number?", "XXXX", "21/03/2022", "22/03/2022", "20/03/2022" ),' +
        '(33,3,4, "Immigration services",9482235572, "juan@latinapp.com", "I need someone who speaks Spanish and can provide me with some information about immigration.", "XXXX", "23/03/2022", "24/03/2022", "22/03/2022" ),' +
        '(34,4,4, "Childcare benefit",9482235573, "said@latinapp.com", "How can I get the childcare benefit?", "XXXX", "25/03/2022", "26/03/2022", "24/03/2022" ),' +
        '(35,5,4, "Newcomer benefit",9482235574, "ruben@latinapp.com", "How can I get the newcomer benefit?", "XXXX", "27/03/2022", "28/03/2022", "26/03/2022" ),' +
        '(36,1,4, "Service Canada",9482235575, "jaime@latinapp.com", "Where can I find Service Canada office?", "XXXX", "29/03/2022", "30/03/2022", "28/03/2022" ),' +
        '(37,2,4, "Service Ontario",9482235576, "emmanuel@latinapp.com", "Where can I find Service Ontario office?", "XXXX", "31/03/2022", "01/04/2022", "30/03/2022" ),' +
        '(38,3,4, "IRCC",9482235577, "juan@latinapp.com", "I found an important update on the IRCC website about provincial nominations!", "XXXX", "02/04/2022", "03/04/2022", "01/04/2022" ),' +
        '(39,4,4, "How to get my PGWP?",9482235578, "said@latinapp.com", "I just finished my last term at Conestoga. How can I get my Post-Graduation Work Permit?", "XXXX", "04/04/2022", "05/04/2022", "03/04/2022" ),' +
        '(40,5,4, "How to open a bank account?",9482235579, "ruben@latinapp.com", "Does anyone know how to open a bank account in Canada?", "XXXX", "06/04/2022", "07/04/2022", "05/04/2022" ),' +

        '(41,1,5, "CIHIP?",2482235570, "jaime@latinapp.com", "Hello. Does anyone know what CIHIP is? I barely know that it defers a lot from OHIP.", "XXXX", "19/05/2022", "20/05/2022", "17/05/2022" ),' +
        '(42,2,5, "OHIP?",2482235571, "emmanuel@latinapp.com", "Hello. Does anyone know what OHIP is? I barely know that it defers a lot from CIHIP.", "XXXX", "21/05/2022", "22/05/2022", "20/05/2022" ),' +
        '(43,3,5, "Insurances",2482235572, "juan@latinapp.com", "Is it true that I must have another insurance apart from my OHIP?", "XXXX", "23/05/2022", "24/05/2022", "22/05/2022" ),' +
        '(44,4,5, "Prescriptions insurance",2482235573, "said@latinapp.com", "How much do I have to pay for the prescriptions insurance?", "XXXX", "25/05/2022", "26/052022", "24/05/2022" ),' +
        '(45,5,5, "Walk-in Clinics",2482235574, "ruben@latinapp.com", "Can anyone explain to me how walk-in clinics work?", "XXXX", "27/05/2022", "28/05/2022", "26/05/2022" ),' +
        '(46,1,5, "CanadaLife",2482235575, "jaime@latinapp.com", "What is CanadaLife? I just receive a mail from them but I do not know anything. Please help!", "XXXX", "29/05/2022", "30/05/2022", "28/05/2022" ),' +
        '(47,2,5, "Eye exam",2482235576, "emmanuel@latinapp.com", "Where can I get an eye exam?", "XXXX", "31/05/2022", "01/06/2022", "30/05/2022" ),' +
        '(48,3,5, "Dental coverage",2482235577, "juan@latinapp.com", "How dental coverage works in Canada? I am feeling some pain and I need to see the dentist.", "XXXX", "02/06/2022", "03/06/2022", "01/06/2022" ),' +
        '(49,4,5, "Physiotherapists ASAP",2482235578, "said@latinapp.com", "My partner fell down from the bike and needs a physio. Do you know one who speaks Spanish?", "XXXX", "04/06/2022", "05/06/2022", "03/06/2022" ),' +
        '(50,5,5, "Pediatrician ASAP",2482235579, "ruben@latinapp.com", "I need a pediatrician for my baby, he is not feeling well. Thanks!", "XXXX", "06/06/2022", "07/06/2022", "05/06/2022" ),' +

        '(51,1,6, "HST?",3482235570, "jaime@latinapp.com", "I found in my Walmart invoice the letters HST. What do they mean?", "XXXX", "19/07/2022", "20/07/2022", "17/07/2022" ),' +
        '(52,2,6, "Taxes in Canada",3482235571, "emmanuel@latinapp.com", "How taxes work in Canada?", "XXXX", "21/07/2022", "22/07/2022", "20/07/2022" ),' +
        '(53,3,6, "Fill my taxes",3482235572, "juan@latinapp.com", "Do you know an accountant that can help me filing my taxes for this year?", "XXXX", "23/07/2022", "24/07/2022", "22/07/2022" ),' +
        '(54,4,6, "What is the CRA?",3482235573, "said@latinapp.com", "CRA stands for Canadian Revenue Agency.", "XXXX", "25/07/2022", "26/07/2022", "24/07/2022" ),' +
        '(55,5,6, "High taxes",382235574, "ruben@latinapp.com", "Why are tax rates so high in Canada?", "XXXX", "27/07/2022", "28/07/2022", "26/07/2022" ),' +
        '(56,1,6, "Tax return",3482235575, "jaime@latinapp.com", "How can I check if I am  going to get a return from my taxes?", "XXXX", "29/07/2022", "30/07/2022", "28/07/2022" ),' +
        '(57,2,6, "Tax dates",3482235576, "emmanuel@latinapp.com", "In which dates do I have to fill my taxes?", "XXXX", "31/07/2022", "01/08/2022", "30/07/2022" ),' +
        '(58,3,6, "Tax filling as an international student",3482235577, "juan@latinapp.com", "How can I fill my taxes as an international student?", "XXXX", "02/08/2022", "03/08/2022", "01/08/2022" ),' +
        '(59,4,6, "Tax filling as an international worker",3482235578, "said@latinapp.com", "How can I fill my taxes as an international worker?", "XXXX", "04/08/2022", "05/08/2022", "03/08/2022" ),' +
        '(60,5,6, "Tax distribution",3482235579, "ruben@latinapp.com", "How taxes are distributed all across Canada?", "XXXX", "06/08/2022", "07/08/2022", "05/08/2022" ),' +

        '(61,1,7, "Best school",4482235570, "jaime@latinapp.com", "Where is the best school in KW area located?", "XXXX", "19/08/2022", "20/08/2022", "17/08/2022" ),' +
        '(62,2,7, "Best daycare in Waterloo",4482235571, "emmanuel@latinapp.com", "Which is the best daycare in the Waterloo area?", "XXXX", "21/08/2022", "22/08/2022", "20/08/2022" ),' +
        '(63,3,7, "Best daycare in Kitchener",482235572, "juan@latinapp.com", "Which is the best daycare in Kitchener area?", "XXXX", "23/08/2022", "24/08/2022", "22/08/2022" ),' +
        '(64,4,7, "Worst school",4482235573, "said@latinapp.com", "Which is the worst school in KW area?", "XXXX", "25/08/2022", "26/08/2022", "24/08/2022" ),' +
        '(65,5,7, "Worst daycare in KW area",4482235574, "ruben@latinapp.com", "Which is the worst daycare in KW area?", "XXXX", "27/08/2022", "28/08/2022", "26/08/2022" ),' +
        '(66,1,7, "Tips - healthy food",4482235575, "jaime@latinapp.com", "What is the healthiest food I can give my little 3-yo baby?", "XXXX", "29/08/2022", "30/08/2022", "28/08/2022" ),' +
        '(67,2,7, "Children and winter",4482235576, "emmanuel@latinapp.com", "What are the best tips for taking care of children during winter season?", "XXXX", "31/08/2022", "01/09/2022", "30/09/2022" ),' +
        '(68,3,7, "Best remedy for colds",4482235577, "juan@latinapp.com", "What is the best remedy for colds?", "XXXX", "02/09/2022", "03/09/2022", "01/09/2022" ),' +
        '(69,4,7, "Cheapest toys in KW area",4482235578, "said@latinapp.com", "Where can I get the cheapest toys in the KW area?", "XXXX", "04/09/2022", "05/09/2022", "03/09/2022" ),' +
        '(70,5,7, "Nanny needed",4482235579, "ruben@latinapp.com", "I need a nanny who can take care of my 5yo little boy. Please contact me, I live in Milton.", "XXXX", "06/09/2022", "07/09/2022", "05/09/2022" ),' +

        '(71,1,8, "Class G license.",6482235570, "jaime@latinapp.com", "How can I get my G-License in Kitchener?", "XXXX", "19/09/2022", "20/09/2022", "17/09/2022" ),' +
        '(72,2,8, "G1 examination",6482235571, "emmanuel@latinapp.com", "How many correct questions may I get to pass my G1 examination test?", "XXXX", "21/09/2022", "22/09/2022", "20/09/2022" ),' +
        '(73,3,8, "Cheapest weed",6482235572, "juan@latinapp.com", "Where can I get the cheapest weed in Waterloo?", "XXXX", "23/09/2022", "24/09/2022", "22/09/2022" ),' +
        '(74,4,8, "International restaurants",6482235573, "said@latinapp.com", "Can you give me the name of the best international restaurants you have found?", "XXXX", "25/09/2022", "26/09/2022", "24/09/2022" ),' +
        '(75,5,8, "Apple - Android",6482235574, "ruben@latinapp.com", "Which is better Apple or Android? I am not pretty sure!", "XXXX", "27/09/2022", "28/-09/2022", "26/09/2022" ),' +
        '(76,1,8, "Mario cleaning services",6482235575, "jaime@latinapp.com", "Have you ever heard about a guy called Mario who works for cleaning services? Any reference?", "XXXX", "29/09/2022", "30/09/2022", "28/09/2022" ),' +
        '(77,2,8, "PC - Gaming fixing",6482235576, "emmanuel@latinapp.com", "Where can I find a person who can help me fixing my gaming laptop?", "XXXX", "30/09/2022", "01/10/2022", "30/09/2022" ),' +
        '(78,3,8, "Currency exchange place",6482235577, "juan@latinapp.com", "Where can I find a currency exchange place?", "XXXX", "02/10/2022", "03/10/2022", "01/10/2022" ),' +
        '(79,4,8, "Sunday funday plans",6482235578, "said@latinapp.com", "What plans do you know we can do this fall?", "XXXX", "04/10/2022", "05/10/2022", "03/10/2022" ),' +
        '(80,5,8, "Latino Discos",6482235579, "ruben@latinapp.com", "I want to go dancing with my friends! Do you know any Latino Discos here?", "XXXX", "06/10/2022", "07/10/2022", "05/10/2022" );' ;

      let comments = 'INSERT OR IGNORE INTO comments (commentId,userId,postId,description,creationDate) VALUES ' +

        '(1,6,1, "Can I get three please!", "17/12/2022" ),' +
        '(2,7,1, "I want five of them with no cilantro, please.", "17/12/2022" ),' +
        '(3,6,2, "What does it have?", "22/12/2022" ),' +
        '(4,7,2, "Can I have it with some crunchy plantains?", "22/12/2022" ),' +
        '(5,6,3, "Do you sell the with meat filling?", "24/12/2022" ),' +
        '(6,7,3, "I would love to have one of the full of butter on top!", "24/12/2022" ),' +
        '(7,6,4, "I want it but with no red onion please.", "26/12/2022" ),' +
        '(8,7,4, "Can I get eight of them please! I live in Guelph!", "26/12/2022" ),' +
        '(9,6,5, "Deliveries available?", "28/12/2022" ),' +
        '(10,7,5, "What if I live in Saskatchewan?", "28/12/2022" ),' +
        '(11,6,6, "What is the difference with regular ones?", "30/12/2022" ),' +
        '(12,7,6, "I do not like plantains. Please sell another thing", "30/12/2022" ),' +
        '(13,6,7, "Can you tell me the content of the sopes?", "01/01/2022" ),' +
        '(14,7,7, "Are they prepared with regular tortillas?", "01/01/2022" ),' +
        '(15,6,8, "What are the ingredients of the papelon?", "03/01/2022" ),' +
        '(16,7,8, "Do you drink it or eat it?", "03/01/2022" ),' +
        '(17,6,9, "I wanna know if the pupusas have chicken in it.", "05/01/2022" ),' +
        '(18,7,9, "Do you have vegan options?", "05/01/2022" ),' +
        '(19,6,10, "Is it greasy? What are the ingredients?", "17/01/2022" ),' +
        '(20,7,10, "Can I have 10 of them? Do you accept e-tranfers?", "17/01/2022" ),' +
        '(21,6,11, "I give rides to Doon on Mondays!", "22/01/2022" ),' +
        '(22,7,11, "You can call me, I give rides the whole week!", "22/01/2022" ),' +
        '(23,6,12, "You can contact Victor, he is a very good person and driver.", "24/01/2022" ),' +
        '(24,7,12, "Yes he is! I DMd you with his cellphone number.", "24/01/2022" ),' +
        '(25,6,13, "There is an ION station just behind WLU", "26/01/2022" ),' +
        '(160,7,13, "I love ION! It is very practical! You can find a station just behind the main campus on University Avenue.", "26/01/2022" ),' +
        '(26,7,14, "It depends on where you live. I take bus 8.", "28/01/2022" ),' +
        '(27,6,14, "I take number 7 and I drop off on King Street.", "28/01/2022" ),' +
        '(28,7,15, "Try using DiDi it is cheaper!", "30/01/2022" ),' +
        '(29,6,15, "I used Poparide and I found a discount of 5CAD for first use!", "30/01/2022" ),' +
        '(30,7,16, "I did not know that GRT had an app!", "01/02/2022" ),' +
        '(31,6,16, "Mine is working perfectly!", "01/02/2022" ),' +
        '(32,7,17, "You can do it in any ION station!", "03/02/2022" ),' +
        '(33,6,17, "There are two ways: either online or at any ION Station", "03/02/2022" ),' +
        '(34,7,18, "You can get you GRT pass at any ION Station!", "05/02/2022" ),' +
        '(35,6,18, "There is a Customer Service Office in Frederick St.", "05/02/2022" ),' +
        '(36,7,19, "You get transfers in the buses. Tell the driver you require one.", "17/02/2022" ),' +
        '(37,6,19, "You only get transfers when paying the 3.50 in the bus. Tell the driver you need it. If you have the GRT pass it is not necessary.", "17/02/2022" ),' +
        '(38,7,20, "It depends on the place you live. I take number 7.", "22/02/2022" ),' +
        '(39,6,20, "I take number 8 and the ION since I live in front of Victoria Park Station!", "22/02/2022" ),' +
        '(40,7,21, "Contact Total Cleaning Services! I DMd you!", "24/02/2022" ),' +
        '(41,6,21, "There are a bunch of cleaners, you can post you offer on Facebook with the rates and thats it.", "24/02/2022" ),' +
        '(42,7,22, "Go to Conestoga Waterloo and ask the students! They are very good!", "26/02/2022" ),' +
        '(43,6,22, "I sent this post to a friend of mine, her name is Marta.", "26/02/2022" ),' +
        '(44,7,23, "Contact Total Cleaning Services! I DMd you!", "28/02/2022" ),' +
        '(45,6,23, "There are a bunch of cleaners, you can post you offer on Facebook with the rates and thats it.", "28/02/2022" ),' +
        '(46,7,24, "I have a friend of mine, his name is Brian. I already sent him this post to contact you!", "01/03/2022" ),' +
        '(47,6,24, "Can you tell me the rates and the location of the restaurant please?", "01/03/2022" ),' +
        '(48,7,25, "Where is that restaurant located?", "03/03/2022" ),' +
        '(49,6,25, "I called and they said that you must have 2 years of experience.", "03/03/2022" ),' +
        '(50,7,26, "The manager is very friendly!", "05/03/2022" ),' +
        '(51,6,26, "I called and they need a full time crew member. Be aware!", "05/03/2022" ),' +
        '(52,7,27, "It seems to be a scam, be aware.", "17/03/2022" ),' +
        '(53,6,27, "I called and I did not receive any answer.", "17/03/2022" ),' +
        '(54,7,28, "Staff is very friendly.", "22/03/2022" ),' +
        '(55,6,28, "It is a little far from my home, otherwise I would have taken it!", "22/03/2022" ),' +
        '(56,7,29, "Is it necessary to show proof of a Canadian degree?", "24/03/2022" ),' +
        '(57,6,29, "I am from Colombia and I speak Spanish and English. Reach me out!", "24/03/2022" ),' +
        '(58,7,30, "I have 3 years of experience and no degree. Does it work?", "26/03/2022" ),' +
        '(59,6,30, "I is quite hard to continue in this process, they ask for a lot of things.", "26/03/2022" ),' +
        '(60,7,31, "Contact Laura Quevedo, she is from Mexico, very nice!", "28/03/2022" ),' +
        '(61,6,31, "You can reach Zoila Guayambuco, she is from Peru and she knows a lot!", "28/03/2022" ),' +
        '(62,7,32, "You have to go to any Service Canada.", "30/03/2022" ),' +
        '(63,6,32, "Service Canada on Frederick - King.", "01/04/2022" ),' +
        '(64,7,33, "I am sorry, I do not know.", "01/04/2022" ),' +
        '(65,6,33, "I have no idea. What if you go to YMCA?", "03/04/2022" ),' +
        '(66,7,34, "You get it after filling your 1st year of taxes.", "03/04/2022" ),' +
        '(67,6,34, "Children must be under age if you want to get it.", "05/04/2022" ),' +
        '(68,7,35, "You get it after the 1st year filling taxes.", "05/04/2022" ),' +
        '(69,6,35, "Once you reach the first year and fill taxes, you will get this benefit.", "17/04/2022" ),' +
        '(70,7,36, "Just in the nice building that is on Frederick St.", "17/04/2022" ),' +
        '(71,6,36, "Go inside the glassy building on Duke St.", "22/04/2022" ),' +
        '(72,7,37, "It is located on Duke St third floor.", "22/04/2022" ),' +
        '(73,6,37, "If I am not wrong it is located on Queen St.", "24/04/2022" ),' +
        '(74,7,38, "I found the info! Thanks!", "24/04/2022" ),' +
        '(75,6,38, "But this update is only for international students only!", "26/04/2022" ),' +
        '(76,7,39, "You can get it once you finish your studies. The college issues a completion letter and you submit it through the IRCC portal.", "26/04/2022" ),' +
        '(77,6,39, "Get the completion letter and submit the PGWP request on IRCCs portal.", "28/04/2022" ),' +
        '(78,7,40, "You can go to any bank with your passport, study or work permit and thats it.", "28/04/2022" ),' +
        '(79,6,40, "Go to any bank with your passport, study or work permit and thats it.", "30/04/2022" ),' +
        '(80,7,41, "It stands for College International Health Insurance Plan ", "30/05/2022" ),' +
        '(81,6,41, "It stands for Conestoga International Health Insurance Plan", "01/05/2022" ),' +
        '(82,7,42, "It stands for Ontario Health Insurance Plan", "01/05/2022" ),' +
        '(83,6,42, "Ontario Health Insurance Plan", "03/05/2022" ),' +
        '(84,7,43, "Quite hard to answer! I think you have to be in a full time job.", "03/05/2022" ),' +
        '(85,6,43, "You need to get a FT job in order to get access to these insurances. Also, you can pay them but they are very expensive.", "05/05/2022" ),' +
        '(86,7,44, "Unless you get a particular insurance, you have to pay for them.", "05/05/2022" ),' +
        '(87,6,44, "I really do not know. I am sorry.", "17/05/2022" ),' +
        '(88,7,45, "You will find several walk-in clinics. If you have CIHIP or OHIP they will help you with your medical conditions.", "17/05/2022" ),' +
        '(89,6,45, "Present your CIHIP or OHIP in Charles and Benton Medical Clinic. I liked it a lot!", "22/05/2022" ),' +
        '(90,7,46, "As far as I know it is an insurance for extra health services.", "22/05/2022" ),' +
        '(91,6,46, "It is an insurance.", "24/05/2022" ),' +
        '(92,7,47, "They are very expensive and I need glasses!", "24/05/2022" ),' +
        '(93,6,47, "Go to Hakim Eye Clinical on Weber Street. They are very good!", "26/05/2022" ),' +
        '(94,7,48, "CIHIP covers a small portion of your dental coverage.", "26/05/2022" ),' +
        '(95,6,48, "Have you checked if it is covered by the OHIP?", "28/05/2022" ),' +
        '(96,7,49, "There are a bunch of them, they charge 80CAD per session.", "28/05/2022" ),' +
        '(97,6,49, "I found a very good one on King St. Just in front of Kitchener Collegiate Institute.", "30/06/2022" ),' +
        '(98,7,50, "I have a friend of mine. Her name is Rosa, she is very good. Call her! 5487778545", "30/06/2022" ),' +
        '(99,6,50, "Go to any walk-in clinic!", "01/06/2022" ),' +
        '(100,7,51, "Harmonized Sales Tax in Ontario is equivalent to 13%", "02/06/2022" ),' +
        '(101,6,51, "Harmonized Sales Tax here is 13%", "03/06/2022" ),' +
        '(102,7,52, "You fill them yearly in February. You may ask an accountant to do that.", "04/06/2022" ),' +
        '(103,6,52, "I have a friend of mine who is a certified accountant and speaks Spanish.", "05/06/2022" ),' +
        '(104,7,53, "Contact Juan Perez, he is very good.", "06/06/2022" ),' +
        '(105,6,53, "There are different offices across KW - area. You can go there!", "07/06/2022" ),' +
        '(106,7,54, "Canadian Revenue Agency", "08/06/2022" ),' +
        '(107,6,54, "Canadian Revenue Agency - They are in charge of taxes here. Be cautious!", "09/06/2022" ),' +
        '(108,7,55, "Yeah, this is something I do not like here.", "10/06/2022" ),' +
        '(109,6,55, "The more you earn, the more you pay in taxes. It is unfair sometimes.", "11/06/2022" ),' +
        '(110,7,56, "It varies a lot, depending on your situation.", "12/06/2022" ),' +
        '(111,6,56, "Sometimes de feds give taxes back, sometimes not. It depends on your situation.", "13/06/2022" ),' +
        '(112,7,57, "February", "14/06/2022" ),' +
        '(113,6,57, "February", "15/06/2022" ),' +
        '(114,7,58, "You have to contact an accountant to receive help about if it is your first time.", "16/07/2022" ),' +
        '(115,6,58, "Accountant needed!", "17/07/2022" ),' +
        '(116,7,59, "You have to contact an accountant to receive help about if it is your first time.", "18/07/2022" ),' +
        '(117,6,59, "Accountant needed!", "19/07/2022" ),' +
        '(118,7,60, "Hard to answer!", "20/07/2022" ),' +
        '(119,6,60, "As far as I know, a portion of the taxes you pay go to the feds, other to the province and the remainder to the town.", "21/07/2022" ),' +
        '(120,7,61, "I do not know, I do not have children yet!", "22/07/2022" ),' +
        '(121,6,61, "Queen Victoria School!", "23/07/2022" ),' +
        '(122,7,62, "Little kids game!", "24/07/2022" ),' +
        '(123,6,62, "Mozart daycare! My little brother goes there!", "25/07/2022" ),' +
        '(124,7,63, "Happy feet! I like it!", "26/07/2022" ),' +
        '(125,6,63, "I do not know. I heard about Happy Feet!", "27/07/2022" ),' +
        '(126,7,64, "No idea.", "28/07/2022" ),' +
        '(127,6,64, "I do not know.", "29/07/2022" ),' +
        '(128,7,65, "Marys daycare I heard it is not good.", "30/07/2022" ),' +
        '(129,6,65, "Marys daycare.", "01/07/2022" ),' +
        '(130,7,66, "Fruits and Veggies!", "02/07/2022" ),' +
        '(131,6,66, "Tons of veggies! No pizza, no poutine!", "03/08/2022" ),' +
        '(132,7,67, "Keep them very well covered, winter is hard in Canada.", "04/08/2022" ),' +
        '(133,6,67, "Good coverage.", "05/08/2022" ),' +
        '(134,7,68, "Tylenol sinus!", "06/08/2022" ),' +
        '(135,6,68, "Tylenol sinus and a lot of rest.", "07/08/2022" ),' +
        '(136,7,69, "KrazyBinz", "08/08/2022" ),' +
        '(137,6,69, "Toys R Us", "09/08/2022" ),' +
        '(138,7,70, "Contact Rosita Morales, she is very good 3334456756.", "10/08/2022" ),' +
        '(139,6,70, "I can help you! I need a part-time job!", "11/08/2022" ),' +
        '(140,7,71, "Go to any drive test and present your previous driving experience in you country.", "12/08/2022" ),' +
        '(141,6,71, "Present your previous driving experience in you country in any drive test facility!", "13/08/2022" ),' +
        '(142,7,72, "16 out of 20 in both sections.", "14/08/2022" ),' +
        '(143,6,72, "16 out of 20 in both sections.", "15/08/2022" ),' +
        '(144,7,73, "Pur Cannabis on King St.", "16/08/2022" ),' +
        '(145,6,73, "Sativa Cannabis! I love it!", "17/08/2022" ),' +
        '(146,7,74, "La Cucina! I love it!", "18/08/2022" ),' +
        '(147,6,74, "Wineology! It is the best one!", "19/08/2022" ),' +
        '(148,7,75, "I prefer Apple, it is very used here in Canada.", "20/09/2022" ),' +
        '(149,6,75, "Android! It is cheaper and it has less restrictions than Apple!", "21/09/2022" ),' +
        '(150,7,76, "DO NOT trust him! I heard bad things about him!", "22/09/2022" ),' +
        '(151,6,76, "He does not pay to his contractors! Do not trust him! Run!!!!!!", "23/09/2022" ),' +
        '(152,7,77, "Contact Juan Acevedo, nice guy and it is not expensive!", "24/09/2022" ),' +
        '(153,6,77, "Contact PC Services in Fairview! Nice and cheap!", "25/09/2022" ),' +
        '(154,7,78, "In Fairview Mall! They give good rates!", "26/09/2022" ),' +
        '(155,6,78, "I do not remember well the name but it is located in Sunrise Plaza!", "27/09/2022" ),' +
        '(156,7,79, "Victoria Park! The best plan!", "28/09/2022" ),' +
        '(157,6,79, "You will find tons of interesting things to do in the GTA if you have a car!", "29/09/2022" ),' +
        '(158,7,80, "La pista latina is a very good one!", "30/09/2022" ),' +
        '(159,6,80, "Go to La Guanaquita on King St.", "30/09/2022" );' ;

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
