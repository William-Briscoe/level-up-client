import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGames, getGameType } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])


    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameType().then(gameTypes =>{
            setGameTypes(gameTypes)
        }).catch()
        console.log(gameTypes)

    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentGame }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)

    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Publisher: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number of players: </label>
                    <input type="number" name="numOfPlayers"
                        value={currentGame.numOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skillLevel"
                        value={currentGame.skillLevel}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    {gameTypes.map(gametype => (
                        <div key={gametype.id}>
                            <input type="radio" id={gametype.id} name="gameTypeId" value={gametype.id} onChange={changeGameState} />
                            <label htmlFor={gametype.id}>{gametype.label}</label>
                        </div>
                    ))}

                </div>
            </fieldset>




            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        num_of_players: parseInt(currentGame.numOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGames(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
