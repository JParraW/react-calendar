import { useEffect, useState } from 'react';
import './App.css';
import CalendarCard from './components/calendar-card/calendar-card.component';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [calendarCardsData, setCalendarCardsData] = useState<any[]>([]);
    const [calendarData, setCalendarData] = useState<any[]>([]);
    const [dateSelected, setDateSelected] = useState<string>("");
    const [nameSelected, setNameSelected] = useState<string>("");
    const items: { id: number; name: any; }[] = [];
    let cont = 0;

    useEffect(() => {
        fetch('calendar.json')
            .then((response) => response.json())
            .then((calendar) => {
                setCalendarCardsData(calendar[0].events);
                setCalendarData(calendar);
                setDataLoaded(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleOnSelect = (item: any) => {
        setNameSelected(item.name);
    }

    if (dataLoaded) {
        calendarCardsData.forEach(calendarCardData => items.push({ id: cont++, name: calendarCardData.shortName }))

        return (
            <div className="app">
                <Calendar
                    minDate={new Date(calendarData[0].dateOfStart)}
                    maxDate={new Date(calendarData[0].dateOfEnd)}
                    locale={"en-US"}
                    onClickDay={(day) => {
                        setDateSelected(`${("0" + (day.getMonth() + 1)).slice(-2)}/${("0" + (day.getDate())).slice(-2)}/${day.getFullYear()}`);
                    }}
                />

                <ReactSearchAutocomplete 
                    items={items}
                    resultStringKeyName="name"
                    onSelect={handleOnSelect}
                    autoFocus
                    showIcon={false}
                    styling={{
                        height: "34px",
                        border: "1px solid #000",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        boxShadow: "none",
                        hoverBackgroundColor: "#000000",
                        color: "#000000",
                        fontSize: "12px",
                        fontFamily: "Courier",
                        iconColor: "#000000",
                        lineColor: "#000000",
                        placeholderColor: "#000000",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 2,
                    }} />

                <CalendarCard value={calendarCardsData} daySelected={dateSelected} nameSelected={nameSelected} key={calendarData[0].id} />
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
