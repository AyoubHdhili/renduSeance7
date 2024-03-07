import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteEvent } from "../services/eventServices";

function Event(props) {

    const [event, setEvent] = useState(props.event)
    const src = event.nbTickets === 0 ? " images/sold_out.png" : `images/${event.img}`;
    const msg = event.like ? "Dislike" : "Like";

    const handleDelete = (async (id) => {
        await deleteEvent(id);
        window.location.reload();
    })

    const handleLike = useCallback(() => {
        setEvent({ ...event,like: !event.like})
    },[event.like])
    return (
        <Card>
            <Card.Img variant="top" src={src} height={250}/>
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                    Price : {event.price}
                </Card.Text>
                <Card.Text>
                    Number of tickets : {event.nbTickets}
                </Card.Text>
                <Card.Text>
                    Number of participants : {event.nbParticipants}
                </Card.Text>
                <Button variant="primary" onClick={handleLike}>{msg}</Button>
                <Button variant="primary mx-3" onClick={()=>props.Buy(event)} disabled={event.nbTickets == 0 ? true : false}>Book an event</Button>
                <Link to={`/events/add?id=${event.id}`} className="btn btn-primary">Update</Link>
                <Button variant="danger mx-2" onClick={(e) => handleDelete(event.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Event;