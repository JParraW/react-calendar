import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './components/calendar.component';


function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch('calendar.json')
            .then((response) => response.json())
            .then((calendar) => {
                setData(calendar[0].events);
                setDataLoaded(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    if (dataLoaded) {
        return (
            <div className="app">
                {data.map(event => <Calendar value={event} key={event.id}/>)}                
            </div>
        );
    } else {
        return (
            <div className="app">
            </div>
        );
    }
}

export default App;
