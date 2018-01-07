const g = require('gulp');
const $ = require('gulp-load-plugins')
/* <-- switcher for debugging
({DEBUG:true});/*/({DEBUG:false});//*/

const def = 'default', lint = 'jslint', test = 'test';

const seq = [lint,test,def];

g.task(def, seq);

g.watch(['*.js'], [lint]);
g.watch(['masker.js', 'test.mocha.js'], [test]);

g.task(lint, function () {
  g.src('masker.js')
   .pipe($.jslint());
});

g.task(test, function () {
  g.src('test.mocha.js', {read: false})
   .pipe($.mocha());
});

