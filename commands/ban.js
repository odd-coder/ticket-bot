const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a person.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Membro banido')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
      .setDescription('Reason for ban')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'You don\'t have the necessary permission to run this command! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'The person you want to banish is above you!',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'The person you want to banish is above me! So I can\'t banish it.',
      ephemeral: true
    });

    if (interaction.options.getString('reason')) {
      user.ban({
        reason: interaction.options.getString('reason'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Has been successfully banned!`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Has been successfully banned!`
      });
    };
  },
};