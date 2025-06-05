import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/HomePage/Home'
import Cart from '../Pages/CartPage/Cart'
import ProductDetails from '../Pages/ProductDetails/ProductDetails'
import FutureProductDetails from '../Pages/FutureProductsPage/FutureProductDetails'
import AllProducts from '../Pages/AllProducts/AllProducts'

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/> 
        <Route path='product-details/:id' element={<ProductDetails />}/>
        <Route path='future-products/:id' element={<FutureProductDetails />} />
        <Route path='all-products' element={<AllProducts />} />
        <Route path='*' element={<p className='text-center text-5xl'>Page not found</p>}/>
    </Routes>
  )
}

export default Routing