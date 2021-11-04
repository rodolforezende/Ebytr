import React from 'react';
import { Redirect } from 'react-router-dom';

const Header = () => {

  const [ buttonLog, setButtonLog ] = React.useState(true);
  const [ load, setLoad ] = React.useState(false)

  React.useEffect(() => {
    if (window.location.pathname === '/' || window.location.pathname === '/users') {
      setButtonLog(false)
    }
  }, [])

  function logout () {
    localStorage.clear();
    setLoad(true)
  }


  return (
    <div className="header">
      <h1>Ebytr</h1>
      { buttonLog && <button className="logout" onClick={ logout }>X</button>}
      { load && <Redirect to="/"/>}
    </div>
  )
}

export default Header;
