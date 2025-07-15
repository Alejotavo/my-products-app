import { Button, Container, Navbar } from "react-bootstrap"
import { useAuth } from '../../context/authContext';

function Header() {
 
  const { user, logout } = useAuth();


  function getInitials(name: string) {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
}

  return (
    <header >
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/"><img src='/logo.svg' width={40}></img></Navbar.Brand>
          <div className="d-flex align-items-center ">
            <div>
               <Button onClick={logout} size="sm">Log Out</Button>
           </div>
           <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white fw-medium mx-2"
              style={{ width: 25, height: 25 }}
            >
              {getInitials(user?.username  || '')}
            </div>
            <div  className="text-dark fw-medium">
              {user?.username}
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
