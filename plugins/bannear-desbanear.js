let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `✅ *El Bot Ha Sido Desactivado En Este Chat*`, m)

}
handler.help = ['banchat']
handler.tags = ['mods']
handler.command = ['banchat']
handler.rowner = true
export default handler