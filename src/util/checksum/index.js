import CryptoJS from "crypto-js";

export const createCalcMd5Promise = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onloadend = function () {
      const hash = CryptoJS.MD5(reader.result).toString();
      resolve(hash);
    };
  });
}