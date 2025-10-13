import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";

import { img_500, unavailable, unavailableLandscape } from "../config/config";
import Carousel from "../components/Carousel";
import "./ContentModal.css";

export default function TransitionsModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setContent(null);
    setVideo(null);
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key || null);
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo(null);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
      fetchVideo();
    }
  }, [open]);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      >
        {children}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={open}>
          {/* Show loading if loading */}
          {loading ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              Loading...
            </Box>
          ) : (
            content && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  height: "80%",
                  bgcolor: "#39445a",
                  border: "1px solid #282c34",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 2,
                  color: "white",
                  overflowY: "auto",
                  outline: "none",
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                  style={{ maxHeight: "80vh", borderRadius: 10 }}
                />
                <div className="ContentModal__about" style={{ flex: 1 }}>
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                    style={{ width: "100%", borderRadius: 10, marginBottom: 10 }}
                  />

                  <span
                    className="ContentModal__title"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    {content.name || content.title} (
                    {(content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>

                  {content.tagline && <i className="tagline">{content.tagline}</i>}

                  <p className="ContentModal__description" style={{ marginTop: 10 }}>
                    {content.overview}
                  </p>

                  <Carousel id={id} media_type={media_type} />

                  {video && (
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="error"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      sx={{ mt: 2 }}
                    >
                      Watch the Trailer
                    </Button>
                  )}
                </div>
              </Box>
            )
          )}
        </Fade>
      </Modal>
    </>
  );
}
