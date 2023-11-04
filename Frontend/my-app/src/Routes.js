import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Pages/Home';
import Pets from './Pages/Pets';
import Owners from './Pages/Owrnes'
import Header from './components/Header';
import PetId from './Pages/Pets/pet';
import Owner from './Pages/Owrnes/owner';

import Erro from './Pages/Error';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/pets' element={<Pets/>}/>
            <Route path='/owners' element={<Owners/>}/>
            <Route path='/pet/:id' element={<PetId/>}/>
            <Route path='/owner/:ownerId' element={<Owner/>}/>
            
            <Route path='*' element={<Erro/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;