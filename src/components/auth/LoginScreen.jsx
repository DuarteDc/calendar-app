import React from 'react'

import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';

import { startLogin, startRegister } from '../../actions/authActions';

import './login.css';
import Swal from 'sweetalert2';


const LoginScreen = () => {

  const dispatch = useDispatch();

  const [loginValues, handleLoginInputChange] = useForm({
    lEmail: 'duarte@email.com',
    lpassword: 'password'
  });

  const [RegisterValues, handleRegisterInputChange] = useForm({
    rName: 'Duarte',
    rEmail: 'duarte@email.com',
    rpassword: 'password',
    rpassword2: 'password'
  });

  const { lEmail, lpassword } = loginValues;
  const { rName, rEmail, rpassword, rpassword2 } = RegisterValues;

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLogin(lEmail, lpassword))
  }

  const handleRegister = (event) => {
    event.preventDefault();
    if (rpassword !== rpassword2) {
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    }
    dispatch(startRegister(rName, rEmail, rpassword));
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lpassword"
                value={lpassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rpassword"
                value={rpassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rpassword2"
                value={rpassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen