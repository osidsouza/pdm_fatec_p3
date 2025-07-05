require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

app.get('/previsao', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ erro: 'Latitude e longitude são obrigatórios.' })
  }

  try {
    const result = await openWeatherClient.get('weather', {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: 'metric',
        lang: 'pt_br'
      }
    })
    res.json(result.data)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ erro: 'Erro ao consultar a API do tempo.' })
  }
})

const port = 3001
app.listen(port, () => console.log(`BACK END OK! PORTA ${port}.`))
