import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";

function TestPage() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({ q1: "", q2: "" });
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [highlight, setHighlight] = useState({ q1: "", q2: "" });
  const [loading, setLoading] = useState(false); // To track loading state
  const [responseMessage, setResponseMessage] = useState(""); // For backend response
  const [testPhase, setTestPhase] = useState("IT 10-1"); // Track the test phase

  // Handle form submission to calculate score
  const handleSubmit = () => {
    let calculatedScore = 0;
    let highlightAnswers = { q1: "", q2: "" };

    // Calculate score based on answers
    if (answers.q1 === "9") {
      calculatedScore += 1;
      highlightAnswers.q1 = "correct";
    } else {
      highlightAnswers.q1 = "incorrect";
    }

    if (answers.q2 === "15") {
      calculatedScore += 1;
      highlightAnswers.q2 = "correct";
    } else {
      highlightAnswers.q2 = "incorrect";
    }

    setScore(calculatedScore); // Update score state
    setHighlight(highlightAnswers);
    setSubmitted(true);

    // Send score to the backend
    sendScoreToBackend(calculatedScore);

    // Change phase to IT 10-2 after submitting
    setTestPhase("IT 10-2");
  };

  // Send score to the backend server
  const sendScoreToBackend = async (calculatedScore) => {
    setLoading(true); // Show loading indicator
    setResponseMessage(""); // Reset response message

    try {
      // Make sure you're using the correct HTTP URL for your backend
      const response = await fetch("http://localhost:7266/api/ScoreData/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: calculatedScore }), // Send the actual score
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(
          `Score submitted successfully! Server response: ${data.message}`
        );
      } else {
        setResponseMessage("Failed to submit score. Please try again.");
      }
    } catch (error) {
      console.error(error); // Log the error to inspect
      setResponseMessage("Error: Unable to connect to server.");
    } finally {
      setLoading(false); // Hide loading indicator after request
    }
  };

  // Reset form and score when starting a new test
  const handleStartTest = () => {
    setName("");
    setAnswers({ q1: "", q2: "" });
    setScore(0); // Ensure score is reset to 0
    setSubmitted(false);
    setHighlight({ q1: "", q2: "" });
    setResponseMessage(""); // Reset message
    setTestPhase("IT 10-1"); // Reset phase to IT 10-1
  };

  // Check if both name and answers are provided before enabling Submit button
  const isSubmitDisabled = !name || !answers.q1 || !answers.q2;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {testPhase} {/* Dynamically update the title */}
      </Typography>

      {/* Name Field */}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        disabled={submitted} // Disable TextField after submission
      />

      {/* Question 1 */}
      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">
          1. Which one is different from the others?
        </FormLabel>
        <RadioGroup
          value={answers.q1}
          onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
        >
          <FormControlLabel
            disabled={submitted}
            value="3"
            control={<Radio />}
            label="3"
          />
          <FormControlLabel
            disabled={submitted}
            value="5"
            control={<Radio />}
            label="5"
          />
          <FormControlLabel
            disabled={submitted}
            value="9"
            control={<Radio />}
            label="9"
          />
          <FormControlLabel
            disabled={submitted}
            value="11"
            control={<Radio />}
            label="11"
          />
        </RadioGroup>
        {submitted && (
          <Typography color={highlight.q1 === "correct" ? "green" : "red"}>
            {highlight.q1 === "correct" ? "Correct!" : "Incorrect."}
          </Typography>
        )}
      </FormControl>
      <br></br>
      {/* Question 2 */}
      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">
          2. Which one is different from the others?
        </FormLabel>
        <RadioGroup
          value={answers.q2}
          onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
          disabled={submitted} // Disable radio buttons after submission
        >
          <FormControlLabel
            disabled={submitted}
            value="11"
            control={<Radio />}
            label="11"
          />
          <FormControlLabel
            disabled={submitted}
            value="13"
            control={<Radio />}
            label="13"
          />
          <FormControlLabel
            disabled={submitted}
            value="15"
            control={<Radio />}
            label="15"
          />
          <FormControlLabel
            disabled={submitted}
            value="17"
            control={<Radio />}
            label="17"
          />
        </RadioGroup>
        {submitted && (
          <Typography color={highlight.q2 === "correct" ? "green" : "red"}>
            {highlight.q2 === "correct" ? "Correct!" : "Incorrect."}
          </Typography>
        )}
      </FormControl>

      {/* Submit Answer Button */}
      {!submitted && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={isSubmitDisabled} // Disable if name or answers are missing
          >
            Submit Answer
          </Button>
        </Box>
      )}

      {/* Display score after submission */}
      {submitted && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" align="center">
            Name: {name} | Score: {score} / 2
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartTest}
              fullWidth
            >
              Start Test
            </Button>
          </Box>
        </Box>
      )}

      {/* Show loading indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Response message */}
      {responseMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body1"
            color={responseMessage.includes("successfully") ? "green" : "red"}
            align="center"
          >
            {responseMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TestPage;
