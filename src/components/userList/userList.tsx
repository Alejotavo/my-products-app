import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../services/services";
import { Card, Table } from "react-bootstrap";
import type { User } from "../../models/user";
import './userList.css';
import PreLoad from "../preload/preload";


function UserList() {
      
const [users, setUsers] = useState<User[]>([]); 
const [loading, setLoading] = useState(false); 

useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response); 
      } catch (err) {
        console.log("Error al conectar con el servidor", err);
      }
    };

    fetchUsers();
  }, []);



  const handleToggleAdmin = async (user: User) => {
  setLoading(true);

  const updated = { ...user, isAdmin: !user.isAdmin };

  try {
    const savedUser = await updateUser(updated);

    setUsers(prev => prev.map(u => (u.id === savedUser.id ? savedUser : u))

    );
  } catch (error) {
    console.error('No se pudo actualizar el usuario:', error);
  }  finally {
    setLoading(false);
  }
};


  return (
    <Card className="p-3">
      <>
         {loading ?  (<PreLoad />) : (
           <Table  striped  hover size="sm">
            <thead>
              <tr>
                <th>NAME</th>
              </tr>
            </thead>
            <tbody>
            {users.map( user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.isAdmin ? 'Admin' : 'No es Admin'}</td>
                    <td>
                      {user.name === 'alejotavo' ? (
                            <div className="switch-toggle admin">
                            <input type="checkbox"  checked={true} 
                            disabled
                            readOnly  />
                            <label htmlFor={`toggleSwitch`}></label>
                          </div>
                        ) : (
                          <div className="switch-toggle">
                            <input 
                            type="checkbox" 
                            id={`toggleSwitch-${user.id}`} 
                            checked={user.isAdmin}  
                            onChange={() => handleToggleAdmin(user)} 
                            />
                            <label htmlFor={`toggleSwitch-${user.id}`}></label>
                          </div>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
          </Table>
         )}
      </>
    </Card>
  )
}

export default UserList
