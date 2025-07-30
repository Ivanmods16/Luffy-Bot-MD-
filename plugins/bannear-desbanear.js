let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  let isEnable = command.toLowerCase() === 'on'
  let chat = global.db.data.chats[m.chat]

  if (!chat) global.db.data.chats[m.chat] = {}
  chat = global.db.data.chats[m.chat]

  if (!m.isGroup) {
    return m.reply('❗Este comando solo funciona en grupos.')
  }

  if (args[0]?.toLowerCase() !== 'luffy') {
    return m.reply(`Usa:\n${usedPrefix}luffy on\n${usedPrefix}luffy off`)
  }

  if (isEnable) {
    if (!isOwner) {
      return m.reply('❌ Solo el owner puede desbanear al bot.')
    }
    chat.isBanned = false
    return m.reply('✅ Bot desbaneado aquí.')
  } else {
    if (!isAdmin && !isOwner) {
      return m.reply('❌ Solo un admin puede banear al bot.')
    }
    chat.isBanned = true
    return m.reply('🤖 Bot baneado aquí.')
  }
}

handler.help = ['luffy on', 'luffy off']
handler.tags = ['group']
handler.command = /^luffy$/i

export default handler
