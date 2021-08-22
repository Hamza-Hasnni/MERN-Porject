import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import '../style/login.css'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div class='container-fluid'>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <div class='row no-gutter'>
        <div class='col-md-6 d-none d-md-flex bg-image'></div>

        <div class='col-md-6 bg-light'>
          <div class='login d-flex align-items-center py-5'>
            <div class='col-lg-10 col-xl-7 mx-auto'>
              <h3 class='display-4'>Welcome Back!!</h3>
              <p class='text-muted mb-4'>
                To keep connected with us please login with your personal info.
              </p>
              <form onSubmit={submitHandler}>
                <div class='form-group mb-3'>
                  <input
                    id='inputEmail'
                    type='email'
                    placeholder='Email address'
                    required
                    autofocus
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

                <button
                  type='submit'
                  class='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm'
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default LoginScreen
