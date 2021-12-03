/** @format */

const { MessageEmbed, Channel, Util, SystemChannelFlags } = require("discord.js");

const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "emojisteal",
    description: "Steal some emojis",
    permission: "MANAGE_EMOJIS_AND_STICKERS",
    category: "Moderator",
    cmdArgument: "[Emoji1] (Emoji2) (Emoji3) ...",

    async run(message, args, client) {

        const checkmark = "<a:Animated_Checkmark:915676504480972840>"
        const error = "<a:Animted_Cross:915676506389364768>"

        let emojis = message.guild.emojis.cache;

        let boost = message.guild.premiumTier;
        let maxPNG;
        let maxGIF;



        if (boost === 'NONE') {
            maxPNG = 50;
            maxGIF = 50;
        }
        else if (boost === 'TIER_1') {
            maxPNG = 100;
            maxGIF = 100;
        }
        else if (boost === 'TIER_2') {
            maxPNG = 150;
            maxGIF = 150;
        }
        else if (boost === 'TIER_3') {
            maxPNG = 250;
            maxGIF = 250;
        }

        const emojiEmbed = new MessageEmbed()
        const failEmbed = new MessageEmbed()
        const failEmbed2 = new MessageEmbed()

        if (!args.length) return message.channel.send(`You need to provide atleast one or more emojis to steal!`)


        for(rawEmoji of args) {

            let PNGslots = emojis.filter((emoji) => !emoji.animated).size;
            let GIFslots = emojis.filter((emoji) => emoji.animated).size

            const parsedEmoji = Util.parseEmoji(rawEmoji);
            if (parsedEmoji.id) {

                const extension = parsedEmoji.animated ? ".gif" : ".png";
                let url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}${extension}`
                stringURL = url.toString();
                if (stringURL.includes(".png")) {
                    failEmbed
                        .setDescription(`${error} Failed to steal the emoji [${parsedEmoji.name}]!\nError: ${PNGslots} of ${maxPNG} PNG emotes!`)
                        .setAuthor({ name: `${parsedEmoji.name}`, iconURL: `${url}` })

                    if (PNGslots === maxPNG) return message.reply({ embeds: [failEmbed] })
                    

                }
                if (stringURL.includes(".gif")) {
                    failEmbed2
                        .setDescription(`${error} Failed to steal the emoji [${parsedEmoji.name}]!\nError: ${GIFslots} of ${maxGIF} GIF emotes!`)
                        .setAuthor({ name: `${parsedEmoji.name}`, iconURL: `${url}` })
                    if (GIFslots === maxGIF) return message.reply({ embeds: [failEmbed2] });
                }

                await message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => (emojiEmbed
                        .setDescription(`${checkmark} Emoji [${emoji.name}] successfully stolen!`)
                        .setFooter(`${emojis.filter((emoji) => emoji.animated).size}/${maxGIF} .gif & ${emojis.filter((emoji) => !emoji.animated).size}/${maxPNG} .png!`)
                        .setAuthor({ name: `${emoji.name}`, iconURL: `${emoji.url}` }), message.reply({ embeds: [emojiEmbed] })

                    ))
            } else { message.channel.send("You need to enter an valid emoji!") }
        }
    }
})