import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'
import MovieDetails from './pages/MovieDetails/MovieDetails.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Favorites from './pages/Favorites/Favorites.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
