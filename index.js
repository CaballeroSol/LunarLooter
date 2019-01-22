/*
* The developer of this Discord bot is CaballeroSol345, but special thanks to Tom Spander and oolivero45 for all the help when I needed it
* This is my first ever coding project, so if you are seeing this, tell me if you see anything wrong or can be refined
*/
const Discord = require('discord.js');
const prefix = "/";
const bot = new Discord.Client();
const symbols = {0: ":tangerine:", 1: ":moneybag:",  2: ":apple:", 3: ":lemon:", 4: ":grapes:", 5: ":tangerine:", 6: ":moneybag:", 7: ":strawberry:", 8: ":eggplant:", 9: ":tomato:", 10: ":cherries:", 11: ":moneybag:"};
const OWNER = "263700837606359040";
var cooldown = 0;
const token = "";
const fs = require('fs')
const color = {2: ":black_circle:", 1: ":red_circle:", 0: ":green_heart:", 3: ":red_circle:", 4: ":black_circle:", 5: ":red_circle:", 6: ":black_circle:", 7: ":red_circle:", 8: ":black_circle:", 9: ":red_circle:", 10: ":black_circle:", 12: ":black_circle:", 11: ":red_circle:", 14: ":black_circle:", 13: ":red_circle:", 16: ":black_circle:", 15: ":red_circle:", 18: ":black_circle:", 17: ":red_circle:", 19: ":red_circle:", 20: ":black_circle:", 21: ":red_circle:", 22: ":black_circle:", 23: ":red_circle:", 24: ":black_circle:", 25: ":red_circle:", 26: ":black_circle:", 27: ":red_circle:", 28: ":black_circle:", 30: ":black_circle:", 29: ":red_circle:", 32: ":black_circle:", 31: ":red_circle:", 34: ":black_circle:", 33: ":red_circle:", 36: ":black_circle:", 35: ":red_circle:"};
const hand = {1:"fist", 2: "raised_hand", 3: "v"};
const door = {1: "goat", 2: "car", 3: "goat"};
var waitTime = 5;
const bullet = {0: "⠀:black_circle::black_circle:\n:white_circle:⠀>:black_circle:<\n⠀:black_circle::white_circle:", 1: "⠀:black_circle::black_circle:\n:black_circle:⠀>:white_circle:<\n⠀:white_circle::black_circle:", 2: "⠀:black_circle::white_circle:\n:black_circle:⠀>:black_circle:<\n⠀:black_circle::white_circle:", 3: "⠀:white_circle::black_circle:\n:black_circle:⠀>:white_circle:<\n⠀:black_circle::black_circle:", 4: "⠀:black_circle::white_circle:\n:white_circle:⠀>:black_circle:<\n⠀:black_circle::black_circle:", 5: "⠀:white_circle::black_circle:\n:black_circle:⠀>:black_circle:<\n⠀:white_circle::black_circle:", 6: "⠀:black_circle::black_circle:\n:white_circle:⠀>:black_circle:<\n⠀:black_circle::white_circle:", 7: "⠀:black_circle::black_circle:\n:black_circle:⠀>:white_circle:<\n⠀:white_circle::black_circle:"};
const winMsg = "**Congratz**, you won §", loseMsg = "*Sorry*, but you lost §", jackpotMsg = "***Congradulations***, you won big with §", formatErrMsg = ":x: **Proper command format: ** ", roleErrMsg =":no_entry_sign: You do not have sufficient enough permissions to execute this command.", dmNotificationMsg = "**NOTIFICATION**\nCheck your direct messages from me to see the list of commands you can use", seperateMsg = "~~⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀~~\n";
const updateVersion = "V3.1";

process.on('unhandledRejection', (error) => {
    console.error(error);
});

bot.on("ready", () => {
    console.log("I am ready.");
});

bot.on('guildCreate', guild => {
    guild.ownerID.send("Thank you for adding me to **" + guild.name + "**. Use /help to get the full list of commands you can use and for any other information, use the website that will be out soon.")
});

