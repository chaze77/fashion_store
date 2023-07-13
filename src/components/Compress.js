const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const compressImages = async () => {
  try {
    const files = await imagemin(["src/images/*.{jpg,png}"], {
      destination: "src/compressed/images",
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    console.log("Сжатые изображения:", files);
  } catch (error) {
    console.error("Ошибка сжатия изображений:", error);
  }
};

compressImages();
