import fs from "fs";
import { IProduct } from "../interface/product";

const dataPath = "./product.json";

function saveDataJson(data: IProduct[]) {
  const dataString = JSON.stringify(data);
  return fs.writeFileSync(dataPath, dataString);
}

export default saveDataJson;