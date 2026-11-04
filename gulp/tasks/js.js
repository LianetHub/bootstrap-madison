import webpack from 'webpack-stream'
import { resolve } from 'node:path';

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            config: ['app.js', 'app.min.js'].map(filename => ({
                entry: resolve(app.path.src.js),
                mode: app.isDev ? 'development' : 'production',
                devtool: app.isDev ? 'source-map' : false,
                optimization: { minimize: filename === 'app.min.js' && app.isBuild },
                output: { filename },
            })),
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

export const copyJsLibs = () => {
    return app.gulp.src(app.path.src.jsLibs)
        .pipe(app.gulp.dest(app.path.build.jsLibs))
}



