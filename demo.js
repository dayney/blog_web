const spawn = require('cross-spawn')

spawn('ls', ['-la'],{
  stdio: 'inherit'
 });
