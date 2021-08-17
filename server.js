const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./config/conectDB')
const PORT = process.env.PORT || 3310
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')

db()

app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
