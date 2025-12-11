import { icon } from "#functions";
import {
  createEmbed,
  createEmbedAuthor,
  createEmbedFooter,
  createLinkButton,
  createRow,
} from "@magicyan/discord";
import { codeBlock, Guild, type InteractionReplyOptions } from "discord.js";

interface ConnectProps {
  guild: Guild;
  ip: string;
  status: string;
  players: {
    playing: number;
    max: number;
  };
  lastUpdate: Date;
}

export function mainMenu<R>(data: ConnectProps): R {
  const { guild, ip, status, players, lastUpdate } = data;

  const embed = createEmbed({
    color: constants.colors.primary,
    author: createEmbedAuthor(guild, {
      prefix: "Conexão - ",
    }),
    fields: [
      { name: `${icon.connection} Conexão`, value: codeBlock(ip) },
      { name: `${icon.status} Status`, value: codeBlock(status), inline: true },
      {
        name: `${icon.players} Jogadores`,
        value: codeBlock(`${players.playing}/${players.max}`),
        inline: true,
      },
    ],
    footer: createEmbedFooter({
      text: `As informações são atualizadas a cada 3 minuto • ${lastUpdate.getHours()}:${lastUpdate.getMinutes()}`,
    }),
  });

  const components = [
    createRow(
      createLinkButton({
        url: `https://${ip}`,
        label: "Jogar Agora",
      })
    ),
  ];

  return {
    flags: ["Ephemeral"],
    embeds: [embed],
    components,
  } satisfies InteractionReplyOptions as R;
}
