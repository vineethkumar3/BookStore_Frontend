import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksData from '../data/books.json';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { quantities, setQuantities } = useCart();
  const [animatedCard, setAnimatedCard] = useState(null);
  const [cartAnim, setCartAnim] = useState(false);
  const [logoutAnim, setLogoutAnim] = useState(false);

  const triggerCardAnimation = (id) => {
    setAnimatedCard(id);
    setTimeout(() => setAnimatedCard(null), 300);
  };

const handleBuyNow = (id) => {
  setQuantities((prev) => ({ ...prev, [id]: 1 }));
  triggerCardAnimation(id);
  updateCart(id, 1); // 🆕
};

const handleIncrement = (id) => {
  const newQty = (quantities[id] || 1) + 1;
  setQuantities((prev) => ({ ...prev, [id]: newQty }));
  triggerCardAnimation(id);
  updateCart(id, newQty); // 🆕
};
const handleDecrement = (id) => {
  const newQty = (quantities[id] || 1) - 1;
  const finalQty = newQty < 1 ? 0 : newQty;
  setQuantities((prev) => ({ ...prev, [id]: finalQty }));
  triggerCardAnimation(id);
  updateCart(id, finalQty); // 🆕
};

  const handleCartClick = () => {
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 400);
    navigate('/cart');
  };

  const handleLogoutClick = () => {
    setLogoutAnim(true);
    setTimeout(() => setLogoutAnim(false), 400);
    navigate('/');
  };

const updateCart = async (bookId, quantity) => {
    console.log(`📦 updateCart called — bookId: ${bookId}, quantity: ${quantity}`);
    const token = localStorage.getItem('token');
      if (!token) {
    console.warn("❌ No token found — user might not be logged in");
    return;
  }
  try {
      console.log('update cart function was called')
    await fetch('http://127.0.0.1:5000/cart/update', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token,
  },


      body: JSON.stringify({ book_id: bookId, quantity }),
    });
  } catch (err) {
    console.error('Failed to update cart:', err);
  }
};


  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <h1>Welcome, Admin</h1>
        </div>
        <div className="header-right">
          <button
            className={`header-btn ${cartAnim ? 'pulse-animate' : ''}`}
            onClick={handleCartClick}
          >
            View Cart
          </button>
          <button
            className={`header-btn logout ${logoutAnim ? 'shake-animate' : ''}`}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="book-grid">
        {booksData.map((book) => {
          const qty = quantities[book.id] || 0;
          return (
            <div
              key={book.id}
              className={`book-card ${animatedCard === book.id ? 'animate' : ''}`}
            >
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>${book.price.toFixed(2)}</p>

              {qty < 1 ? (
                <button className="buy-btn" onClick={() => handleBuyNow(book.id)}>
                  Buy Now
                </button>
              ) : (
                <div className="qty-control">
                  <button onClick={() => handleDecrement(book.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleIncrement(book.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
