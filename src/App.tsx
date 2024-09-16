import React, { useState } from 'react';
import { RequestField, RequestType } from './types/types';
import './index.css'
import axios from 'axios';

const App: React.FC = () => {
  const [requestType, setRequestType] = useState<RequestType>({
    id: '1',
    name: '',
    department: 'Sales',
    priority: 'Medium',
    fields: [],
  });

  const [newField, setNewField] = useState<RequestField>({
    id: '',
    name: '',
    type: 'text',
    required: false,
  });

  const addField = () => {
    setRequestType({
      ...requestType,
      fields: [...requestType.fields, { ...newField, id: Date.now().toString() }],
    });
    setNewField({ id: '', name: '', type: 'text', required: false });
  };

   const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // Post data to the server
      const response = await axios.post('https://localhost:5005/api/request-types', requestType, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Error posting data:', error);
     
    }
  };

  return (
   <div className="container">
  <h1>Create New Request Type</h1>
  <div>
    <label className="label">
      Request Type Name:
      <input
        className="input-field"
        value={requestType.name}
        onChange={(e) => setRequestType({ ...requestType, name: e.target.value })}
      />
    </label>
  </div>
  <div>
    <label className="label">
      Department:
      <select
        className="input-field"
        value={requestType.department}
        onChange={(e) => setRequestType({ ...requestType, department: e.target.value as any })}
      >
        <option value="Sales">Sales</option>
        <option value="Procurement">Procurement</option>
        <option value="Compliance">Compliance</option>
        <option value="HR">HR</option>
      </select>
    </label>
  </div>
  <div>
    <label className="label">
      Priority:
      <select
        className="input-field"
        value={requestType.priority}
        onChange={(e) => setRequestType({ ...requestType, priority: e.target.value as any })}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </label>
  </div>

  <h2>Add Fields</h2>
  <div>
    <label className="label">
      Field Name:
      <input
        className="input-field"
        value={newField.name}
        onChange={(e) => setNewField({ ...newField, name: e.target.value })}
      />
    </label>
    <label className="label">
      Field Type:
      <select
        className="input-field"
        value={newField.type}
        onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="file">File</option>
      </select>
    </label>
    <label className="label">
      Required:
      <input
        className="checkbox"
        type="checkbox"
        checked={newField.required}
        onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
      />
    </label>
    <button className="button" onClick={addField}>Add Field</button>
  </div>

  <h2>Current Fields</h2>
  <ul className="ul">
    {requestType.fields.map((field) => (
      <li className="li" key={field.id}>
        {field.name} ({field.type}) - {field.required ? 'Required' : 'Optional'}
      </li>
    ))}
  </ul>

  <button className="button" onClick={handleSave}>Save Request Type</button>
</div>

  );
};

export default App;
