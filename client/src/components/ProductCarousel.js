import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1
        style={{
          color: '#000',
          fontSize: '26px',
          fontWeight: '300',
          textAlign: 'center',
          textTransform: 'uppercase',
          position: 'relative',
          marginBottom: '15px',
        }}
      >
        Trending <b style={{ color: '#ffc000' }}>Products</b>
      </h1>
      <Carousel
        variant='dark'
        pause='hover'
        className='bg-white'
        style={{
          display: 'flex',
          flexDirection: 'colmun',
          border: '2px ',
          borderRadius: '3%',
          boxShadow: '3px 3px 3px 2px',
        }}
      >
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                className='d-block w-100 img-box'
                style={{ maxWidth: '200px' }}
                src={product.image}
                alt={product.name}
                fluid
              />
              <Carousel.Caption className='carousel-caption'>
                <h2 style={{ fontSize: '25px', color: 'black' }}>
                  {product.name} ({product.price}DTN)
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
