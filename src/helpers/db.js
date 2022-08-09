import * as SQLite from "expo-sqlite";

//will launch (or create if first time) database
const trackerDb = SQLite.openDatabase("tracker.db");

export const getAllTableNames = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        //primary key means unique, auto generated
        // "DROP TABLE IF EXISTS trackerData;",
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const dropTable = (name) => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        //primary key means unique, auto generated
        // "DROP TABLE IF EXISTS trackerData;",
        `DROP TABLE IF EXISTS ${name};`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const dropAllTables = async () => {
  let res = await getAllTableNames();
  const nameObjs = res.rows._array;
  let nameArr = nameObjs.map((item) => {
    return item.name;
  });
  const results = nameArr.map(async (item) => {
    res = await dropTable(item);
    return res;
  });
  res = await Promise.all(results);
  return res;
};

//function to initialise database (either first time or not)
export const initTrackerData = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        //primary key means unique, auto generated
        // "DROP TABLE IF EXISTS trackerData;",
        "CREATE TABLE IF NOT EXISTS trackerData (id INTEGER PRIMARY KEY NOT NULL, trackerId TEXT NOT NULL, trackerType TEXT NOT NULL, date TEXT NOT NULL, data TEXT NOT NULL, timestamp TEXT NOT NULL);",
        [],
        //SUCCESS FUNCTION
        () => {
          resolve();
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to initialise database (either first time or not)
export const initMarkedDates = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        // primary key means unique, auto generated
        // "DROP TABLE IF EXISTS markedDates;",
        "CREATE TABLE IF NOT EXISTS markedDates (id INTEGER PRIMARY KEY NOT NULL, annotationId INTEGER NOT NULL, date TEXT NOT NULL, period TEXT NOT NULL);",
        [],
        //SUCCESS FUNCTION
        () => {
          resolve();
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to initialise database (either first time or not)
export const initAnnotations = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        //primary key means unique, auto generated
        // "DROP TABLE IF EXISTS annotations;",
        "CREATE TABLE IF NOT EXISTS annotations (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL, trackers TEXT NOT NULL, colour TEXT NOT NULL, description TEXT NOT NULL, trend TEXT NOT NULL);",
        [],
        //SUCCESS FUNCTION
        () => {
          resolve();
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to initialise database (either first time or not)
export const initTrackers = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction -> package guarantees query is executed as a whole, and if anything fails it all rolls back
    //that's why we wrap queries in transactions
    trackerDb.transaction((tx) => {
      tx.executeSql(
        //primary key means unique, auto generated
        // "DROP TABLE IF EXISTS trackers;",
        "CREATE TABLE IF NOT EXISTS trackers (id INTEGER PRIMARY KEY NOT NULL, trackerId TEXT NOT NULL,trackerType TEXT NOT NULL, active INTEGER NOT NULL, data TEXT NOT NULL,  name TEXT NOT NULL);",
        [],
        //SUCCESS FUNCTION
        () => {
          resolve();
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const insertItemTrackerData = (
  trackerId,
  trackerType,
  date,
  data,
  timestamp
) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO trackerData (trackerId, trackerType, date, data, timestamp) VALUES (?, ?, ?, ?, ?)",
        [trackerId, trackerType, date, data, timestamp],
        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const updateItemTrackerData = (trackerId, date, data) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "UPDATE trackerData SET data = ? WHERE trackerId = ? and date = ?",
        [data, trackerId, date],

        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const updateTimestampTrackerData = (trackerId, date, timestamp) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "UPDATE trackerData SET timestamp = ? WHERE trackerId = ? and date = ?",
        [timestamp, trackerId, date],

        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const insertItemTrackers = (
  trackerId,
  trackerType,
  active,
  data,
  name
) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO trackers (trackerId, trackerType, active,data, name ) VALUES (?, ?, ?, ?, ?)",
        [trackerId, trackerType, active, data, name],
        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const insertItemMarkedDates = (annotationId, date, period) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO markedDates (annotationId, date, period) VALUES (?, ?, ?)",
        [annotationId, date, period],
        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const updateItemMarkedDates = (annotationId, date, period) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `UPDATE markedDates SET period='${period}' WHERE annotationId = ` +
          annotationId +
          ` and date='${date}';`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const insertItemAnnotations = (
  id,
  title,
  startDate,
  endDate,
  trackers,
  colour,
  description,
  trend
) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO annotations (id, title, startDate, endDate, trackers, colour, description, trend) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, title, startDate, endDate, trackers, colour, description, trend],
        //SUCCESS FUNCTION returns result
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to add an item to the database
export const updateItemAnnotations = (
  id,
  title,
  startDate,
  endDate,
  trackers,
  colour,
  description,
  trend
) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `UPDATE annotations SET title='${title}',startDate='${startDate}',endDate='${endDate}',trackers='${trackers}',colour='${colour}',description='${description}',trend='${trend}' WHERE id = ` +
          id +
          `;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeFromAnnotations = (id) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM annotations WHERE id = "${id}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeFromMarkedDates = (annoId) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM markedDates WHERE annotationId = "${annoId}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//get the latest id for determining the new id
export const getLatestAnnotationId = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT IFNULL(MAX(id), 0) FROM annotations;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to update a trackers data in the database
export const updateItemTrackersDetails = (id, trackerTitle, data) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `UPDATE trackers SET data = '${data}', name = "${trackerTitle}" WHERE trackerId = "${id}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to update a trackers active status in the database
export const updateItemTrackersActive = (id, trackerTitle, active) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `UPDATE trackers SET active = ${
          active ? 1 : 0
        } WHERE trackerId = "${id}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to update a tracker in the database
export const removeFromTrackers = (id) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM trackers WHERE trackerId = "${id}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to update a tracker in the database
export const removeFromTrackerData = (id) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM trackerData WHERE trackerId = "${id}";`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to delete all trackers
export const deleteItemTrackers = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM trackers;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to delete all trackers
export const deleteItemAnnotations = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM annotations;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to delete all trackers
export const deleteItemMarkedDates = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM markedDates;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to delete all trackerData
export const deleteItemTrackerData = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM trackerData;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to retrieve all items in the database
export const fetchTrackerData = (today) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM trackerData WHERE date = "${today}"`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTrackerDataMonth = (yearMonth) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM trackerData WHERE instr(date, "${yearMonth}") > 0`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTrackerDataDates = (startDate, endDate) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT DISTINCT trackerId FROM trackerData WHERE (date BETWEEN "${startDate}" AND "${endDate}");`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTrackerDataDatesData = (startDate, endDate) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM trackerData WHERE (date BETWEEN "${startDate}" AND "${endDate}");`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchMarkedDatesMonth = (yearMonth) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM markedDates  WHERE instr(date, "${yearMonth}") > 0`,

        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to retrieve all items in the database
export const fetchTrackers = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM trackers",
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to retrieve all items in the database
export const fetchMarkedDates = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM markedDates",
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//function to retrieve all items in the database
export const fetchAnnotations = () => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM annotations",
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAnnotationsMonth = (yearMonth) => {
  const promise = new Promise((resolve, reject) => {
    trackerDb.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM annotations WHERE instr(startDate, "${yearMonth}") > 0;`,
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //FAIL FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
