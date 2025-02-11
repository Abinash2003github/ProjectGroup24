import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runPy = (scriptName, inputArray) => {
  return new Promise((resolve, reject) => {
    //Create absolute path for python script
    const filePath = path.join(__dirname, "../../scripts/", scriptName);

    const childPython = spawn("python", [filePath, ...inputArray].map(String));

    //Output and Error string
    let output = "";
    let err = "";

    //Store Output
    childPython.stdout.on("data", (data) => {
      output += data.toString();
    });

    //Store Error
    childPython.stderr.on("data", (data) => {
      err += data.toString();
    });

    childPython.on("close", (code) => {
      if (code !== 0) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};

export default runPy;
