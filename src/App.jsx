//## CSS
import "./App.css"

//## REACT
import { useState, useCallback, useEffect } from "react"

//## PALAVRAS SECRETAS
import {palavrasSecretas} from "./data/palavrasSecretas"

//## COMPONENTES
import { StartScreen } from "./components/StartScreen"
import { Game } from "./components/Game"
import { GameOver } from "./components/GameOver"

const estagios = [
    {id: 0, nome: "start"},
    {id: 1, nome: "game"},
    {id: 2, nome: "end"}
]

const qntsDeChances = 5

const App = () => {
    const [estagioGame, setEstagioGame] = useState(estagios[0]?.nome)
    const [palavras] = useState(palavrasSecretas)
    const [palavraEscolhida, setPalavraEscolhida] = useState("")
    const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
    const [letras, setLetras] = useState([])

    const [adivinhouLetra, setAdivinhouLetra] = useState([])
    const [letrasErradas, setLetrasErradas] = useState([])
    const [chances, setChances] = useState(qntsDeChances)
    const [pontuacao, setPontuacao] = useState(0)
    const [letrasUtilizadas, setLetrasUtilizadas] = useState([])



    const escolherPalavraEcategoria = useCallback(() => {
        const categorias = Object.keys(palavras)
        const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]

        const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

        return {categoria, palavra}
    }, [palavras])

    const iniciarJogo = useCallback(() => {
        limparEstadoDasLetras()

        const {categoria, palavra } = escolherPalavraEcategoria()
        let letrasDaPalavra = palavra.split("").map(letra => letra.toLowerCase())

        setPalavraEscolhida(palavra)
        setCategoriaEscolhida(categoria)
        setLetras(letrasDaPalavra)
        setChances(qntsDeChances)
        setEstagioGame(estagios[1].nome)
    }, [escolherPalavraEcategoria])

    const verificarLetra = (letra) => {
        const normalizarLetra = letra.toLowerCase()

        if(adivinhouLetra.includes(normalizarLetra) || letrasErradas.includes(normalizarLetra)) return

        if(letras.includes(normalizarLetra)){
            setAdivinhouLetra(letrasCertasAtual => [...letrasCertasAtual, normalizarLetra])
        } else {
            setLetrasErradas(letrasErradasAtual => [...letrasErradasAtual, normalizarLetra])
            setChances(atual => atual - 1)
        }

        setLetrasUtilizadas(atual => [...atual, letra])
    }

    const limparEstadoDasLetras = () => {
        setAdivinhouLetra([])
        setLetrasErradas([])
        setLetrasUtilizadas([])
    }

   useEffect(() => {
        if(chances === 0) {
            limparEstadoDasLetras()
            setEstagioGame(estagios[2].nome)
        }
   }, [chances])

   useEffect(() => {
        const letrasUnicas = [... new Set(letras)];
        
        if(adivinhouLetra.length > 0 && adivinhouLetra.length === letrasUnicas.length) {
            setPontuacao(atual => atual += 100)
            iniciarJogo()
        }
   }, [adivinhouLetra, letras, iniciarJogo])

    const reiniciarJogo = () => {
        setPontuacao(0)
        setChances(qntsDeChances)
        setEstagioGame(estagios[0].nome)
    }
    return (
        <div className="App">
            {estagioGame === "start" && <StartScreen  iniciarJogo={iniciarJogo}/>}
            {estagioGame === "game" && 
            <Game 
                verificarLetra={verificarLetra}  
                categoriaEscolhida={categoriaEscolhida}
                letras={letras}
                adivinhouLetra={adivinhouLetra}
                letrasUtilizadas={letrasUtilizadas}
                chances={chances}
                pontuacao={pontuacao}
            />}
            {estagioGame === "end" && <GameOver reiniciarJogo={reiniciarJogo} pontuacao={pontuacao} palavraEscolhida={palavraEscolhida}/>}
        </div>
    );
}

export default App;
