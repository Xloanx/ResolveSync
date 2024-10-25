import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const MultiSelect = () => {

  // State to store selected options
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()
        console.log(data)
        // Assuming 'data' is an array of users
        const mappedOptions = data.agents.map(agent => {
          // Extract team names
          const teamNames = agent.teams.map(team => team.name).join(', ');
          
          // Construct the label
          return {
            value: agent.id,
            label: `${agent.name} (${teamNames})`
          };
        });

        setOptions(mappedOptions);
      } catch (error) {
        console.error('Error fetching agents:', error)
      } finally {
        setIsLoading(false) // Ensure loading state is set to false after fetch
      }
    }
  
    fetchAgents()
  }, [])

  //console.log(data)

  // Example options for the dropdown
//   const options = [
//     { value: 'user1', label: 'User 1' },
//     { value: 'user2', label: 'User 2' },
//     { value: 'user3', label: 'User 3' },
//     { value: 'user4', label: 'User 4' },
//   ];



  // Handle selection change
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    // <div style={{ width: '300px', margin: '20px auto' }} className="p-4">
    <div>
      <h3>Select Assignee(s)</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        options={options}
        placeholder="Select users..."
      />
      )}
    </div>
  );
};

export default MultiSelect;
