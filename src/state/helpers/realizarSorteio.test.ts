import { realizarSorteio } from "./realizarSorteio"

describe('Dado um sorteio de amigo secreto:',() => {
    
    test('Cada participante não deve sortear seu próprio nome', () => {
        
        const participantes = ['PessoaA', 'PessoaB', 'PessoaC', 'PessoaD']

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})