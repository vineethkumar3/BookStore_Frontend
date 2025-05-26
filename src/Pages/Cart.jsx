import { useNavigate } from 'react-router-dom';
import { useCart } from 'CartContext';
import booksData from '../data/books.json';
import './Cart.css';

const Cart = () => {
  const { quantities } = useCart();
  const navigate = useNavigate();

  const cartItems = booksData.filter((book) => quantities[book.id]);
  const totalQuantity = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const totalPrice = cartItems.reduce(
    (sum, book) => sum + book.price * (quantities[book.id] || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((book) => (
            <div key={book.id} className="cart-item">
              <img src={book.image} alt={book.title} />
              <div>
                <h3>{book.title}</h3>
                <p>Price: ${book.price.toFixed(2)}</p>
                <p>Quantity: {quantities[book.id]}</p>
                <p>Total: ${(book.price * quantities[book.id]).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <hr />
      <p><strong>Total Quantity:</strong> {totalQuantity}</p>
      <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

      <div className="cart-actions">
        <button onClick={() => navigate('/home')}>Back to Home</button>
        <button onClick={() => navigate('/checkout')}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Cart;
