const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "Nzc3MTIxMzU5NjQ5MzA4Njc0.X6-0qg.mG473YTF5EL-dvbyIeXbRRpgDbo";
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '= 도와줘 를 쳐보세요.' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '= 핑') {
    return message.reply('퐁');
  }

  if(message.content == 'embed') {
    let img = 'https://media.discordapp.net/attachments/777122293545173015/781502425122865222/image00.png';
    let embed = new Discord.RichEmbed()
      .setTitle('좋아하는 게임')
      .setURL('https://media.discordapp.net/attachments/777122293545173015/781502425122865222/image00.png')
      .setAuthor('WiNer', img, 'https://media.discordapp.net/attachments/777122293545173015/781502425122865222/image00.png')
      .setThumbnail(img)
      .addBlankField()
      .addField('BATTLEGROUND', '내가 사랑하는 게임')
      .addField('OVERWATCH', '배그 점검이나 심심할떄 하는게임', true)
      .addField('SUDDEM ATTACK', 'ㅈㄴ 심심할떄 하는게임', true)
      .addField('-- 제품현황 --', '인제부터 제품 목록', true)
      .addField('HOBBANG HACK', '에데니티1\n언리쉬드2\n블랙(강추)3\nHART4\n스트리밍5\n스페인\n스컬6\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('호빵맨 구매문의.', img)

    message.channel.send(embed)
  } else if(message.content == '= 도와줘') {
    let helpImg = 'https://media.discordapp.net/attachments/777122293545173015/781502425122865222/image00.png';
    let commandList = [
      {name: '= 도와줘', desc: '당신이 보고 있는것.'},
      {name: '= 핑', desc: '현재 핑 상태'},
      {name: '= embed', desc: 'embed 예제1'},
      {name: '= 공지2', desc: 'dm으로 전체 공지 보내기'},
      {name: '= 공지', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
      {name: '= 청소', desc: '텍스트 지움'},
      {name: '= 코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '= 코드2', desc: '봇이 들어가있는 모든 채널의 초대 코드 표기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('= 도와줘 of 호빵맨 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`호빵맨 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '=코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '= 코드') {
    if(message.channel.type == 'dm') {
      return message.reply('```dm에서 사용할 수 없는 명령어 입니다.```');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('= 공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of 호빵맨 BOT')
        .setColor('#186de6')
        .setFooter(`호빵맨 BOT ❤️`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('```공지를 전송했습니다.```');
    } else {
      return message.reply('```채널에서 실행해주세요.```');
    }
  } else if(message.content.startsWith('=공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지2'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('```공지를 전송했습니다.```');
    } else {
      return message.reply('```채널에서 실행해주세요.```');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('```dm에서 사용할 수 없는 명령어 입니다.```');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('= 청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("```1부터 100까지의 숫자만 입력해주세요.```")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "```개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)```");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);