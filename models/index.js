/*
בניית אובייקט קישור ללא פתיחת הקישור (נוכל לפתוח כמה אובייקטי קישור לבסיסי נתונים שונים)
הגדרת closure אנונימי אסינכרוני לפתיחת הקישור(ים)
פתיחת הקישור לבסיס נתונים בתוך בלוק try\catch תוך המתנה אסינכרונית (. נוכל לפתוח כמה קישורים – כל אחד בבלוק שלו)
ואם קראה תקלה...
... נדפיס את המידע עליה

סיום והפעלת ה-closure האנונימי האסינכרוני

נייבא את המודולים שבונים מודלים ספציפיים באובייקט קישור לבסיס נתונים מתאים כל אחד



נייצא מהמודול שלנו פונקציה שתחזיר מודל קיים לפי שם המודל

*/

const debug = require("debug")("mongo:model");
const mongo = require("mongoose");
//בניית אובייקט קישור ללא פתיחת הקישור (נוכל לפתוח כמה אובייקטי קישור לבסיסי נתונים שונים)
let db = mongo.createConnection();
//הגדרת closure אנונימי אסינכרוני לפתיחת הקישור(ים)
(async () => {
    try {
        await db.openUri('mongodb://localhost/lab-mongo-5778');
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();

debug('Pending DB connection');
//נייבא את המודולים שבונים מודלים ספציפיים באובייקט קישור לבסיס נתונים מתאים כל אחד
require("./users")(db);
//require("./todo")(db);
 require("./flowers")(db);
// require("./customer")(db);
module.exports = model => db.model(model);
