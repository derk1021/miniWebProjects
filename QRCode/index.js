// 1. Use the inquirer npm package to get user input.
// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
// 3. Create a txt file to save the user input using the native fs node module.
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs-extra";

const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

inquirer
  .prompt([
    /* Create an object that contains question-related values */
    {
      name: "url",
      message: "Input a valid URL:",
      type: "input",
    },
  ])
  .then((answers) => {
    // "answers" returns an object with the "name: <input url>"
    const URL = answers.url;

    if (isValidUrl(URL)) {
      // Readable stream with image data (async operation)
      const qrStream = qr.image(URL, { type: "png" });
      // Pipe the output to a writable stream or save it to a file
      qrStream.pipe(fs.createWriteStream("qrCode.png"));

      // Synchronous way
      // const imageData = qr.imageSync(text, { type: 'png' });
      // fs.writeFileSync('qrcode.png', imageData);
    } else {
      return;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log("Something else went wrong");
    }
  });
