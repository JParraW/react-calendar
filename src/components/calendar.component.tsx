import React from 'react';

function Calendar({ value }: { value: any }) {
    const headerImg : string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${value.code}/flag.png`
    const bodyImg: string = `https://dornacorporatestorage.blob.core.windows.net/public-assets/images/events/${value.code}/circuit.png`
  return (
      <div className="calendar">
          <div className="calendar_header">
              <img src={headerImg} alt="" className="calendar_header__img" />
              <span className="calendar_header__code">{value.code}</span>
              <span className="calendar_header__date">{value.schedule.dateOfStart}</span>
              <span className="calendar_header__circuit-name">{value.circuit.name}</span>
          </div>
          <div className="calendar_body">
              <img src={bodyImg} alt="" className="calendar_body__img" />
          </div>
      </div>
  );
}

export default Calendar;