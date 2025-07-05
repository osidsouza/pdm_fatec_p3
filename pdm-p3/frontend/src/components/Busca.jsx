import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { RadioButton } from 'primereact/radiobutton'
import { InputText } from 'primereact/inputtext'
import Exibicao from './Exibicao.jsx'

const Busca = () => {
  const [coordenadas, setCoordenadas] = useState('-23.561167625063238,-46.65648357473211')
  const [opcao, setOpcao] = useState(null)
  const [resultados, setResultados] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!opcao) return

    const partes = coordenadas.split(',').map(p => p.trim())
    if (partes.length !== 2 || isNaN(partes[0]) || isNaN(partes[1])) return

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      buscarPrevisao(partes[0], partes[1])
    }, 5000)

    return () => clearTimeout(timeoutRef.current)
  }, [coordenadas, opcao])

  const buscarPrevisao = async (lat, lon) => {
    try {
      const { data } = await axios.get('http://localhost:3001/previsao', {
        params: { lat, lon }
      })

      const dadosSanitizados = {
        name: data.name,
        weather: data.weather,
        main: {
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity
        }
      }

      setResultados(dadosSanitizados)
    } catch (err) {
      console.error('Erro ao buscar previsão:', err)
    }
  }

  return (
    <div className="p-4 flex flex-column gap-3">
      <h3>Buscar Previsão do Tempo</h3>
      <InputText
        value={coordenadas}
        onChange={(e) => setCoordenadas(e.target.value)}
        placeholder="Digite latitude,longitude"
        className="w-full"
      />

      <div className="flex align-items-center gap-3">
        <RadioButton inputId="temperatura" name="opcao" value="temperatura" onChange={(e) => setOpcao(e.value)} checked={opcao === 'temperatura'} />
        <label htmlFor="temperatura">Temperatura (mín/máx)</label>

        <RadioButton inputId="pressao" name="opcao" value="pressao" onChange={(e) => setOpcao(e.value)} checked={opcao === 'pressao'} />
        <label htmlFor="pressao">Pressão / Umidade</label>
      </div>

      {resultados && <Exibicao dados={resultados} tipo={opcao} />}
    </div>
  )
}

export default Busca
