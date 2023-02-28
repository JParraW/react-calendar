import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from '../src/components/home/home.component';
import CardDetail from '../src/components/card-detail/card-detail.component';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/detail/:id" element={<CardDetail />} />
            </Routes>
        </Router>
    )
}

export default App;
