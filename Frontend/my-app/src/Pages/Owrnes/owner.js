import api from '../../api/Aixos';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Owner (){
    const { ownerId } = useParams();
    const [ownerData, setOwnerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        api.get(`/owner/${ownerId}`)
        .then((response) => {
            setOwnerData(response.data);
            setLoading(false);
        })
        .catch((err) => {
            if (err.response) {
                setError(`Erro ${err.response.status}: ${err.response.data.message}`);
            }
            else if (err.request) {
                setError(`Erro de rede. Verifique sua conexão com a internet`);
            }
            else {
                setError("Erro ao processar a solicitação");
            }
            setLoading(false);
        });
    }, [ownerId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao buscar os dados dos tutores: {error.message}</p>;
    }

    return (
        <div className="container">
            <div className='container-body'>
                <h2>Proprietários e seus pets</h2><br />
                <ul>     
                <li key={ownerData.ownerId}>
                 <strong> Nome do Proprietário: </strong> {ownerData.name}<br/>
                 <strong> Telefone: </strong> {ownerData.fone}<br/>
                 <br/>
                 <h3>Pets:</h3>
                 <ul>
                   {Array.isArray(ownerData.Pets) && ownerData.Pets.length > 0 ? (
                     ownerData.Pets.map((pet) => (
                       <li key={pet.id}>
                        <Link to={`/pet/${pet.id}`}><strong> Nome do Pet: </strong>{pet.name}</Link>
                       </li>
                     ))
                   ) : (
                     <p>Nenhum pet encontrado para este proprietário.</p>
                   )}
                 </ul>
                 <br />
                 <hr />
                 <br />
                </li>  
          </ul>
            </div>
        </div>
    );
}

export default Owner;



/* import api from '../../api/Aixos';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OwnerId (){
    const { ownerId } = useParams();
    const [ ownerData, setOwner ] = useState([]);
    const [loading,  setLoading ] = useState(true);
    const [error, setError ] = useState(null);

    useEffect (() => {
        api.get(`/owner/${ownerId}`)
        .then((response) =>{
            setOwner(response.data);
            setLoading(false);
        })
        .catch((err) =>{
            if(err.response){
                setError(`Erro ${err.response.status}: ${err.response.data.message}`);
            }
            else if(err.request){
                setError(`Erro de rede. verifique sua conexão com a internet`);
            }
            else{
                setError("Erro ao processar a solicitação");
            }
            setLoading(false);
        });
    }, [ownerId]); 

    if(loading){
        return <p>Carregando...</p>
    }

    if(error){
        return <p>Erro ao buscar os dados dos tutores: {error.message}</p>
    }

    return(
        <div className="container">
            <div className='container-body'>
            <h2>Proprietários e seus pets</h2>  <br />         
         {
          <ul>     
            {Array.isArray(ownerData) && ownerData.length > 0 ? (
              ownerData.map((owner) => (
                <li key={owner.ownerId}>
                 <strong> Nome do Proprietário: </strong> {owner.name}<br/>
                 <strong> Telefone: </strong> {owner.fone}<br/>
                 <br/>
                 <h3>Pets:</h3>
                 <ul>
                   {Array.isArray(owner.Pets) && owner.Pets.length > 0 ? (
                     owner.Pets.map((pet) => (
                       <li key={pet.id}>
                         <strong> Nome do Pet: </strong>{pet.name}
                       </li>
                     ))
                   ) : (
                     <p>Nenhum pet encontrado para este proprietário.</p>
                   )}
                 </ul>
                 <br />
                 <hr />
                 <br />
                </li>  
              ))
            ) : (
              <p>Nenhum proprietário encontrado.</p>
            )}
          </ul>
         
           <ul>     
                <li key={owner.ownerId}>
                 <strong> Nome do Proprietário: </strong> {owner.name}<br/>
                 <strong> Telefone: </strong> {owner.fone}<br/>
                 <br/>
                 <h3>Pets:</h3>
                 <ul>
                   {Array.isArray(owner.Pets) && owner.Pets.length > 0 ? (
                     owner.Pets.map((pet) => (
                       <li key={pet.id}>
                         <strong> Nome do Pet: </strong>{pet.name}
                       </li>
                     ))
                   ) : (
                     <p>Nenhum pet encontrado para este proprietário.</p>
                   )}
                 </ul>
                 <br />
                 <hr />
                 <br />
                </li>  
          </ul> }
            </div>

        </div>
    )
}

export default OwnerId; */