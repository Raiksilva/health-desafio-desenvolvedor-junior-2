import { Link } from 'react-router-dom';
import './style.css';

function Header(){
    return (
        <header>
            <h2>
                <Link to="/">PetShop</Link>
            </h2>
            <Link to="/pets">Pets</Link>
            <Link to="/owners">Tutores</Link>
        </header>
    );
}

export default Header;