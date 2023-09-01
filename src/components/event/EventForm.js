import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"
import { createEvents } from "../../managers/EventManager"

export const EventForm = () => {
    const navigate = useNavigate
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        gameId: 0
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
            .then(console.log(games))
    }, [])


    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setCurrentEvent(newEventState)
    }


    return <form className="eventform">
        <h2 className="eventform__title">Event Creation</h2>
        <fieldset className="field__date">
            <label htmlFor="date">Date of Event: </label>
            <input type="date" name="date" value={currentEvent.date} onChange={changeEventState} />
        </fieldset>

        <fieldset classname="game">
            <div className="form-group">
                <label htmlFor="game">Event Game: </label>
                <select name="gameId" value={currentEvent.game} onChange={changeEventState}>
                    <option value="" disabled>Select a game</option>
                    {games.map(game => (
                        <option key={game.id} value={game.id}>{game.title}</option>
                    ))}
                </select>
            </div>
        </fieldset>

        <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    //debugger
                    let currentGametype = 0
                    for (const gamen of games) {
                        if(gamen.id === parseInt(currentEvent.gameId)){
                            currentGametype = parseInt(gamen.game_type)
                        }
                    }
                    const event = {
                        date: currentEvent.date,
                        game: parseInt(currentEvent.gameId),
                        game_type: parseInt(currentGametype)
                    }

                    // Send POST request to your API
                    createEvents(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
    </form>

}