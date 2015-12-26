module.exports = function(grunt) {
    grunt.initConfig({
        sshconfig: {
            'server': {
                host: process.env.SSH_HOST,
                username: process.env.SSH_USER,
                password: process.env.SSH_PASSWORD,
                port: process.env.SSH_PORT
            }
        },
        sshexec: {
            deploy: {
                command: [
                    'cd /var/www/riplive_instagram',
                    'git pull origin master',
                    'npm install --dev',
                    'forever restartall',
                    'forever list'
                ].join(' && '),
                options: {
                    config: 'server'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ssh');

    grunt.registerTask('deploy', [
        'sshexec:deploy'
    ]);
};
