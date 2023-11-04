import React, { useState, useEffect } from 'react';
import api from '../../api/Aixos.js';
import { Link } from 'react-router-dom';

function OwnersList() {

    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/owners')
        .then((response) => {
            setOwners(response.data);
            setLoading(false);
        })
        .catch((err) =>{
          if(err.response){
            setError(`Erro ${err.response.status}: ${err.response.data.error}`);
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
      return <p>Erro ao buscar dados dos proprietários: {error}</p>
    }

    return (
    <div className="container">
      <div className="container-body">
            <h2>Lista de proprietários e seus pets</h2>  <br />         
          <ul>     
            {Array.isArray(owners) && owners.length > 0 ? (
              owners.map((owner) => (
                <li key={owner.ownerId}>
                  <Link to={`/owner/${owner.ownerId}`}>
                 <strong> Nome do Proprietário: </strong> {owner.name}<br/>
                  </Link>
                 <br />
                 <hr />
                 <br />
                </li>  
              ))
            ) : (
              <p>Nenhum proprietário encontrado.</p>
            )}
          </ul>
      </div>
    </div>
  );
}

export default OwnersList; 



/* import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/Aixos.js';

function OwnerList(){
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/owners')
        .then((response) => {
            setOwners(response.data.owners);
            setLoading(false);
        })
        .catch((err) => {
            if(err.response){
                //O servidor respondeu com um (erro no lado do servidor) 
                setError(`Erro ${err.response.status}: ${err.response.data.message}`);
            }
            else if(err.request){
                    //A solictação foi feita, mas não houve resposta (possível erro de rede)
                    setError('Erro de rede. Verifique sua conexão com a internet.');
            }
            else{
                // Ocorreu um erro durante a cofiguração da solicitação (erro do cliente)
                setError('Erro ao processar a solicitação.');
            }
            setLoading(false);
        });
    }, []);

    if (loading){
        return <p>Carregando...</p>
    }

    if(error){
        return <p>Erro ao buscar dados dos pets: {error.message}</p>
    }

    return (
        <div className="container">
          <header className="header">
          </header>
          <div className="container-body">
                <h2>Lista de pets</h2>           
              <ul>     
                {Array.isArray(owners) && owners.length > 0 ? (
                  owners.map((owner) => (
                    <li key={owner.ownerId}>
                     Nome: {owner.name}<br/>
                    Telefone: {owner.fone}<br/>
                    Id pet: {owner.pet.id}<br/>
                    Nome: {owner.pet.name}<br/>

                     <hr/>
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



export default OwnerList; */