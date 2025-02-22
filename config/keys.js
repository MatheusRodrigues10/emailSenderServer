import devKeys from "./dev.js";
import prodKeys from "./prod.js";

const keys = process.env.NODE_ENV === "production"
  ? prodKeys
  : devKeys;

export default keys;
