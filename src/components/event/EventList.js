import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { getGames } from "../../managers/GameManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const [ games, setGames] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    useEffect(()=>{
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">Event {event.id}</div>
                        <div className="event__organizer">Organizer: {event.organizer.full_name}</div>
                        <div className="event__date">Date of event: {event.date}</div>
                        <div className="event__game">Events game: {event.game.title}</div>
                        <div className="event__gametype">Game type: {event.game_type.label}</div>
                        <div className="attendees">Attendees: {event.attendees[0].full_name}</div>
                    </section>
                })
            }
        </article>
    )
}
