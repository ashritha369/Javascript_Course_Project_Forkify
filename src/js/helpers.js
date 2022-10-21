import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

// ///////////////to avoid running fetch forever incase if internet is slow/error in url we use settimeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
///////////////////
export const getJSON = async function (url) {
  try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    // converting result back to json and storing it in data
    const data = await res.json();
    // if res.ok===false then custom error should be thrown as
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
