import { fireEvent, render, screen, act } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

describe('Comportamento do Formulario.tsx', () => {
    test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {

        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)

        //Encontrar objetos no DOM
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')

        //Aquilo que deveria ocorrer
        expect(input).toBeInTheDocument()
        expect(botao).toBeDisabled()
    })

    test('Adicionar um participante caso exista um nome preenchido', () => {

        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)

        //Encontrar objetos no DOM
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')

        fireEvent.change(input, {
            target: { value: 'Nome Pessoa' }
        })

        fireEvent.click(botao)

        expect(input).toHaveFocus()
        expect(input).toHaveValue('')
    })

    test('Nomes duplicados não podem ser adicionados na lista', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)

        //Encontrar objetos no DOM
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')

        fireEvent.change(input, {
            target: { value: 'Nome Pessoa' }
        })

        fireEvent.click(botao)

        fireEvent.change(input, {
            target: { value: 'Nome Pessoa' }
        })

        fireEvent.click(botao)

        const mensagemDeErro = screen.getByRole('alert')

        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })

    test('A mensagem de erro deve sumir após 2 timers', () => {
        jest.useFakeTimers()
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>)

        //Encontrar objetos no DOM
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const botao = screen.getByRole('button')

        fireEvent.change(input, {
            target: { value: 'Nome Pessoa' }
        })

        fireEvent.click(botao)

        fireEvent.change(input, {
            target: { value: 'Nome Pessoa' }
        })

        fireEvent.click(botao)

        let mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeInTheDocument()

        act(() => {
            jest.runAllTimers();
        })

        mensagemDeErro = screen.queryByRole('alert')
        expect(mensagemDeErro).toBeNull()
    })
})