import { useNavigate } from "react-router-dom"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"
import './Rodape.css'
import { useSorteador } from "../state/hooks/useSorteador"

const Rodape = () => {
    
    const participantes = useListaDeParticipantes()

    const navegarPara = useNavigate()
    
    const sortear = useSorteador()

    const Iniciar = () => {
        sortear()
        navegarPara('/sorteio')
    }
    
    return (<footer className="rodape-configuracoes">
        <button className="botao" disabled={participantes.length < 3} onClick={Iniciar}>Iniciar a Brincadeira!</button>
        <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>)
}

export default Rodape