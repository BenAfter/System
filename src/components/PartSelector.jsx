import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  IconButton,
  TextField
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const PartSelector = ({ onPartSelect, onPartCreate, onPartEdit }) => {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePartSelect = (part) => {
    setSelectedPart(part);
    onPartSelect(part);
  };

  const handleAddPart = () => {
    const newPart = {
      id: Date.now(),
      name: 'New Part',
      type: 'custom',
      parameters: {}
    };
    setParts([...parts, newPart]);
    setIsEditing(true);
    setSelectedPart(newPart);
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Model Parts</Typography>
        <IconButton onClick={handleAddPart} color="primary">
          <Add />
        </IconButton>
      </Box>

      <List>
        {parts.map((part) => (
          <ListItem 
            key={part.id}
            selected={selectedPart?.id === part.id}
            onClick={() => handlePartSelect(part)}
            sx={{ 
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemText 
              primary={part.name}
              secondary={`Type: ${part.type}`}
            />
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton size="small" color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PartSelector;
