import {
  AppBar,
  Button,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { format } from "date-fns";
import Head from "next/head";
import { useState } from "react";

type ChatMessage = {
  question: string;
  date: string;
};

const getCurrentDate = () => {
  const result = format(new Date(), "HH:mm aaa, ccc, dd MMM");
  return result.toString();
};

const chatMessages = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
    date: "01:02 am, Wed, 01 Feb",
  },
];

export default function Demo() {
  const [messages, updateMessages] = useState<ChatMessage[]>(chatMessages);

  const [newQuestion, setNewQuestion] = useState<string>("");

  const addMessage = () => {
    updateMessages([
      ...messages,
      {
        question: newQuestion,
        date: getCurrentDate(),
      },
    ]);
    setNewQuestion("");
  };

  return (
    <>
      <Head>
        <title>Chat Layout</title>
      </Head>
      <Container>
        <Box sx={{ flexGrow: 1, mb: 2 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Questions & Answers
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            height: "70vh",
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {messages.map((message: ChatMessage, index) => (
            <>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  mb: 2,
                  fontSize: 12,
                  height: "auto",
                  lineHeight: "22px",
                  whiteSpace: "nowrap",
                  color: "text.disabled",
                  justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
                }}
              >
                <Stack
                  spacing={2}
                  direction="column"
                  sx={{
                    mb: 2,
                    maxWidth: "70%",
                    whiteSpace: "pre-line",
                    padding: 2,
                    borderRadius: 5,
                  }}
                >
                  <Paper
                    sx={{
                      whiteSpace: "pre-line",
                      padding: 2,
                      borderRadius: 5,
                      background: index % 2 === 0 ? "#1565c0" : "flex-start",
                      color: index % 2 === 0 ? "#FFFFFF" : "inherit",
                    }}
                  >
                    <Typography>{message.question}</Typography>
                  </Paper>
                  <Typography variant="body2">
                    {message.date.toString()}
                  </Typography>
                </Stack>
              </Box>
            </>
          ))}
        </Box>
        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            id="questionInput"
            placeholder="Ask a question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button size="small" variant="contained" onClick={addMessage}>
            Ask question
          </Button>
        </Stack>
      </Container>
    </>
  );
}
