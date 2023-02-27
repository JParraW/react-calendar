import "../style/calendar-card.css";


function CalendarCard({ value, daySelected, nameSelected }: {value: any, daySelected: string, nameSelected: string}) {   

    const card = value.filter((val: any) => val.schedule.localTime.dateOfStart.includes(daySelected));  

    console.log(nameSelected);

    if (!!card && card.length === 1) {
        const headerImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${card[0].code}/flag.png`
        const bodyImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${card[0].code}/circuit.png`

        return (
            <div className="calendar">
                <div className="calendar_header">
                    <img src={headerImg} alt="" className="calendar_header__img" />
                    <span className="calendar_header__code">{card[0].code}</span>
                    <span className="calendar_header__date">{card[0].schedule.localTime.dateOfStart}</span>
                    <span className="calendar_header__circuit-name">{card[0].circuit.name}</span>
                </div>
                <div className="calendar_body">
                    <img src={bodyImg} alt="" className="calendar_body__img" />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                
            </div>
        );
    }
}

export default CalendarCard;