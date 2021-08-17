const Product = require('../models/productModel')

//GET /api/products

const getProducts = async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
}

//GET /api/products/:id

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    }
  } catch (error) {
    res.status(404).send('Product not found')
  }
}

// Admin DELETE /api/products/:id

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    }
  } catch (error) {
    res.status(404).send('Product not found')
  }
}

// POST /api/admin/products

const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}

// Admin update PUT /api/products/:id

const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    }
  } catch (error) {
    res.status(404).send('Product not found')
  }
}

//POST /api/products/:id/reviews

const createProductReview = async (req, res) => {
  const { rating, comment } = req.body
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added' })
    }
  } catch (error) {
    res.status(404).find('Product not found')
  }
}

//GET /api/products/top

const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
