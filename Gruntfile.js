module.exports = function(grunt) {
  grunt.initConfig({
    sshconfig: {
      'onair.riplive.it': {
      	host: 'onair.riplive.it',
        username: 'rip',
        password: 'rip_admin2013',
        port : 5430
      }
    },
    sshexec: {
      deploy: {
        command: [
          'cd /var/www/riplive_instagram',
          'git pull origin master',
          'npm install',
          'forever restartall',
          'forever list'
        ].join(' && '),
        options: {
          config: 'onair.riplive.it'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('deploy', [
    'sshexec:deploy'
  ]);
};