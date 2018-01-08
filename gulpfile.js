'use strict';
const g = require('gulp'), $ = require('gulp-load-plugins')
/* <-- switcher for debugging
({DEBUG:true});/*/({DEBUG:false});//*/

const def = 'default', lint = 'jslint', test = 'test', tdd = 'tdd';

const seq = [lint,test,def];

function errorHandler(err) {
  console.log(err);
  this.emit('end');
}

g.task(def, seq);

g.task(tdd, () => {
  g.start(lint, test);
  g.watch(['!node_modules','!node_modules/**','./*.js'], [lint]);
  g.watch(['masker.js', 'test.mocha.js'], [test]);
});

g.task(lint, () =>
  g.src(['!node_modules','!node_modules/**','./masker.js'])
   .pipe($.plumber({errorHandler: errorHandler}))
   .pipe($.jslint())
);

g.task(test, () =>
  g.src('test.mocha.js', {read: false})
   .pipe($.plumber({errorHandler: errorHandler}))
   .pipe($.mocha())
   .pipe($.istanbul.writeReports())
);
