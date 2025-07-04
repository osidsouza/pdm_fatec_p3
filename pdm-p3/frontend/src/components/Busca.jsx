import axios from 'axios'
import React,{ useState, useEffect} from 'react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import Exibicao from './Exibicao.jsx'

const Busca = () => {
    const [termoDeBusca, setTermoDeBusca] = useState('São Paulo')
    const [resultados, setResultados] = useState([])

    useEffect(() => {
        const fazerBusca = async () => {
            const {data} = await axios.get('http://localhost:3000/search',{
                params: { city: termoDeBusca }
            })
            setResultados ([data])
        }
        if (termoDeBusca && resultados.length >= 3) {
            fazerBusca()
        } else {
            const timeoutID = setTimeout(() => {
                if (termoDeBusca)
                    fazerBusca()
            }, 2000)
            return () => {
                clearTimeout(timeoutID)
            }
        }
    }, [resultados.length, termoDeBusca])

    return (
        <div className='border-bottom border border-1 border-400 p-2 text-center font-bold'>
            <IconField iconPosition='left'>
                <InputIcon className='pi pi-search'/>
                <InputText 
                    className='border-bottom border border-1 border-400 font-bold'
                    placeholder='Buscar...'
                    onChange={(e) => {setTermoDeBusca(e.target.value)}}
                    value={termoDeBusca} />
            </IconField> 
            {
                resultados.map((resultado, index) => (
                <Exibicao key={index} dados={resultado} />
                ))
             }
        </div>
    )
}

export default Busca