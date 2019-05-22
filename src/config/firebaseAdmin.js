import * as admin from "firebase-admin";

const serviceAccount = require(process.env
  .REACT_APP_PATH_TO_SERVICE_ACCOUNT_KEY);

const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

admin.initializeApp(config);

export const adminAuth = admin.auth();
