var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("browser-sync", function () {
    browserSync({
        files: [
            "styles.css",
            "src/**/*.*"
        ],
        server: "./"
    });
});

// Default task to be run with `gulp`
gulp.task("default", ["browser-sync"]);
