module.exports = {
  apps: [
    {
      name: 'JCWD-0208-03', // Format JCWD-{batchcode}-{groupnumber}
      script: './apps/api/dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 2803,
      },
      time: true,
    },
  ],
};
