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

  const lastHour = new Date();
  lastHour.setHours(lastHour.getHours() - 1);

  process.chdir(dir);
  nonWebPFiles.forEach((file) => {
    const fileNameWithoutExtension = path.basename(file, path.extname(file));
    execAsync(
      `cwebp ${file} -q ${quality} -o ${fileNameWithoutExtension}.webp`
    );
  });
};

image2webp("./png", 100);
