let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
  let chat = global.db.data.chats[m.chat]

  if (!m.isGroup) return m.reply('❗Este comando solo funciona en grupos.')

  if (!args[0] || (args[0].toLowerCase() !== 'on' && args[0].toLowerCase() !== 'off')) {
    return m.reply(`Usa:\n${usedPrefix}luffy on\n${usedPrefix}luffy off`)
  }

  const isEnable = args[0].toLowerCase() === 'on'

  if (isEnable) {
    if (!isOwner) return m.reply('❌ Solo el owner puede desbanear al bot.')
    chat.isBanned = false
    return m.reply('✅ Bot desbaneado en este grupo.')
  } else {
    if (!isAdmin && !isOwner) return m.reply('❌ Solo un admin o el owner puede banear al bot.')
    chat.isBanned = true
    return m.reply('🤖 Bot baneado en este grupo.')
  }
}

handler.help = ['luffy on', 'luffy off']
handler.tags = ['group']
handler.command = /^luffy$/i

export default handler
