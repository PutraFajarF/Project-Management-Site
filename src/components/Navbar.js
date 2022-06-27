import { Link } from 'react-router-dom';

// styles
import './Navbar.css';
import Temple from '../assets/temple.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='proman logo' />
          <span>The Proman</span>
        </li>

        <li><Link to='login'>Login</Link></li>
        <li><Link to='signup'>Signup</Link></li>
        <li>
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;