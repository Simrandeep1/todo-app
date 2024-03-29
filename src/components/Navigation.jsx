import React, {useContext} from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import logo from '../images/logo.png';
import Vector from '../images/Vector.png';
import AuthContext from '../Context/AuthContext';
import TaskContext from '../Context/TaskContext';


function Navigation(props) {
  const{user,setUser} =useContext(AuthContext);
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  }

  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" />Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {
            !user ?
            <>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/about">{user?.name}</NavLink>
                </li>
              
              </>
              :
              <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-task">Create Task</NavLink>
            </li>
            <li className="nav-item">
             <NavLink className="nav-link" to="/task-list">Task List </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/profile">{user?.name}</NavLink>
            </li>
            <Link className="navbar-brand" to="/">
             <img src={Vector} alt="vector"/></Link>
          
            <li className="nav-item" onClick={logout}><button className="btn btn-primary">Logout</button></li>
            </>
    
}
</ul>
</div>
</nav>
  );
}
              
              
            
export default Navigation;