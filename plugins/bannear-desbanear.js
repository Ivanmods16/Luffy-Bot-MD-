// 

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]

  if (!chat) global.db.data.chats[m.chat] = {}
  chat = global.db.data.chats[m.chat]

  let type = (args[0] || '').toLowerCase()

  if (type !== 'luffy') {
    return m.reply(`Usa:\n${usedPrefix}on luffy\n${usedPrefix}off luffy`)
  }

  if (!m.isGroup) {
    return m.reply('Este comando solo funciona en grupos.')
  }
  if (!isAdmin && !isOwner) {
    return m.reply('Solo admins pueden activar o desactivar luffy.')
  }

  chat.isBanned = !isEnable ? true : false

  // Respuesta clara según el estado
  if (chat.isBanned) {
    await m.reply(' Bot baneado aquí.')
  } else {
    await m.reply(' Bot desbaneado aquí.')
  }
}

handler.help = ['on luffy', 'off luffy']
handler.tags = ['group']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
