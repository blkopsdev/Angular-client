//build
const gulp = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const replace = require('gulp-replace-task');
const uglify = require('gulp-uglify');
const pump = require('pump');
const purify = require('gulp-purifycss');

//utils
const serve = require('gulp-serve');
const path = require('path');
const gulpSequence = require('gulp-sequence');
const merge = require('merge2');
const fs = require('fs');
const fse = require('fs-extra');
const url = require('url');
const proxy = require('proxy-middleware');
const through = require('through2');
const gutil   = require('gulp-util');
const log     = gutil.log;
const colors  = gutil.colors;
//babel
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
// angular
const templateCache = require('gulp-angular-templatecache');
const gulpNgConfig = require('gulp-ng-config');
const ngAnnotate = require('gulp-ng-annotate');
var env = process.env;
var appPath = path.join('./');
const APP_MODULE = 'caClient';
const APP_CONFIG_MODULE = 'caClient.appConfig';

const imageSources = [
    'images/**/*'
];

const loadCssSources = [
    'node_modules/fg-loadcss/src/cssrelpreload.js'
    ,'node_modules/fg-loadcss/src/onloadCSS.js'
    ,'node_modules/fg-loadcss/src/loadCSS.js'
];

const libsSources = [
    'node_modules/jquery/dist/jquery.min.js'
    ,'node_modules/semantic-ui-css/semantic.min.js'
    ,'node_modules/css-browser-selector/css_browser_selector.min.js'
    ,'node_modules/intl-tel-input/build/js/intlTelInput.js'
    ,'node_modules/intl-tel-input/build/js/utils.js'
    //load jquery with plugins before angular
    ,'node_modules/angular/angular.js'
    ,'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
    ,'node_modules/@uirouter/angularjs/release/stateEvents.min.js'
    ,'node_modules/angular-cookies/angular-cookies.min.js'
    ,'node_modules/angular-gettext/dist/angular-gettext.min.js'
    ,'node_modules/angular-recaptcha/release/angular-recaptcha.min.js'
    ,'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ,'node_modules/ng-intl-tel-input/dist/ng-intl-tel-input.js'
];

const scriptSources = [
    'src/**/app.js'
    ,'src/**/*.js'
];

const templateSources =  [
    'src/**/*.html'
    ,'!src/index.html'
];

const styleSources = [
    'node_modules/semantic-ui-css/semantic.min.css'
    ,'node_modules/intl-tel-input/build/css/intlTelInput.css'
    ,'src/**/*.css'
];

const optionsSources = [
    'src/options/**/*'
];

const distPath = path.join(appPath, 'dist');

const configPath = path.join(appPath, 'src', 'stages', env.STAGE + '.json');

if (fs.existsSync(configPath)) {
    log('Using config file %s', configPath);
} else {
    throw(new Error(`No config file at path '${configPath}'`));
}

//          MAIN TASKS
gulp.task('load-css-lib', function (cb) {
    //use pump for nice errors with filenames and line numbers
    pump([
            gulp.src(loadCssSources)
            ,concat('loadcss.js')
            ,uglify()
            ,gulp.dest(distPath)
        ],
        cb
    );
});

gulp.task('libs', function () {
    return gulp.src(libsSources)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(distPath));
});

gulp.task('templates', function (cb) {
    //use pump for nice errors with filenames and line numbers
    pump([
            gulp.src(templateSources)
            ,templateCache('templates.js', {
                module: APP_MODULE
            })
            ,gulp.dest(distPath)
        ],
        cb
    );
});

function getNgConfigPipe() {
    return gulp.src(configPath)
        .pipe(gulpNgConfig(APP_CONFIG_MODULE));
}

gulp.task('scripts:prod', function (cb) {
    //use pump for nice errors with filenames and line numbers
    pump([
            merge(gulp.src(scriptSources), getNgConfigPipe())
            ,sourcemaps.init()
            ,babel()
            ,ngAnnotate()
            ,concat('sources.js')
            ,uglify()
            ,sourcemaps.write('.')
            ,gulp.dest(distPath)
        ],
        cb
    );
});

gulp.task('scripts', function (cb) {
    //use pump for nice errors with filenames and line numbers
    pump([
            merge(gulp.src(scriptSources), getNgConfigPipe())
            ,sourcemaps.init()
            ,babel()
            ,ngAnnotate()
            ,concat('sources.js')
            ,sourcemaps.write('.')
            ,gulp.dest(distPath)
        ],
        cb
    );
});

