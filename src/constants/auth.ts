import base64 from "base-64";

const username = "_system";
const password = "sys";
const authorization = "Basic " + base64.encode(username + ":" + password);

export default authorization;
