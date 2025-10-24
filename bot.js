const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'gc2.pl',
    port: 25565,
    username: 'Bot_2137testqqq',
    auth: 'offline',
  })

  let viewerStarted = false

  bot.once('spawn', () => {
    console.log('🎮 Bot połączony, próba rejestracji/logowania...')

    setTimeout(() => {
      bot.chat('/register 1234 1234')
      setTimeout(() => bot.chat('/login 1234'), 4000)
    }, 2000)
  })

  bot.on('windowOpen', (window) => {
    console.log(`📦 Otworzono GUI: ${window.title ? window.title : '[brak tytułu]'}`)

    setTimeout(() => {
      const slot = 11
      const item = window.slots[slot]
      if (item) {
        console.log(`🟡 Klikam w slot ${slot}: ${item.name}`)
        bot.clickWindow(slot, 0, 0)
      } else {
        console.log(`⚠️ Slot ${slot} pusty.`)
      }
    }, 5000) // <-- ZWIĘKSZ DO 5 sekund, żeby serwer się „uspokoił”
  })

  bot.on('windowClose', () => console.log('📕 Zamknięto GUI'))

  bot.on('kicked', (reason, loggedIn) => {
    console.log('💥 Wyrzucony z serwera:', reason)
  })

  bot.on('error', (err) => {
    console.log('❌ Błąd połączenia:', err)
  })

  bot.on('end', () => {
    console.log('🛑 Bot rozłączony, próba ponownego połączenia za 5 sekund...')
    setTimeout(createBot, 5000) // automatyczne ponowne połączenie
  })
}

createBot()

