
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/services';
import { Container } from 'react-bootstrap';


const LogIn = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin() {

    try {
        const users = await getUsers();

        const foundUser = users.find(
        (user) => user.name === username && user.password === password
        );

        if (!foundUser) {
        return setError('Credenciales incorrectas');
        }

        const user = {
        username: foundUser.name,
        isAdmin: foundUser.isAdmin,
        token: 'fake-token-' + foundUser.id,
        };

        login(user);

        if (user.isAdmin) {
        navigate('/');
      } else {
        navigate('/regularuser');

      }

    }catch (err) {
      setError('Error al conectar con el servidor');
    }
  }

return (
  <Container>
    <div  className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className='mb-3'>
        <img src='./logo.svg' width={70}></img>
      </div>
      <input
      className='mb-3'
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
       className='mb-3'
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
    </Container>
  );
}
export default LogIn;
