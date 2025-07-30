let handler = async (m, { conn, command }) => {
  let chat = global.db.data.chats[m.chat]

  let message
  if (command === 'on') {
    chat.isBanned = false
    message = await conn.sendMessage(m.chat, { text: '✅ *Este chat fue desbaneado. Ahora puedes usar a LuffyBot-MD.*' }, { quoted: m })
  } else if (command === 'off') {
    chat.isBanned = true
    message = await conn.sendMessage(m.chat, { text: '❌ *Este chat fue baneado. Ya no podrán usar a LuffyBot-MD.*' }, { quoted: m })
  }

  setTimeout(() => {
    if (message?.key) {
      conn.sendMessage(m.chat, { delete: message.key }).catch(() => {})
    }
  }, 60000)

  if (m.key && m.key.remoteJid && m.key.id) {
    await conn.sendMessage(m.chat, { delete: m.key }).catch(() => {})
  }
}

handler.command = /^luffy (on|off)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
