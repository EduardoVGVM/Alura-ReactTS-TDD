import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Rodape from "./Rodape"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

jest.mock('../state/hooks/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

describe('Onde não existem participantes suficientes', () => {

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test('A brincadeira não pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>)

        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})

describe('Quando existem participantes fucientes', () => {

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Pessoa1', 'Pessoa2', 'Pessoa3'])
    })

    test('A brincadeira pode ser iniciada', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })

    test('A brincadeira foi iniciada!', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')
        fireEvent.click(botao)

        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
        expect(mockSorteio).toHaveBeenCalledTimes(1)

    })
})