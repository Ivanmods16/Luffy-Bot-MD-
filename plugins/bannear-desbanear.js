let handler = async (m, { command }) => {
  let chat = global.db.data.chats[m.chat]

  if (command === 'luffy on') {
    chat.isBanned = false
    await conn.sendMessage(m.chat, { text: '✅ *Este chat fue desbaneado. Ahora puedes usar a LuffyBot-MD.*' }, { quoted: m })
  } else if (command === 'luffy off') {
    chat.isBanned = true
    await conn.sendMessage(m.chat, { text: '❌ *Este chat fue baneado. Ya no podrán usar a LuffyBot-MD.*' }, { quoted: m })
  }

  if (m.key && m.key.remoteJid && m.key.id) {
    await conn.sendMessage(m.chat, { delete: m.key })
  }
}

handler.command = /^luffy (on|off)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
