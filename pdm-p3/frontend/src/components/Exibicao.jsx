import React from "react"
import { Card } from "primereact/card"
import striptags from "striptags"

const Exibicao = ({ dados, tipo }) => {
  if (!dados) return null

  const { name, weather, main } = dados

  return (
    <div className="flex justify-content-center mt-4">
      <Card title={`Previsão para ${striptags(name)}`} className="w-full md:w-30rem shadow-3">
        <div className="text-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={striptags(weather[0].description)}
            style={{ width: '150px', height: '150px' }}
          />
          <div className="text-lg font-semibold mb-2">
            {striptags(weather[0].description)}
          </div>

          {tipo === 'temperatura' && (
            <>
              <div className="p-1">🌡️ Temperatura atual: {striptags(`${main.temp}`)}°C</div>
              <div className="p-1">🔺 Máxima: {striptags(`${main.temp_max}`)}°C</div>
              <div className="p-1">🔻 Mínima: {striptags(`${main.temp_min}`)}°C</div>
            </>
          )}

          {tipo === 'pressao' && (
            <>
              <div className="p-1">🌬️ Pressão atmosférica: {striptags(`${main.pressure}`)} hPa</div>
              <div className="p-1">💧 Umidade relativa do ar: {striptags(`${main.humidity}`)}%</div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Exibicao
