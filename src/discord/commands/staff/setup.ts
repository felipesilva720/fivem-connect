import { createCommand } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { getServerData } from "#tools";
import { createLoopInterval, toMs } from "@magicyan/discord";
import { ApplicationCommandOptionType, ChannelType } from "discord.js";

createCommand({
  name: "setup",
  description: "Setup de conexão",
  defaultMemberPermissions: ["Administrator"],
  options: [
    {
      name: "conexão",
      description: "Enviar o setup de conexão ao servidor",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "canal",
          description: "Canal onde será enviado o setup",
          type: ApplicationCommandOptionType.Channel,
          channelTypes: [ChannelType.GuildText],
          required,
        },
      ],
    },
  ],
  async run(interaction) {
    const { options, guild } = interaction;
    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "conexão": {
        const channel = options.getChannel("canal", true, [
          ChannelType.GuildText,
        ]);

        const data = await getServerData();

        await channel
          .send(
            menus.connect.main({
              guild,
              ...data,
              lastUpdate: new Date(),
            })
          )
          .then(async (message) => {
            createLoopInterval({
              array: [],
              time: toMs(3, "minutes"),
              async run() {
                const data = await getServerData();

                await message.edit(
                  menus.connect.main({
                    guild,
                    ...data,
                    lastUpdate: new Date(),
                  })
                );
              },
            });

            await interaction.reply(
              res.success("Parabéns, o setup foi enviado")
            );
          })
          .catch(async (err) => {
            console.error(err);
            await interaction.reply(
              res.danger("Desculpe, não foi possível enviar o setup")
            );
          });
        return;
      }
    }
  },
});
