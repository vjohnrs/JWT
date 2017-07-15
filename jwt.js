const crypto = require("crypto");

/* sample data */
const header = { alg: "HS256", typ: "JWT" };
const payload = {sub: "test@test.com"};

const secret_for_JWT_receiver = "ANY_GOOD_SECRET";

/* create url safe base64 strings of data */
let encodedHeader = urlSafeFromBASE64(createBASE64String(header));
let encodedPayload = urlSafeFromBASE64(createBASE64String(payload));

/* create signature using secret shared with the receiver */
let signature =  crypto.createHmac("sha256", secret_for_JWT_receiver ).update(`${encodedHeader}.${encodedPayload}`).digest("base64");

/* JWT's anatomy - Header.Payload.Signature */
const JWT = urlSafeFromBASE64(`${encodedHeader}.${encodedPayload}.${signature}`);
console.log(`My first JWT ==> ${JWT}`); 

/* BASE64 uses + - = which are not url safe so we convert them to "", '-',"_" respectively */
function urlSafeFromBASE64( stringToConvert ){
  return stringToConvert.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g,"_");
}

/* Function to stringify and create base64*/
function createBASE64String(stringToConvert){
 return new Buffer(JSON.stringify(stringToConvert)).toString('base64')
}

