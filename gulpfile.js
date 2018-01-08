const g = require('gulp'), $ = require('gulp-load-plugins')
/* <-- switcher for debugging
({DEBUG:true});/*/({DEBUG:false});//*/

const def = 'default', lint = 'jslint', test = 'test', tdd = 'tdd';

const seq = [lint,test,def];

g.task(def, seq);

g.watch(['**/*.js'], [lint]);

g.task(tdd, () => 
  g.start(lint, test)
   .watch(['masker.js', 'test.mocha.js'], [test]));

g.task(lint, () =>
  g.src(['!node_modules','!node_modules/**','./masker.js'])
   .pipe($.jslint())
);

g.task(test, [lint], () =>
  g.src('test.mocha.js', {read: false})
   .pipe($.mocha())
   .pipe($.istanbul.writeReports())
);
