import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

export const ListaParticipantes = () => {

    const participantes: string[] = useListaDeParticipantes()
    return (
        <div>
            {participantes.map(participante => <li key={participante}>{participante}</li>)}
        </div>
    )
}