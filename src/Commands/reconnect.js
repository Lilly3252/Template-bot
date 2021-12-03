/** @format */

const { MessageEmbed, Channel } = require("discord.js");

const Command = require("../Structures/Command.js");

const Client = require("../Structures/Client.js");

const client = new Client();

const config = require("../Data/config.json");
const uptime = require("./uptime.js");


module.exports = new Command({
    name: "reconnect",
    description: "Restarts the bot!",
    permission: "MANAGE_GUILD",
    category: "Owner",
    cmdArgument: " ",



    async run(message, args, client) {

        finishEmbed = new MessageEmbed()
            .setTitle('Reconnect done!')
            .setColor("GREEN")
            .setDescription(`Finished restarting: ${client.user.tag}`)
            .setTimestamp()


        restartEmbed = new MessageEmbed()
            .setTitle('Bot reconnected!')
            .setColor("ORANGE")
            .setDescription(`${client.user.tag} will be restarted!`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`);

        await message.channel.send({ embeds: [restartEmbed] })
        .then(async () => {
            await client.destroy(); 

            
            setTimeout(function(){
            client.login(config.token);
              
         console.log("Successfully reconnected the bot!")
           
         
            }, 5000)
            
          }
          
        ,message.channel.send({embeds: [finishEmbed]})

            
        )}})