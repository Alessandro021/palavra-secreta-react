import "./StartScreen.css"

export const StartScreen = ({iniciarJogo}) => {
    return(
        <div className="start">
            <h1>Palavra Secreta</h1>
            <p>Clique no botão abaixo para começar a jogar.</p>
            <button onClick={iniciarJogo}>Começar a jogar</button>
        </div>
    )
}