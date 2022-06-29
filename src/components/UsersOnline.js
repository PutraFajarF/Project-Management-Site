import { useCollection } from '../hooks/useCollection';

// components
import Avatar from './Avatar';

// styles
import './UsersOnline.css';

const UsersOnline = () => {
  const { error, documents } = useCollection('users');

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {documents && documents.map(user => (
        <div className='user-list-item' key={user.id}>
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL}/>
        </div>
      ))}
    </div>
  );
};

export default UsersOnline;