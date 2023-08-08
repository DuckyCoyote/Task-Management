const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function uploadImage(buffer) {
  const fileWebp = await sharp(buffer).toFormat('webp').toBuffer();
  const fileName = `image-${Date.now()}.webp`;
  const imagePath = path.join(
    __dirname,
    '..',
    'assets',
    'public',
    'img',
    fileName
  );
  await fs.promises.writeFile(imagePath, fileWebp);
  return fileName;
}

module.exports = uploadImage;
