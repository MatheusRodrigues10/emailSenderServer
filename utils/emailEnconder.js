export function encodeEmail(email) {
  return Buffer.from(email).toString("base64");
}

export function decodeEmail(encoded) {
  return Buffer.from(encoded, "base64").toString("utf-8");
}
