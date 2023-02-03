import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import Message from "../components/Message";
import {
  Box,
  Grid,
  GridItem,
  TextField,
  Button,
  AppBar,
  Toolbar,
  NoSsr,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
  Container,
  rgbToHex,
  IconButton,
  MoreVertIcon,
  Menu,
  anchorEl,
  MenuList,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
} from "@mui/material";
import React from "react";
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import MenuIcon from '@mui/icons-material/Menu';
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [hybrids, setHybrids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollableContainerRef = useRef(null);
  //time
  let [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(() => {
    if (!timestamp) {
      setTimestamp(new Date().toLocaleString());
    }
    scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
  }, [hybrids, timestamp]);

  async function onSubmit(event, animal = animalInput) {
    event.preventDefault();
    setAnimalInput("");
    let currentTimestamp = new Date().toLocaleString();
    setHybrids([...hybrids, { text: animal, author: "User", timestamp: currentTimestamp }]);

    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      let currentTimestamp2 = new Date().toLocaleString();

      setHybrids([...hybrids, { text: animal, author: "User", timestamp: currentTimestamp }, { text: data.result, author: "StarburgerAI", timestamp: currentTimestamp2 }]);
      setAnimalInput("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <div className={styles.container} style={{ height: "100vh" }}>
      <Head>
        <title>Speak to StarburgerAI and leave a Review</title>
        <link rel="icon" href="/starb.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "rgb(240,240,240)", width: "100%", top: 'auto', justify: "space-between" }}>
        <Toolbar >
          <Grid
            container
          > <Grid item style={{ flex: 1 }}>
              <Avatar alt="Logo of Starburger" src="/starb.png" sx={{ width: 50, height: 50 }} />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="open drawer"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}

              > <MenuIcon />         </IconButton>
              <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '100%',
                },
              }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Grid>

          </Grid>






        </Toolbar>
      </AppBar>
      <div className={styles.scrollableContainer} style={{ width: "100%", height: "80vh" }} ref={scrollableContainerRef}>
        <div className={styles.messageContainer}>
          <Message
            author="StarburgerAI"
            text="Hey... 👋"
            timestamp={<NoSsr>{timestamp}</NoSsr>}>
          </Message>
        </div>
        <div className={styles.messageContainer}>
          <Message
            author="StarburgerAI"
            text="Thanks for jumping on to the Starburger feedback chat 🙏.  We are here to help and serve… 😃 What can we do for you?"
            timestamp={<NoSsr>{timestamp}</NoSsr>}>
          </Message>
        </div>


        {hybrids.map((hybrid, index) => (
          <div key={index} className={styles.messageContainer}>
            <div>
              <div className={hybrid.author === "User" ? styles.animalLeft : styles.animalRight}>
                {hybrid.text}
                <div className={hybrid.author === "User" ? styles.subtextLeft : styles.subtext}>
                  {hybrid.timestamp} - {hybrid.author}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ clear: "both" }}></div>
      </div>

      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "rgb(240,240,240)", width: "100%", top: 'auto', bottom: 0 }}>
        <div position="fixed" className={styles.inputContainer}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input type="text"
              className={styles.input}
              placeholder="Enter message..."
              value={animalInput}
              disabled={isLoading}
              onChange={e => setAnimalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? onSubmit(e) : null}
            />
          </form>
          <button type="submit" className={styles.submit} disabled={isLoading} onClick={(e) => onSubmit(e)}>
            {isLoading ? "Processing..." : "SUBMIT"}
          </button>


        </div>
        <footer className={styles.footer}>
          <p>Powered by <a href="https://www.rivaltech.com/">Rival</a></p>
        </footer>
      </AppBar>

    </div >
  );
}
