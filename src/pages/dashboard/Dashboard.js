import { useCollection } from '../../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

// components
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

// styles
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('All');

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'mine':
        let asignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            asignedToMe = true
          }
        })
        return asignedToMe
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        console.log(document.category, currentFilter);
        return document.category === currentFilter;
      default:
        return true;
    }
  }) : null;

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects}/>}
    </div>
  )
};

export default Dashboard;