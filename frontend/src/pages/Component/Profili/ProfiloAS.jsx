import { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import axios from 'axios';
import PropTypes from 'prop-types';
import SegnalazioneAS from '../Segnalazioni/SegnalazioneAS.jsx';


export default function ProfiloAS({ token }) {
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [aggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
  const [modificaProfiloForm, setModificaProfiloForm] = useState({ nome: '', cognome: '', email: '', password: '' });
  const [registrazioneForm, setRegistrazioneForm] = useState({ nome: '', cognome: '', email: '', password: '', ruolo: 'CISO' });
  const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);
  const [error, setError] = useState('');
  const [SegnalazioniVisibile, setSegnalazioniVisibile] = useState(false);
  const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
    setAggiungiProfiloVisibile(false);
    setSegnalazioniVisibile(false);
    setError('');
  };

  const toggleSegnalazioniApprovate = () => {
    setSegnalazioniVisibile(!SegnalazioniVisibile);
    setModificaProfiloVisibile(false);
    setAggiungiProfiloVisibile(false);
}
  const toggleAggiungiProfilo = () => {
    setAggiungiProfiloVisibile(!aggiungiProfiloVisibile);
    setModificaProfiloVisibile(false);
    setSegnalazioniVisibile(false);
    setError('');
  };

  const registrami = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/api/registrazione', registrazioneForm)
      .then(() => {
        setRegistrazioneSuccess(true);
        setRegistrazioneForm({ nome: '', cognome: '', email: '', password: '', ruolo: 'CISO' });
        setError('');
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.messaggio);
          console.log(error.response);
        }
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRegistrazioneForm((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleModificaProfiloChange = (event) => {
    const { value, name } = event.target;
    setModificaProfiloForm((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const aggiornaProfilo = (event) => {
    event.preventDefault();
    if (!token) {
      console.error('Token non disponibile');
      return;
    }
    axios.put('http://127.0.0.1:5000/api/profilo', modificaProfiloForm, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
      .then((response) => {
        setProfilo(response.data);
        toggleModificaProfilo();
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiornamento del profilo:', error);
        setError('Errore durante l\'aggiornamento del profilo');
      });
  };

  useEffect(() => {
    const fetchProfilo = async () => {
      if (!token) {
        console.error('Token non disponibile');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setProfilo(data);
        setModificaProfiloForm({ nome: data.nome, cognome: data.cognome, email: data.email, password: '' });
      } catch (error) {
        console.error('Errore durante il recupero del profilo:', error);
        setError('Errore durante il recupero del profilo');
      }
    };

    fetchProfilo();
  }, [token]);

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4 h-full justify-content-center mx-5">
            <MDBCardBody className="text-center mx-5">
              <div className="d-flex justify-content-center">
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle mb-4" style={{ width: '150px' }} fluid />
              </div>
              <p className="text-muted mb-2 responsive-text">Bentornato </p>
              <p className="text-muted mb-2 responsive-text"><strong>{profilo.nome}</strong></p>
              <p className="text-muted mb-1">{profilo.ruolo}</p>
              <div className="d-flex flex flex-col items-center mt-5">
                <button className="btn btn-warning py-2 px-4" onClick={toggleModificaProfilo}>Modifica profilo</button>
<<<<<<< HEAD
                <button className="btn btn-warning py-2 px-9 mt-2" onClick={toggleModificaProfilo}>Segnalazioni</button>
                <button className="btn btn-warning py-2 px-4 mt-2" onClick={toggleAggiungiProfilo}>Aggiungi utenti
                </button>
=======
                <button className="btn btn-warning py-2 px-9 mt-2" onClick={toggleSegnalazioniApprovate}>Segnalazioni</button>
                <button className="btn btn-warning py-2 px-4 mt-2" onClick={toggleAggiungiProfilo}>Aggiungi utenti</button>
>>>>>>> b96af35a76f62fe21b203520f8850c6357b5809b
              </div>
            </MDBCardBody>
            <MDBCardImage src="/logo.png" alt="logo" className="mb-4" style={{ width: '50px', display: 'block', margin: '0 auto' }} fluid />
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3"><MDBCardText>Nome</MDBCardText></MDBCol>
                <MDBCol sm="9"><MDBCardText className="text-muted">{profilo.nome}</MDBCardText></MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3"><MDBCardText>Cognome</MDBCardText></MDBCol>
                <MDBCol sm="9"><MDBCardText className="text-muted">{profilo.cognome}</MDBCardText></MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3"><MDBCardText>Email</MDBCardText></MDBCol>
                <MDBCol sm="9"><MDBCardText className="text-muted">{profilo.email}</MDBCardText></MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3"><MDBCardText>Ruolo</MDBCardText></MDBCol>
                <MDBCol sm="9"><MDBCardText className="text-muted">{profilo.ruolo}</MDBCardText></MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
          <MDBRow>
            <MDBCol>
              <MDBCard className="mb-3 mb-md-0 w-full">
                <MDBCardBody>
                  {modificaProfiloVisibile && (
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                      <div className="mb-3">
                        <div>
                          <a>Nome</a>
                          <input onChange={handleModificaProfiloChange} autoComplete="off" type="text" placeholder="Modifica nome..." className="form-control mb-3" name="nome" value={modificaProfiloForm.nome} style={{ maxWidth: '200px' }} />
                        </div>
                        <div>
                          <a>Cognome</a>
                          <input onChange={handleModificaProfiloChange} autoComplete="off" type="text" placeholder="Modifica cognome..." className="form-control mb-3" name="cognome" value={modificaProfiloForm.cognome} style={{ maxWidth: '200px' }} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div>
                          <a>Email</a>
                          <input onChange={handleModificaProfiloChange} autoComplete="off" type="email" placeholder="Modifica email..." className="form-control mb-3" name="email" value={modificaProfiloForm.email} style={{ maxWidth: '200px' }} />
                        </div>
                        <div>
                          <a>Password</a>
                          <input onChange={handleModificaProfiloChange} autoComplete="off" type="password" placeholder="Modifica password..." className="form-control mb-3" name="password" value={modificaProfiloForm.password} style={{ maxWidth: '200px' }} />
                        </div>
                      </div>
                      {error && <div className="text-red-500 text-center">{error}</div>}
                      <div></div>
                      <div className="d-flex justify-content-end align-items-end">
                        <button className="btn btn-secondary me-2" onClick={toggleModificaProfilo}>Annulla</button>
                        <button className="btn btn-success bme-2" onClick={aggiornaProfilo}>Conferma modifiche</button>
                      </div>
                    </div>
                  )}

                  {aggiungiProfiloVisibile && (
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                      <div className="mb-3">
                        <div className="mb-3">
                          <a>Nome</a>
                          <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci nome..." className="form-control" name="nome" value={registrazioneForm.nome} style={{ maxWidth: '250px' }} />
                        </div>
                        <div className="mb-3">
                          <a>Cognome</a>
                          <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci cognome..." className="form-control" name="cognome" value={registrazioneForm.cognome} style={{ maxWidth: '250px' }} />
                        </div>
                        <div className="mb-3">
                          <a>Email</a>
                          <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci email..." className="form-control" name="email" value={registrazioneForm.email} style={{ maxWidth: '250px' }} />
                        </div>
                      </div>
                      <div className="mb-3 ms-md-4">
                        <div className="mb-3">
                          <a>Password</a>
                          <input onChange={handleChange} autoComplete="off" type="text" placeholder="Inserisci password..." className="form-control" name="password" value={registrazioneForm.password} style={{ maxWidth: '250px' }} />
                        </div>
                        <div className="mb-3">
                          <a>Ruolo</a>
                          <select onChange={handleChange} className="form-control" name="ruolo" value={registrazioneForm.ruolo} style={{ maxWidth: '250px' }}>
                            <option value="CISO">CISO</option>
                            <option value="Amministratore di sistema">Amministratore di sistema</option>
                          </select>
                          <div>
                            {registrazioneSuccess && <p className="text-success">Registrazione completata con successo!</p>}
                          </div>
                        </div>
                        {error && <div className="text-red-500 text-center">{error}</div>}
                      </div>
                      <div className="d-flex align-items-end justify-content-between ">
                        <button className="btn me-2 btn-success" onClick={registrami}>Conferma Registrazione</button>
                      </div>
                    </div>

                  )}
                      {SegnalazioniVisibile && (
                      <div>
                       <SegnalazioneAS/>
                      </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

ProfiloAS.propTypes = {
  token: PropTypes.string.isRequired,
};

