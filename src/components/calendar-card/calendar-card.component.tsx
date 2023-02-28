import "../style/calendar-card.css";
import { useNavigate } from "react-router-dom";

function CalendarCard({ value, daySelected, nameSelected }: { value: any, daySelected: string, nameSelected: string }) {

    const navigate = useNavigate();

    const cardByDate = value.filter((val: any) =>
        new Date(val.schedule.localTime.dateOfStart.split(' ')[0]) <= new Date(daySelected)
        && new Date(val.schedule.localTime.dateOfEnd.split(' ')[0]) >= new Date(daySelected)
    );
    const cardBySearchBar = nameSelected !== '' ? value.filter((val: any) => val.shortName.includes(nameSelected)) : {};


    let card: any = {};

    if (cardByDate.length > 0) {
        card = cardByDate;
    } else if (cardBySearchBar.length > 0) {
        card = cardBySearchBar;
    }

    function getMonthName(month: string) {
        const date = new Date();
        const monthNumber = Number.parseInt(month);
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'short' });
    }

    if (!!card && card.length >= 1) {

        const handleClick = (id: string) => {
            navigate(`/detail/${id}`);
        }

        const daySplited = card[0].schedule.localTime.dateOfStart.split('/')
        const date = `${daySplited[1]} - ${getMonthName(daySplited[0])}`

        const cardHtml: string = card.map((c: any) =>
            <div className="calendar" onClick={() => handleClick(c.id)} key={`calendar-${c.id}`}>
                <div className="calendar_header" key={`calendar_header-${c.id}`}>
                    <div className="calendar_header__top" key={`calendar_header__top-${c.id}`}>
                        <img key={`calendar_header__img-${c.id}`} src={`https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${c.code}/flag.png`} alt="" className="calendar_header__img" />
                        <span className="calendar_header__code" key={`calendar_header__code-${c.id}`}>{c.code}</span>
                        <span className="calendar_header__date" key={`calendar_header__date-${c.id}`}>{date}</span>
                    </div>
                    <div className="calendar_header__bottom" key={`calendar_header__bottom-${c.id}`}>
                        <span className="calendar_header__circuit-name" key={`calendar_header__circuit-name-${c.id}`}>{c.circuit.name}</span>
                    </div>
                </div>
                <div className="calendar_body" key={`calendar_body-${c.id}`}>
                    <img src={`https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${c.code}/circuit.png`} alt="" className="calendar_body__img" key={`calendar_body__img-${c.id}`} />
                </div>
            </div>
        );

        return (
            <>
                {cardHtml}
            </>
        );

    } else {
        return (
            <div>

            </div>
        );
    }
}

export default CalendarCard;