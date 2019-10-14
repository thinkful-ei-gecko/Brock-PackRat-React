import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, fullname, password } = ev.target

    this.setState({ error: null})

    console.log('registration form submitted')
    console.log( fullname.value , username.value , password.value )

    AuthApiService.postUser({fullname: fullname.value, username: username.value, password: password.value})
    .then(user => {
      username.value = ''
      fullname.value = ''
      password.value = ''
      this.props.onRegistrationSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }


  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='fullname'>
          <label htmlFor='RegistrationForm__fullname'>
            Full name <Required />
          </label>
          <Input
            name='fullname'
            type='text'
            required
            id='RegistrationForm__fullname'>
          </Input>
        </div>
        <div className='username'>
          <label htmlFor='RegistrationForm__username'>
            User name <Required />
          </label>
          <Input
            name='username'
            type='text'
            required
            id='RegistrationForm__username'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
      </form>
    )
  }
}