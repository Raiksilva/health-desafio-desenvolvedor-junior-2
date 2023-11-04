import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/Aixos.js';


function PetList() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/pets')
        .then((response) => {
            setPets(response.data.pets);
            setLoading(false);
        })
        .catch((err) =>{
          if(err.response){
            setError(`Erro ${err.response.status}: ${err.response.data.message}`);
          }
          else if(err.request){
            setError('Erro de rede. Verifique sua conexão com a internet.');
          }
          else{
            setError('Erro ao processar a solicitação.');
          }
          setLoading(false);
        });
    }, []); 

    if (loading){
       return <p>Carregando...</p>
    }

    if (error){
      return <p>Erro ao buscar dados dos pets: {error.message}</p>
    }
 
    return (
    <div className="container">
      <div className="container-body">
            <h2>Lista de pets</h2>           
          <ul>     
            {Array.isArray(pets) && pets.length > 0 ? (
              pets.map((pet) => (
                <li key={pet.id}>
                <Link to={`/pet/${pet.id}`}> <strong> Nome do pet: </strong>  {pet.name} </Link>
                  <br/>  
                  <hr/>
                  <br />
                </li>  
              ))
            ) : (
              <p>Nenhum pet encontrado.</p>
            )}

          </ul>
      </div>
    </div>
  );
}

export default PetList;

