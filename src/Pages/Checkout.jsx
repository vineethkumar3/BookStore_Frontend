import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { quantities } = useCart();

  const cartItems = booksData.filter((book) => quantities[book.id]);
  const totalPrice = cartItems.reduce(
    (sum, book) => sum + book.price * (quantities[book.id] || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment submitted! (Demo only)');
    navigate('/home');
  };

  return (
    <div className="checkout-container">
      <h2>Payment Information</h2>
      <p><strong>Total Amount:</strong> ${totalPrice.toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Shipping Address:
          <input type="text" name="address" required />
        </label>

        <label>
          Credit Card Number:
          <input type="text" name="card" maxLength="16" required />
        </label>

        <label>
          Expiry Date (MM/YY):
          <input type="text" name="expiry" placeholder="MM/YY" maxLength="5" required />
        </label>

        <label>
          CVV:
          <input type="password" name="cvv" maxLength="4" required />
        </label>

        <div className="checkout-buttons">
          <button type="button" onClick={() => navigate('/cart')}>Back to Cart</button>
          <button type="submit">Submit Payment</button>
          <button type="button" onClick={() => navigate('/home')}>Home Page</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
