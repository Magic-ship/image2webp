const fs = require("fs");
const path = require("path");
const process = require("process");
const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

const image2webp = (dir, quality) => {
  const nonWebPFiles = fs
    .readdirSync(dir)
    .filter((file) => !file.endsWith(".webp") && !file.endsWith(".ico"));

  process.chdir(dir);
  nonWebPFiles.forEach(async (file) => {
    const fileNameWithoutExtension = path.basename(file, path.extname(file));
    // const fileNameWithoutExtension = `${parseInt(path.basename(file, path.extname(file))) + 6500}`;
    await execAsync(
      `cwebp ${file} -q ${quality} -o ${fileNameWithoutExtension}.webp`
    );
    console.log(fileNameWithoutExtension);
  });
};

image2webp("./png", 80);
