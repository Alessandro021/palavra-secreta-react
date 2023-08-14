import "./GameOver.css"

export const GameOver = ({reiniciarJogo, pontuacao, palavraEscolhida}) => {
    return(
        <div>
            <h1>Você Perdeu!</h1>
            <h3>Palavra certa: <span>{palavraEscolhida}</span></h3>
            <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
            <button onClick={reiniciarJogo}>Resetar jogo</button>
        </div>
    )
}