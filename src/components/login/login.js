import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';

import style from './login.module.css'

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className={style.textHeader}>Войти</h1>
              <p className="text-xs-center">
                <Link to="/register" className={style.textLinkAccount}>
                  Хотите создать аккаунт?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <label className={style.textLabel} for="email">E-mail</label>
                    <input
                      className={`${style.inputRegister} form-control form-control-lg`}
                      type="email"
                      id="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                  <label className={style.textLabel} for="password">Пароль</label>
                    <input
                      className={`${style.inputRegister} form-control form-control-lg`}
                      type="password"
                      placeholder="Пароль"
                      id="password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className={`btn btn-primary pull-xs-right ${style.buttonRegister}`}
                    type="submit"
                    disabled={this.props.inProgress}>
                    Войти
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
