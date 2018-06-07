import React from 'react'
import {createTrip} from "../../../middleware/api";

export default class TripCreator extends React.Component {

    constructor(props) {
        super(props);
        this.createAndForwardToNewTrip = this.createAndForwardToNewTrip.bind(this);
    }

    createAndForwardToNewTrip() {
        createTrip()
            .then((res) => {
                res.json()
                    .then((res) => {
                        this.forwardToTrip(res.tripId)
                    })
                    .catch(() => {
                        console.error("Could not parse response");
                    })
            })
            .catch(() => {
                console.error("Could not generate new trip");
            });
    }

    forwardToTrip(tripId) {
        this.props.history.push(`/trips/${tripId}`)
    }

    render() {
        return (
            <div>
                <h1>Datenschutzerklärung</h1>
                <div>Mit dem Klick auf nachfolgenden Link erklären Sie sich damit einverstanden, dass ihre hochgeladenen
                    Fotos und deren Meta-Daten verarbeitet und in einer Datenbank abgespeichert werden. Dies gilt auch
                    für weitere Eingaben die Sie zu ihren Fotos tätigen. Bitte beachten Sie ferner, dass ihre Daten
                    öffentlich zugänglich sind und nicht speziell geschützt sind. Es besteht die Möglichkeit, dass ihre
                    Daten von Drittanbietern geparst und/oder auf Datenbanken im Ausland abgespeichert werden. Der
                    Betreiber dieser Webseite übernimmt keine Haftung hierzu.
                </div>
                <div>
                    Wenn Sie damit nicht einverstanden sind, können Sie diese Webseite leider nicht verwenden.
                </div>
                <div>
                    <button onClick={this.createAndForwardToNewTrip}>
                        Ja, ich bin damit einverstanden, dass meine Daten verarbeitet, gespeichert und öffentlich
                        zugänglich sind.
                    </button>
                </div>
            </div>
        );
    }
}
