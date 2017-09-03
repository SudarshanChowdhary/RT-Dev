module.exports = function (cb) {
  return function (err) {
    //if any error happened in the previous tasks, exit with a code > 0
    if (err) {
      var exitCode = 2;
      console.log('[ERROR] gulp build task failed', err.message);
      console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
      return process.exit(exitCode);
    }
    else {
      return cb();
    }
  };
};