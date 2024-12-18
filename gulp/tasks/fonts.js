import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
      .pipe(fonter({
          formats: ['ttf']
      }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};
