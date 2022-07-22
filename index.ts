import { config } from "dotenv";
config();

import { Server } from "./Server/server";

const server = new Server();
server.listen();

