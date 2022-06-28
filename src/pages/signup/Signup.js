import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// styles
import './Signup.css';


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { error, isPending, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(displayName, email, password, thumbnail);
  }

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file for profile picture');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Please insert image file (png/jpg)');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Please insert image file size under 100 kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Display Name:</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Profile Thumbail:</span>
        <input
          required
          type='file'
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading..</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Signup;