bot.on('guildMemberAdd', (member, guild) => {
    member.sendMessage(`Hello, I'm Lunar Looter! Welcome to **${member.guild.name}**, ${member.user.username}! If you need a list of commands, do /help and /rules for more information. Have fun!`);
    console.log(`${member.user.username} has joined ${member.guild.name}`);
});

bot.on('guildMemberRemove', (member, guild) => {
    member.send(`Good bye, ${member.user.displayName}, from **${member.guild.name}** but I hope to see you again.`);
    console.log(`${member.user.username} has left ${member.guild.name}`)
});

// This is the main part of the bot
bot.on("message", message => {

    if (message.author.bot == 1) {
        return;
    }

    //          INFORMATION COMMANDS
    if (message.content === "/updatelog") {
        var updateMsg = "**Lunar Looter" + updateVersion + "**\n Completely shifted the way Lunar Looter is, instead of a moderation and game bot, Lunar will now be entirely a game bot\n Developing new ways of how Lunar communicates with you, meaning different messages each time. This is meant to build a personality \n- Added new system for points to be stored\n- Added /updatelog\n- Added /help notification, and more will come for commands that send DM\n- The credit commands does not @ people anymore, but instead just says the user name of the credited\n- Fixed minor bugs here and there";
        if (message.channel.type === "dm") {
            message.author.send(updateMsg);
            return;
        }
        message.channel.send(dmNotificationMsg).then(notificationDelete => {
            message.author.send(updateMsg);
            setTimeout(function() {
                notificationDelete.delete();
            }, 10000);
        });
    }

    // All the information the average person needs to know about the bot
    if (message.content === "/help") {
        var introMsg = ("My commands ⌨\n");
        var basicMsg = ("**Informational** ℹ\n    **/achievements** - gives the list of achievements [Not Implemented Yet]\n    **/info** - gives the bot version and credit to all that have worked on the bot\n    **/help** - dms you the list of commands\n    **/rules** - dms you the rules\n    **/bal** - give the amount of points you have\n**Games** 🎰\n    **/rroulette [amount]** - used to play russian roulette, winning gets x3 and losing x10, because you died\n    **/slotmachine [amount]** - used to roll a slot machine, winning gets x2 jackpots x3\n    **/roulette [color] [amount]** - spins a roulette game, black and red are x2 if you win, green is x10\n    **/rps [rock|paper|scissors] [amount]** - play Rock, Paper, Scissors with the bot and winning doubles your gambled amount\n**Other** 📦\n    **/avatar** - gets your avatar\n    **/coinflip** - flips a coin\n    **/roll [numberOfSides]** - rolls a die with the amount of sides given\n**P.S.** 🔖\n *Only /help and /info can be used in DMs*");
        message.author.send(introMsg + basicMsg);
        if (message.channel.type !== "dm") {
          message.delete();
        }
    }

    // Give credit to the coders of this bot
    if (message.content == "/info" || message.content == "/credit" || message.content === "/credits") {
            var creditLog = {embed:
            {author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL },
                title: "Lunar Looter " + updateVersion,
                fields: [{
                    color: "00ff00",
                    name: "**Lead programmer**",
                    value: "CaballeroSol\n[Instagram](https://www.instagram.com/caballerosol345/)        [Twitter](https://twitter.com/CaballeroSol345)"
                },
                {
                    name: "Special Thanks",
                    value: "Tom Spander\nHelps me whenever I need help coding this bot\n[Youtube](https://www.youtube.com/user/SubwayTrains)        [Instagram](https://www.instagram.com/tspander/)        [Twitter](https://twitter.com/tspander)\noolivero45\nHelping me start this project and helping along the way\n[Twitter](https://twitter.com/oolivero45)        [Website](http://olivercjcox.uk/)\nMarsel\nProviding parts of his code\n[VK](https://vk.com/i3baltic)\nDave Lightman\nCreated the picture for the bot\n*N/A*\n**And thank you to all that test my bot**"
                }
                ],
                timestamp: new Date(),
                footer: { icon_url: "https://cdn.discordapp.com/attachments/377209438441832448/377209650061508610/pixil-frame-0_4.png", text: "CaballeroSol" }
            }
        };
        if (message.channel.type === "dm") {
            message.author.send(creditLog);
            return;
        }
        message.channel.send(dmNotificationMsg).then(notificationDelete => {
            message.author.send(creditLog);
            setTimeout(function() {
                notificationDelete.delete();
            }, 10000);
        })
    }

    // Makes sure the chat is not in DM's or else the bot would crash
    if (message.channel.type === "dm") {
        return;
    }

    if (message.content === "/achievements") {
        var achievementsMsg = ":trophy: **Achievements**\n    **N/A**";
        message.author.send(achievementsMsg);
    }

    // Informs the user that the bot is on by responding
    if (message.content === 'ping' && message.author.id === message.guild.ownerID) {
        message.channel.send(':inbox_tray: Pinging').then(sent => {
        sent.edit(`:outbox_tray: Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
        })
    };

    //          GAME & POINT COMMANDS
    if (message.content === "/casino" || message.content === "/games") {
        message.channel.send("**Casino Menu**\n*Please wait until the reactions have finished.*\n \n⚫ - Roulette\n🔫 - Russian Roulette\n🎰 - Slotmachine\n✋ - Rock, Paper, Scissors\n❌ - close this menu").then(message =>  {
            message.react("❌");
            message.react("✋");
            message.react("🎰");
            message.react("🔫");
            message.react("⚫");
        })
    }

    // This is a casino command that edits the message to animate the movement of the wheels
    if (message.content.split(" ")[0] === "/slotmachine") {
        if (!/^\/slotmachine \d+$/.test(message.content)) {
            message.channel.send(formatErrMsg + "*/slotmachine [amount]*.");
            return;
        }
        var gambled = parseInt(message.content.split(" ")[1]);
        if (gambled >= getScore(message.author.id)) {
            message.channel.send(":x: You cannot afford to gamble this amount.");
        } else if (gambled > 0) {
            var a = Math.ceil(Math.random() * 5), b = Math.ceil(Math.random() * 5), c = Math.ceil(Math.random() * 5);
            var hash = "***--------------------***\n", line1 = "⠀" + symbols[a - 1] + " **|** " + symbols[b - 1] + " **|** " + symbols[c - 1] + "\n", line2 = ">" + symbols[a] + " **|** " + symbols[b] + " **|** " + symbols[c] + "< \n", line3 = "⠀" + symbols[a + 1] + " **|** " + symbols[b + 1] + " **|** " + symbols[c + 1] + "\n";
            message.channel.send(hash + line1 + line2 + line3 + hash + "⠀\n"+ hash).then(slotmachine => {
                var slotmachineMsg = slotmachine;
                for (i = 1; i <= 4; i++) {
                    setTimeout(function () {
                        a = (a + Math.floor(Math.random() * 2)) % 5 + 1, b = (b + Math.floor(Math.random() * 2)) % 5 + 1, c = (c + Math.floor(Math.random() * 2)) % 5 + 1;
                        line1 = "⠀" + symbols[a - 1] + " **|** " + symbols[b - 1] + " **|** " + symbols[c - 1] + "\n",  line2 = ">" + symbols[a] + " **|** " + symbols[b] + " **|** " + symbols[c] + "< \n", line3 = "⠀" + symbols[a + 1] + " **|** " + symbols[b + 1] + " **|** " + symbols[c + 1] + "\n";
                        slotmachine.edit(hash + line1 + line2 + line3 + hash + "⠀\n" + hash);
                    }, Math.pow(i, 2) * 250);
                }
                setTimeout(function () {
                    if (a === b && b === c) {
                        if (a === 1) {
                            var response = jackpotMsg + gambled * 4;
                            changeScore(message.author.id, gambled * 4);
                        } else {
                            var response = winMsg + gambled * 2;
                            changeScore(message.author.id, gambled * 2);
                        }
                    } else {
                        var response = loseMsg + gambled;
                        changeScore(message.author.id, -1 * gambled);
                    }
                    slotmachine.edit(hash + line1 + line2 + line3 + hash + response + "\n" + hash);
                }, 5000);
            });
        } else {
            message.channel.sendMessage(":x: Number has to be above 0");
        }
    }

    if (message.content.split(" ")[0] === "/rroulette") {
        if (!/^\/rroulette \d+$/.test(message.content)) {
            message.channel.send(formatErrMsg + "*/rroulette [amount]*.");
            return;
        }
        var gambled = parseInt(message.content.split(" ")[1]);
        if (gambled >= getScore(message.author.id)) {
            message.channel.send(":x: You cannot afford to gamble this amount.");
            return;
        }
        if (gambled > 0) {
            var a = Math.floor(Math.random() * 6) + 1;
            message.channel.send(bullet[a]).then(russianRoulette => {
                var russianMsg = russianRoulette;
                for (i = 1; i <= 5; i++) {
                    setTimeout(function () {
                        a = (a + Math.floor(Math.random() * 2)) % 6 + 1;
                        var bulletMsg = bullet[a];
                        russianRoulette.edit(bulletMsg);
                    }, Math.pow(i , 2) *125);
                }
                setTimeout(function () {
                    if (a == 1 || a == 3) {
                        var shotMsg = "\n \n:dizzy_face: :gun:, you shot yourself and lost §" + gambled * 10;
                        russianRoulette.edit(bullet[a] + shotMsg);
                        changeScore(message.author.id, -10 * gambled);
                    } else {
                       var winnerMsg = ("\n \n:smile: :ok_hand:, you just won §" + gambled * 3);
                       russianRoulette.edit(bullet[a] + winnerMsg)
                        changeScore(message.author.id, 3 * gambled);
                    }
                }, 3150);
            });
        } else {
            message.channel.sendMessage(":x: Number has to be above 0");
        }
    }

    // Another casino command that generates a random number to determine the outcome
    if (message.content.split(" ")[0] === "/roulette") {
        if (/^\/roulette (black|red|green)+ \d+$/.test(message.content)) {
            var colour = message.content.split(" ")[1];
            var gambled = parseInt(message.content.split(" ")[2]);
            if (gambled >= getScore(message.author.id)) {
                message.channel.send(":x: You cannot afford to gamble this amount.");
                return;
            }
            // Color roulette
            if (gambled > 0) {
                var a = Math.floor(Math.random() * 36), b = (a + 1) % 37, c = (b + 1) % 37, d = (c + 1) % 37, e = (d + 1) % 37, f = (e + 1) % 37, g = (f + 1) % 37, h = (g + 1) % 37, i = (h + 1) % 37, j = (i + 1) % 37;
                var wheelMsg = "⠀⠀⠀⠀⠀⠀" + color[d] +  color[e] + color[f] + color[g] + "\n" + color[a] + color[b] + color[c] + "⠀⠀^⠀⠀⠀⠀ " + color[h] + color[i] + color[j];
                message.channel.send(wheelMsg).then(roulette => {
                    var rouletteMsg = roulette;
                    for (i = 1; i <= 5; i++) {
                        setTimeout(function () {
                            a = ( a + 1 ) % 37, b = (a + 1) % 37, c = (b + 1) % 37, d = (c + 1) % 37, e = (d + 1) % 37, f = (e + 1) % 37, g = (f + 1) % 37, h = (g + 1) % 37, i = (h + 1) % 37, j = (i + 1) % 37;
                            wheelMsg = "⠀⠀⠀⠀⠀⠀" + color[d] +  color[e] + color[f] + color[g] + "\n" + color[a] + color[b] + color[c] + "⠀⠀^⠀⠀⠀⠀ " + color[h] + color[i] + color[j];
                            rouletteMsg.edit(wheelMsg);
                        }, Math.pow(i, 2) * 150);
                    }
                    setTimeout(function(){
                        if (color[e] === ":" + colour + "_heart:") {
                                rouletteMsg.edit(wheelMsg + "\nCongratz, the color was :green_heart:! You won big with §" + gambled * 4);
                                changeScore(message.author.id, gambled * 4);
                        } else if (color[e] === ":" + colour + "_circle:") {
                                rouletteMsg.edit(wheelMsg + "\nCongratz, the color was " + color[e] + "! You win §" + gambled * 1.25);
                                changeScore(message.author.id, gambled * 1.5);
                        } else if (color[e] === ":green_heart:") {
                            rouletteMsg.edit(wheelMsg + "\nSorry the color was :green_heart:, you lose §" + gambled);
                            changeScore(message.author.id, -1 * gambled);
                        } else {
                            rouletteMsg.edit(wheelMsg + "\nSorry, the color was " + color[e] + ", you lose §" + gambled);
                            changeScore(message.author.id, -1 * gambled);
                        }
                    }, 4000);
                });
            }
       // Number roulette
        } else if (/^\/roulette \d+ \d+$/.test(message.content)) {
            var guessNumber = parseInt(message.content.split(" ")[1]);
            var gambled = parseInt(message.content.split(" ")[2]);
            if (gambled >= getScore(message.author.id)) {
                message.channel.send(":x: You cannot afford to gamble this amount.");
                return;
            }
            if (guessNumber >= 0 && guessNumber <= 36) {
                var a = Math.floor(Math.random() * 36);
                if ( a === number) {
                    if ( a === 0 ) {
                        message.channel.send(jackpotMsg + gambled * 5 + " since the number was 0!");
                        changeScore(message.author.id, 5 * gambled);
                    } else {
                        message.channel.send(winMsg + gambled * 3 + " with " + a);
                        changeScore(message.author.id, 3 * gambled);
                    }
                } else {
                    message.channel.send(loseMsg + gambled + " since it was " + a);
                    changeScore(message.author.id, -1 * gambled);
                }
            } else {
                message.channel.send(":x: The number has to be between 0 and 36.")
            }
        } else {
            message.channel.send(formatErrMsg +"*/roulette [black|red|green] [amount]* **or** */roulette [0-36] [amount]*.");
            return;
        }
    }

    // Rock beats scissors, scissors beat paper, paper beats rock
    if (message.content.split(" ")[0] === "/rps") {
        if (!/^\/rps (rock|paper|scissors)+ \d+$/.test(message.content)) {
            message.channel.send(formatErrMsg + "*/rps [rock|paper|scissors] [amount]*.");
            return;
        } else {
            message.delete();
            var gambled = parseInt(message.content.split(" ")[2]);
            if (gambled > getScore(message.author.id) ) {
                message.channel.send(":x: You cannot afford this ammount");
                return;
            }
            var rps = message.content.split(" ")[1];
            if ( rps === "rock") {
                var rps1 = "fist";
            } else if ( rps === "paper") {
                var rps1 = "raised_hand";
            } else if ( rps === "scissors") {
                var rps1 = "v"
            }
            var crps = Math.floor(Math.random() * 3 ) + 1;
            var line1 = ":fist:⠀⠀⠀⠀⠀⠀:fist:\n", line2 = ":raised_hand:⠀⠀⠀⠀⠀⠀:raised_hand:\n", line3 = ":v:⠀⠀⠀⠀⠀⠀:v:\n", line4 = ":" + rps1 + ":⠀⠀⠀⠀⠀⠀:" + hand[crps] + ":\n";
            message.channel.send(line1).then(rockpaperscissors => {
                var rpsMsg = rockpaperscissors;
            setTimeout(function() {
                rpsMsg.edit(line2);
            }, 1000);
            setTimeout(function() {
                rpsMsg.edit(line3);
            }, 2000);
            setTimeout(function() {
                rpsMsg.edit(line4);
            }, 3000);
            setTimeout(function() {
                    if ((rps1 == "fist" && hand[crps] == "v")||(rps1 == "raised_hand" && hand[crps] == "fist")||(rps1 == "v" && hand[crps] == "raised_hand")) {
                        rpsMsg.edit(line4 + winMsg + gambled * 2);
                        changeScore(message.author.id, 2 * gambled);
                    } else if ( rps1 == hand[crps] ) {
                        rpsMsg.edit(line4 + "**TIE** We had the same hand");
                    } else {
                        rpsMsg.edit(line4 + loseMsg + gambled);
                        changeScore(message.author.id, -1 * gambled );
                    }
                }, 4000)
            });
        }
    }

    // Sends the person the amount of points they have
    if (message.content === "/bal") {
        var score = getScore(message.author.id);
        message.reply("you have §" + score + " .");
        message.delete();
    }

    // Get's the number of points the @ed person has
    if (/^\/bal <@!?\d+>/.test(message.content) && message.author.id === message.guild.ownerID) {
        var lookupUser = message.mentions.users.first();
        var score = getScore(lookupUser.id);
        message.channel.send(lookupUser + " has §" + score + " .");
        message.delete();
    }

    // Adds a number of points to the @ed person's amount of points
    if (/^<@!?\d+> [+-]?\d+pts/.test(message.content) && message.author.id === message.guild.ownerID) {
        var lookupUser = message.mentions.users.first();
        var score = changeScore(lookupUser.id, message.content.split(" ")[1].replace("pts", ""));
        message.channel.send(lookupUser + "'s balance has been changed to §" + score + " " + message.content.split("pts")[1] + ".");
        message.delete();
    }

    // Just flips a coin
    if (message.content === "/coinflip") {
        var a = Math.floor(Math.random() * 2) + 1;
        if (a == 1) {
            message.channel.sendMessage(":bust_in_silhouette: Heads :bust_in_silhouette:");
        } else {
            message.channel.sendMessage(":snake: Tails :snake:");
        }
    }

    // Rolls a dice with the listed amount of sides
    if (message.content.split(" ")[0] === "/roll") {
        if (!/^\/roll \d+$/.test(message.content)) {
            message.channel.send(formatErrMsg + "*/roll [amountOfSides]*.");
            return;
        }
        var amountOfSides = parseInt(message.content.split(" ")[1]);
        if ( amountOfSides < 6 || amountOfSides > 120) {
            message.channel.send(":x: The amount of Sides should be more than 5 and less than 120.");
            return;
        }
        var chosenSide = Math.floor(Math.random() * amountOfSides) + 1;
        message.channel.send(":game_die: It landed on " + chosenSide);
    }

});

// get the score of the user with the user ID
function getScore(userID) {
    var scoreR = 0;
    var file = fs.readFileSync('userData/pointdatabase.txt', "UTF-8");
    var scores = file.split(";");
    for (i = 0; i < scores.length; i++) {
        var score = scores[i].split(":");
        if (score[0] === userID && !scoreR) {
            scoreR = score[1];
        }
    }
    return scoreR;
}


// change the score of the user with the given ID
function changeScore(userID, score) {
    var file = fs.readFileSync('userData/pointdatabase.txt', "UTF-8");
    var scores = file.split(";");
    var pos1 = 0;
    var pos2 = 0;
    var newFile = "";
    var found = 0;
    for (i = 0; i < scores.length; i++) {
        oscore = scores[i].split(":");
        if (oscore[0] === userID) {
            var oldScore = parseInt(oscore[1]);
            var newScore = oldScore + parseInt(score);
            try {
                oscore[1] = newScore;
                found = true;
            } catch (err) {
            }
        }
        if (/\d+/.test(oscore[0])) {
            newFile = newFile + oscore[0] + ":" + oscore[1] + ";";
        }
    }
    if (!(found)) {
        var newScore = score;
        newFile = newFile + userID + ":" + score + ";";
    }
    var write = fs.writeFileSync('userData/pointdatabase.txt', newFile);
    return newScore;
}

bot.login(token);
