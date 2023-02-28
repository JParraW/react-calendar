import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ReactComponent() {
    const [cardDetail, setCardDetail] = useState<any[]>([]);
    let params = useParams();
    const cardId = params.id;

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

    if (!!cardDetail && cardDetail.length === 1) {
        const headerImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${cardDetail[0].code}/flag.png`
        const bodyImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${cardDetail[0].code}/circuit.png`

        return (
            <div>
                <ul>
                    <li><img src={headerImg} alt=""/></li>
                    <li><span>Id: {cardDetail[0].id}</span></li>
                    <li><span>Sequence: {cardDetail[0].sequence}</span></li>
                    <li><span>Code: {cardDetail[0].code}</span></li>
                    <li><span>Short Name: {cardDetail[0].shortName}</span></li>
                    <li><span>Sponsored Name: {cardDetail[0].sponsoredName}</span></li>
                    <li>
                        <span>Circuit:</span>
                        <ul>
                            <li>Id:  {cardDetail[0].circuit.id}</li>
                            <li>Name:  {cardDetail[0].circuit.name}</li>
                            <li>Location:  {cardDetail[0].circuit.location}</li>
                        </ul>
                    </li>
                    <li>
                        <span>Schedule:</span>
                        <ul>
                            <li>Start:  {cardDetail[0].schedule.localTime.dateOfStart}</li>
                            <li>End:  {cardDetail[0].schedule.localTime.dateOfEnd}</li>
                        </ul>
                    </li>
                    <li><img src={bodyImg} alt="" /></li>
                </ul>
            </div>
        );
    } else {
        return (
            <div>

            </div>
        );
    }
}

export default ReactComponent;