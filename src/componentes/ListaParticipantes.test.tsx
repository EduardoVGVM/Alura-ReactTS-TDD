import { render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import { ListaParticipantes } from "./ListaParticipantes"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

jest.mock('../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

describe('Uma lista, inicialmente vazia, de participantes', () => {

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test(('Deve ser renderizada sem elementos'), () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)
    })
})

describe('Uma lista, preenchida, de participantes', () => {

    const participantes = ['Pessoa1', 'Pessoa2']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })

    test(('Deve ser renderizada sem elementos'), () => {
        render(
            <RecoilRoot>
                <ListaParticipantes />
            </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)
    })
})