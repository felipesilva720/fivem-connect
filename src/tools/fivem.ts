import { env } from "#env";
import FiveM from "fivem-server-api";

export const server = new FiveM(env.FIVEM_CONNECT_IP);

export function getServerCfx() {
  return "cfx.re/join/djoq65";
}

export async function getServerData() {
  const status = await server.getServerStatus();
  const allPlayers = await server.getPlayersAll();

  return {
    ip: getServerCfx(),
    status: status.online ? "🟢 Online" : "🔴 Offline",
    players: {
      playing: allPlayers.length,
      max: await server.getMaxPlayers(),
    },
  };
}
