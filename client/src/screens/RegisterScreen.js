import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import '../style/register.css'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div class='container-fluid'>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <div class='row no-gutter'>
        <div class='col-md-6 d-none d-md-flex bg-image'></div>

        <div class='col-md-6 bg-light'>
          <div class='login d-flex align-items-center py-5'>
            <div class='col-lg-10 col-xl-7 mx-auto'>
              <h3 class='display-4'>Hello, Friend!</h3>
              <p class='text-muted mb-4'>
                Enter your personal details and start journey with us
              </p>
              <form onSubmit={submitHandler}>
                <div class='form-group mb-3'>
                  <input
                    id='email'
                    type='name'
                    placeholder='Enter name'
                    class='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class='form-group mb-3'>
                  <input
                    id='email'
                    type='email'
                    placeholder='Enter email'
                    class='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class='form-group mb-3'>
                  <input
                    id='inputPassword'
                    type='password'
                    placeholder='Password'
                    required=''
                    class='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class='form-group mb-3'>
                  <input
                    type='password'
                    placeholder='Confirm password'
                    class='form-control rounded-pill border-0 shadow-sm px-4 text-primary'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  class='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm'
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterScreen
