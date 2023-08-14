import { useState, useRef } from "react"
import "./Game.css"

export const Game = ({verificarLetra, palavraEscolhida, categoriaEscolhida, letras, adivinhouLetra, letrasErradas, chances, pontuacao}) => {

    const [letra, setLetra] = useState("")
    const inputLetraRef = useRef(null)

    const handleSubmit = (evento) => {
        evento.preventDefault();
        verificarLetra(letra)

        setLetra("")
        inputLetraRef.current.focus()
    }
    return(
        <div className="jogo">
           <p className="pontos">
                <span>Pontuação: {pontuacao}</span>
           </p>

           <h1>Adivinhe a palavra</h1>
           <h3 className="dica">
                Dica sobre a palavra: <span>{categoriaEscolhida}</span>
           </h3>

           <p>Você ainda tem {chances} tentativa(s)</p>
                
           <div className="palavraContainer">
                {letras.map((letra, index) => 
                    adivinhouLetra.includes(letra) ? (
                        <span key={index} className="letra">{letra}</span>
                    ): (
                        <span key={index} className="quadradoBranco"></span>
                    )
                )}
           </div>

           <div className="letraContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letra" maxLength={1} required ref={inputLetraRef} value={letra} onChange={(evento) => setLetra(evento.target.value)}/>
                    <button>Jogar!</button>
                </form>
           </div>
           <div className="letrasErradasContainer">
                <p>Letras já utilizadas: </p>
                {letrasErradas.map(((letra, index) => (
                    <span key={index}>{letra}, </span>
                )))}
           </div>
        </div>
    )
}