import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import MyFavorite from './pages/MyFavoritePage'
import NoPage from './pages/NoPage'

const App = () => {
    return(
        <div>
            <Router>
                <Routes>
                    <Route index element={<Home/>} />
                    <Route path='/home' element={<Home/>} />
                    <Route path='/my-favorite' element={<MyFavorite/>} />
                    <Route path='*' element={<NoPage/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;