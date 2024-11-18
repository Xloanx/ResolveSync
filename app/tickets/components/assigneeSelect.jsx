import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const AssigneeSelect = ({ selectedAssignees, onChange }) => {

  // State to store selected options
  const [assignees, setAssignees] = useState([]);
  //const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert assignees to the format expected by react-select
  // const options = assignees.map((assignee) => ({
    // value: assignee.id,
  //   label: assignee.name,
  // }));

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }
        const data = await response.json()
        // Assuming 'data' is an array of users
        const mappedOptions = data.agents.map(agent => ({
          // Extract team names
          //const teamNames = agent.teams.map(team => team.name).join(', ');
          
          // Construct the label
          // return {
          //   value: agent.id,
          //   label: `${agent.name} (${teamNames})`
          // };
          value: agent.id,
          label: `${agent.name} ${agent.teams.length ? `(${agent.teams.map(team => team.name).join(', ')})` : ''}`,
          name: agent.name, // Store the name separately for easier access
          id: agent.id
        }));

        setAssignees(mappedOptions);
        setError(null);
      } catch (error) {
        console.error('Error fetching agents:', error)
        setError('Failed to load assignees. Please try again.');
      } finally {
        setIsLoading(false) // Ensure loading state is set to false after fetch
      }
    }
  
    fetchAgents()
  }, [])



  // Handle selection change
//   const handleSelectChange = (selectedOptions) => {
//     const selectedAssignees = selectedOptions ? selectedOptions.map(option => ({
//         id: option.value,
//         name: option.label
//     })) : [];
//     onChange(selectedAssignees);
// };
const handleSelectChange = (selectedOptions) => {
  if (!selectedOptions) {
    onChange([]); // Handle clearing all selections
    return;
  }

  // Convert the react-select format back to your desired format
  const formattedAssignees = selectedOptions.map(option => ({
    id: option.value,
    name: option.label.split(' (')[0] // Extract just the name part
  }));

  onChange(formattedAssignees);
};


  return (
    // <div style={{ width: '300px', margin: '20px auto' }} className="p-4">
    <div>
      <h3>Select Assignee(s)</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {isLoading ? (
        <p>Loading assignees...</p>
      ) : (
      <Select
        isMulti
        // value={selectedAssignees.map(assignee => ({
        //     value: assignee.id,
        //     label: assignee.name
        // }))}
        value={assignees.filter(option => 
          selectedAssignees.some(selected => selected.id === option.value)
        )}
        onChange={handleSelectChange}
        options={assignees}
        placeholder="Select assignees..."
        className="basic-multi-select"
        classNamePrefix="select"
      />
      )}
    </div>
  );
};

export default AssigneeSelect;
