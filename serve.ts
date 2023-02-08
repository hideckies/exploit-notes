import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(notFound({
  root: `${Deno.cwd()}/_site`,
  page404: "/404",
}));

server.start();

console.log("Listening on http://localhost:8000");