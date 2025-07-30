let handler = async (m, { conn, command, isAdmin, isBotAdmin, isGroup }) => {
  if (!isGroup) {
    return conn.sendMessage(m.chat, { text: '❗Este comando solo funciona en grupos.' }, { quoted: m })
  }

  if (!isAdmin) {
    return conn.sendMessage(m.chat, { text: '🚫 Solo los administradores del grupo pueden usar este comando.' }, { quoted: m })
  }

  if (!isBotAdmin) {
    return conn.sendMessage(m.chat, { text: '🤖 Necesito ser administrador para ejecutar este comando.' }, { quoted: m })
  }

  let chat = global.db.data.chats[m.chat] ??= {}

  let message
  if (command === 'desbanchat') {
    chat.isBanned = false
    message = await conn.sendMessage(m.chat, { text: '✅ *Este chat fue desbaneado. Ahora pueden usar a LuffyBot-MD.*' }, { quoted: m })
  } else if (command === 'banchat') {
    chat.isBanned = true
    message = await conn.sendMessage(m.chat, { text: '❌ *Este chat fue baneado. Ya no podrán usar a LuffyBot-MD.*' }, { quoted: m })
  }

  setTimeout(() => {
    if (message?.key) {
      conn.sendMessage(m.chat, { delete: message.key }).catch(() => {})
    }
  }, 60000)

  if (m.key?.remoteJid && m.key?.id) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => {})
  }
}

handler.command = /^(banchat|desbanchat)$/i
handler.group = true

export default handler
