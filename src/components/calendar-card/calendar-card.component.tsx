import "../style/calendar-card.css";
import { useNavigate } from "react-router-dom";

function CalendarCard({ value, daySelected, nameSelected }: { value: any, daySelected: string, nameSelected: string }) {

    const navigate = useNavigate();    

    const cardByDate = daySelected !== '' ? value.filter((val: any) => val.schedule.localTime.dateOfStart.includes(daySelected)) : {};
    const cardBySearchBar = nameSelected !== '' ? value.filter((val: any) => val.shortName.includes(nameSelected)) : {};

    let card: any = {};

    if (cardByDate.length > 0) {
        card = cardByDate;
    } else if (cardBySearchBar.length > 0) {
        card = cardBySearchBar;
    }

    if (!!card && card.length === 1) {
        const headerImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${card[0].code}/flag.png`
        const bodyImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${card[0].code}/circuit.png`
        const handleClick = () => {
            navigate(`/detail/${card[0].id}`);
        }
        return (
            <div className="calendar" onClick={handleClick}>
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