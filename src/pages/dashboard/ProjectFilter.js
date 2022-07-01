import { useState } from "react";

const filterList = ['All', 'Mine', 'Development', 'Design', 'Marketing', 'Sales']

const ProjectFilter = () => {
  const [currentFilter, setCurrentFilter] = useState('All');

  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter)
  }

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by :</p>
        {filterList.map((filter) => (
          <button 
            key={filter} 
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;