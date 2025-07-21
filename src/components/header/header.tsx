import { Container, Dropdown, Navbar } from "react-bootstrap"
import { useAuth } from '../../context/authContext';
import ThemeToggle from "../themeToggle/themeToggle";

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
            <div className="mx-3 d-flex">
                <ThemeToggle />
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white fw-medium mx-2"
                  style={{ width: 25, height: 25 }}
                >
                  {getInitials(user?.username  || '')}
                </div>
                <div  className="text-dark fw-medium">
                  {user?.username}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={logout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
