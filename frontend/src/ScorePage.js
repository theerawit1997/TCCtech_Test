import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function ScorePage() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch('https://localhost:7266/api/ScoreData/all')
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Score Page</Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score) => (
              <TableRow key={score.id}>
                <TableCell>{score.name}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{score.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ScorePage;
