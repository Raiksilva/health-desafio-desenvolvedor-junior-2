import api from '../../api/Aixos';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PetId (){
    const {id} = useParams();
    const [pet, setPet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        api.get(`/pet/${id}`)
        .then((response) =>{
            setPet(response.data);
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
    }, [id]);

    if (loading){
        return <p>Carregando...</p>
    }

    if(error){
        return <p>Erro ao buscar dados dos pets: {error.message}</p>
    }

    return(
        <div className="container">
            <div className='container-body'>
                <h2>Pet:</h2>
                <ul>
                <li key={pet.id}>
                            <strong> Nome do pet: </strong>  {pet.name}
                            <br/><br/>
                            <strong> Idade do pet: </strong> {pet.age} Anos
                            <br/><br/>
                            <strong> Raça do pet: </strong>{pet.race}
                            <br/><br/>
                            <strong> Tipo do pet: </strong>{pet.type}
                            <br/><br/>
                            <h3>Tutor:</h3>
                            <strong> Nome do tutor: </strong>{pet.owner.name}
                            <br/><br/>
                            <strong>Telefone do tutor: </strong>{pet.owner.fone}
                            <br/>
                            <hr/><br/>
                        </li>
                </ul>
            </div>
        </div>
    );
}

export default PetId;