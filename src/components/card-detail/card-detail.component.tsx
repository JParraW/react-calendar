import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../style/card-detail.css";
import { useNavigate } from "react-router-dom";

function ReactComponent() {
    const [cardDetail, setCardDetail] = useState<any[]>([]);
    let params = useParams();
    const cardId = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('../calendar.json')
            .then((response) => response.json())
            .then((calendar) => {
                console.log(calendar[0].events.filter((event: { id: string | undefined; }) => event.id === cardId));
                setCardDetail(calendar[0].events.filter((event: { id: string | undefined; }) => event.id === cardId));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleClick = () => {
        navigate(`/`);
    }

    if (!!cardDetail && cardDetail.length === 1) {
        const headerImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${cardDetail[0].code}/flag.png`
        const bodyImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${cardDetail[0].code}/circuit.png`

        return (
            <>
                <h4 onClick={handleClick} className="back">back</h4>

                <div className="card-detail">
                    <div className="card-detail__header">
                        <img src={headerImg} alt="" className="card-detail__header__img" />
                    </div>
                    <div className="card-detail__body">
                        <ul className="card-detail__body__info">
                            <li><span><b>Id:</b> {cardDetail[0].id}</span></li>
                            <li><span><b>Sequence:</b> {cardDetail[0].sequence}</span></li>
                            <li><span><b>Code:</b> {cardDetail[0].code}</span></li>
                            <li><span><b>Short Name:</b> {cardDetail[0].shortName}</span></li>
                            <li><span><b>Sponsored Name:</b> {cardDetail[0].sponsoredName}</span></li>
                            <li>
                                <span>Circuit:</span>
                                <ul>
                                    <li><b>Id:</b>  {cardDetail[0].circuit.id}</li>
                                    <li><b>Name:</b>  {cardDetail[0].circuit.name}</li>
                                    <li><b>Location:</b>  {cardDetail[0].circuit.location}</li>
                                </ul>
                            </li>
                            <li>
                                <span>Schedule:</span>
                                <ul>
                                    <li><b>Start:</b>  {cardDetail[0].schedule.localTime.dateOfStart}</li>
                                    <li><b>End:</b>  {cardDetail[0].schedule.localTime.dateOfEnd}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="card-detail__footer">
                        <img src={bodyImg} alt="" className="card-detail__footer__img" />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div>

            </div>
        );
    }
}

export default ReactComponent;