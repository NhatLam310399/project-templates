module.exports = {
  apps: [
    {
      name: "kingify-admin-react-typescript-tailwind",
      script: "PORT=4431 serve -s build",
      args: "one two",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "200M",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
