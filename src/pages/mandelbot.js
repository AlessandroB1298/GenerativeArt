import React, { useRef } from "react";
import "./Mandle.css";
const WebcamPage = () => {
  const videoRef = useRef(null);

  const openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const closeWebcam = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="webcam-container">
      <h1>Implementing a face detection generative art algorithm</h1>
      <video ref={videoRef} autoPlay playsInline className="video-element" />
      <div className="button-container">
        <button className="open-button" onClick={openWebcam}>
          Open Webcam
        </button>
        <button className="close-button" onClick={closeWebcam}>
          Close Webcam
        </button>
      </div>
    </div>
  );
};
export default WebcamPage;
