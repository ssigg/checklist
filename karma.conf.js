module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/mockfirebase/browser/mockfirebase.js',
            'bower_components/angularfire/dist/angularfire.js',
            'bower_components/underscore/underscore.js',
            'app/config_sample.js',
            'app/app.js',
            'app/components/*/*.js',
            'app/*/*.js'
        ],

        preprocessors: {
            'app/{components/*/!(*_test).js,*/!(*_test).js}': ['coverage']
        },

        reporters: ['progress', 'coverage'],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage'
        }
    });
};
