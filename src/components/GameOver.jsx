import "./GameOver.css"

export const GameOver = ({reiniciarJogo, pontuacao}) => {
    return(
        <div>
            <h1>Você Perdeu!</h1>
            <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
            <button onClick={reiniciarJogo}>Resetar jogo</button>
        </div>
    )
}