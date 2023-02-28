import CalendarCard from '../calendar-card/calendar-card.component';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect, useState } from 'react';
import "../style/home.css";

function ReactComponent() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [calendarCardsData, setCalendarCardsData] = useState<any[]>([]);
    const [calendarData, setCalendarData] = useState<any[]>([]);
    const [dateSelected, setDateSelected] = useState<string>("");
    const [nameSelected, setNameSelected] = useState<string>("");
    const items: { id: number; name: any; date: string }[] = [];
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
        setDateSelected("");
    };

    if (dataLoaded) {
        calendarCardsData.forEach(calendarCardData => items.push({ id: cont++, name: calendarCardData.shortName, date: calendarCardData.schedule.localTime.dateOfStart.split(' ')[0] }))

        return (
            <div className="app">
                <div style={{ width: 348 , padding: 5}}>
                    <ReactSearchAutocomplete
                        items={items}
                        resultStringKeyName="name"
                        onSelect={handleOnSelect}
                        autoFocus
                        showIcon={false}
                        styling={{
                            height: "34px",
                            border: "1px solid #a0a096",
                            borderRadius: "4px",
                            backgroundColor: "white",
                            boxShadow: "none",
                            hoverBackgroundColor: "transparent",
                            color: "#000000",
                            fontSize: "12px",
                            fontFamily: "Courier",
                            iconColor: "#a0a096",
                            lineColor: "#a0a096",
                            placeholderColor: "#000000",
                            clearIconMargin: "3px 8px 0 0",
                            zIndex: 2,
                        }}
                        placeholder="Search circuit name..." />
                </div>
                <Calendar
                    minDate={new Date(calendarData[0].dateOfStart)}
                    maxDate={new Date(calendarData[0].dateOfEnd)}
                    onClickDay={(day) => {
                        setDateSelected(`${("0" + (day.getMonth() + 1)).slice(-2)}/${("0" + (day.getDate())).slice(-2)}/${day.getFullYear()}`);
                        setNameSelected("");
                    }}
                    className="react-calendar"
                />

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

export default ReactComponent;