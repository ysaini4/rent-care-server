const cluster = require("cluster");
const express = require("express");
const app = express();
const cpu = require("os").cpus();
const numCPUs = cpu.length;
require("./startup/db")();
require("./startup/cloudnary")();
require("./startup/routes")(app);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(numCPUs, "hh");
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`server is listening at ${port}`);
  });
  console.log(`Worker ${process.pid} started`);
}