gulp.task('copy_options', function () {
    return gulp.src(optionsSources)
        .pipe(gulp.dest(path.join(distPath,'options')));
});

gulp.task('indexhtml', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(distPath));
});

gulp.task('styles:prod', function (cb) {
    pump([
        gulp.src(styleSources)
        ,concat('styles.css')
        ,replace({
            patterns: [
                {
                    json: fse.readJsonSync(configPath)
                }
            ]
        })
        ,purify([...libsSources,...scriptSources, ...templateSources,'index.html'])
,gulp.dest(distPath)
],
    cb
);
});

gulp.task('styles', function (cb) {
    pump([
            gulp.src(styleSources)
            ,concat('styles.css')
            ,replace({
                patterns: [
                    {
                        json: fse.readJsonSync(configPath)
                    }
                ]
            })
            ,gulp.dest(distPath)
        ],
        cb
    );
});

//              IMAGES TASK
gulp.task('images', function () {
    return gulp.src(imageSources)
        .pipe(gulp.dest(path.join(distPath, 'images')))
});

//              FONTS TASK
gulp.task('fonts', function () {
    return gulp.src(path.join(appPath, 'fonts', '*'))
        .pipe(gulp.dest(path.join(distPath, 'fonts')))
});
//              ICONS TASK
gulp.task('icons', function () {
    return gulp.src(path.join(appPath, 'icons', '*'))
        .pipe(gulp.dest(path.join(distPath, 'icons')));
});

gulp.task('clean', function () {
    return gulp.src(distPath, {read: false})
        .pipe(clean());
});

function rmOrig() {
    return through.obj(function(file, enc, cb) {

        if (file.revOrigPath) {
            log(colors.red('DELETING'), file.revOrigPath);
            fs.unlink(file.revOrigPath, function(err) {
                // TODO: emit an error if err
            });
        }

        this.push(file); // Pass file when you're done
        return cb() // notify through2 you're done
    });
}

gulp.task('revision', function(){
    return  gulp.src([
        path.join(distPath,'**','*.css')
        ,path.join(distPath,'**','*.js')
        ,path.join(distPath,'**','*.map')
    ])
        .pipe(rev())
        .pipe(gulp.dest(distPath))
        .pipe(rmOrig())
        .pipe(rev.manifest())
        .pipe(gulp.dest(distPath));
});

gulp.task('revreplace', ['revision'], function(){
    var manifest = gulp.src(path.join(distPath,'rev-manifest.json'));

    return gulp.src('src/index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(distPath));
});

//          WATCH TASKS
gulp.task('watch:scripts', function () {
    gulp.watch(scriptSources, ['scripts']);
});
gulp.task('watch:templates', function () {
    gulp.watch(templateSources, ['templates']);
});
gulp.task('watch:styles', function () {
    gulp.watch(styleSources, ['styles']);
});
gulp.task('watch:indexhtml', function () {
    gulp.watch('src/index.html', ['indexhtml']);
});

gulp.task('watch', ['watch:scripts', 'watch:templates', 'watch:styles','watch:indexhtml']);

//          TOP TASKS
gulp.task('copy_static', ['images','fonts','icons']);

// BASE
gulp.task('default', gulpSequence(['copy_static','copy_options','scripts','templates','styles','libs','load-css-lib']));
gulp.task('prod', gulpSequence(['copy_static','copy_options','scripts:prod','templates','styles:prod','libs','load-css-lib']));
gulp.task('dev-default', gulpSequence('clean', ['default','indexhtml']));

//BUILDS
gulp.task('dev', gulpSequence('dev-default',['serve', 'watch']));
gulp.task('dev-min', gulpSequence('clean', ['prod','indexhtml'],['serve', 'watch']));
gulp.task('dev-remote', gulpSequence('dev-default','watch'));
gulp.task('build', gulpSequence('clean','prod','revreplace'));


// SERVE

const HOST = '0.0.0.0';
const PORT = 443;
var proxyOptions = url.parse(env.PROXY_API || 'https://dev-api-app.caseactive.net');

proxyOptions.route = '/api';
proxyOptions.cookieRewrite = HOST;

gulp.task('serve', serve({
    root: './dist',
    hostname: HOST,
    port: PORT,
    https: true,
    middleware: proxy(proxyOptions)
}));
