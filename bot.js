// bot.js
const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'gc2.pl',
    port: 25565,
    username: 'Bot_2137testqqq',
    auth: 'offline'
  })

  // --- Po wejściu na serwer ---
  bot.once('spawn', () => {
    console.log('🎮 Bot połączony, rozpoczynam logowanie...')

    // 1️⃣ Rejestracja + logowanie
    setTimeout(() => {
      bot.chat('/register 1234 1234')
      console.log('📝 /register wysłane...')
      setTimeout(() => {
        bot.chat('/login 1234')
        console.log('🔐 /login wysłane...')
      }, 6000)
    }, 3000)
  })

  // 2️⃣ Po otwarciu GUI kliknij item
  bot.on('windowOpen', (window) => {
    console.log(`📦 Otworzono GUI: ${window.title ? window.title : '[brak tytułu]'}`)

    setTimeout(() => {
      const slot = 11 // żółty blok
      const item = window.slots[slot]
      if (item) {
        console.log(`🟡 Klikam w slot ${slot}: ${item.name}`)
        bot.clickWindow(slot, 0, 0)
      } else {
        console.log('⚠️ Slot 11 pusty.')
      }
    }, 12000) // opóźnienie dla antybota
  })

  // 3️⃣ Po zamknięciu GUI – uruchom ruch i anti-AFK
  bot.on('windowClose', () => {
    console.log('📕 GUI zamknięte — uruchamiam anti-AFK...')

    // natychmiastowy lekki ruch
    bot.setControlState('forward', true)
    setTimeout(() => bot.setControlState('forward', false), 1000)

    // obrót co 10 s
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, 0)
    }, 10000)

    // drobny ruch co 30 s
    setInterval(() => {
      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 500)
    }, 30000)
  })

  // --- Logi i błędy ---
  bot.on('kicked', (reason) => {
    console.log('💥 Wyrzucony z serwera:', reason)
  })

  bot.on('error', (err) => {
    console.log('❌ Błąd połączenia:', err)
  })

  bot.on('end', () => {
    console.log('🛑 Bot rozłączony, ponowne połączenie za 10 s...')
    setTimeout(createBot, 10000)
  })

  // --- surowy kick (debug) ---
  bot._client.on('kick_disconnect', (packet) => {
    console.log('📦 Raw kick packet:', JSON.stringify(packet, null, 2))
  })
}

createBot()
