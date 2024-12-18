import gulp from "gulp";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";

export const images = async () => {
  // Оптимизация изображений
  const optimizedFiles = await imagemin([`${app.path.src.images}`], {
    destination: app.path.build.images,
    plugins: [
      imageminMozjpeg({ quality: 75 }), // Оптимизация JPG
      imageminOptipng({ optimizationLevel: 3 }), // Оптимизация PNG
      imageminSvgo({ plugins: [{ removeViewBox: false }] }), // Оптимизация SVG
    ],
  });

  console.log("Optimized files:", optimizedFiles);

  // Преобразование в WebP
  const webpFiles = await imagemin(
    [`${app.path.build.images}/*.{jpg,jpeg,png}`],
    {
      destination: app.path.build.images,
      plugins: [
        imageminWebp({ quality: 80 }), // Конвертация в WebP
      ],
    }
  );

  console.log("WebP files:", webpFiles);

  // Обновляем изменения в browserSync
  gulp.src(app.path.build.images).pipe(app.plugins.browserSync.stream());
};
