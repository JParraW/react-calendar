import { useEffect, useState } from 'react';
import './App.css';

function App() {

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch('calendar.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
            });
    }

    const [data, setData] = useState([]);

  return (
      <div className="app">
      </div>
  );
}

export default App;
