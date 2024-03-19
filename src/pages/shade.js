import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Shade = () => {
  const canvasRef = useRef();
  const [lineWidth, setLineWidth] = useState(2); // Set an initial value
  const [rows, setRows] = useState(1);
  const [rowHeight, setRowHeight] = useState(50);
  const [spacing, setSpacing] = useState(1.5);

  const handleLineWidthChange = (event, newValue) => {
    // Update the line width when the slider changes
    setLineWidth(newValue);
  };
  const handleRow = (event, newValue) => {
    // Update the number of rows when the slider changes
    setRows(newValue);
  };

  const handleRowHeight = (event, newValue) => {
    setRowHeight(newValue);
  };

  const handleSpacing = (event, newValue) => {
    setSpacing(newValue);
  };

  useEffect(() => {
    // Logic for generating zigzag patterns

    const rowWidth = 300;
    const totalPatterns = 20;
    const points = [
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 150, y: 50 },
      { x: 200, y: 100 },
      { x: 250, y: 50 },
    ];

    const generateZigzagPatterns = () => {
      let patterns = [];
      for (let patternIndex = 0; patternIndex < totalPatterns; patternIndex++) {
        const startX = patternIndex * rowWidth - 200;
        for (let i = 0; i < rows; i++) {
          const pattern = {
            startX,
            startY: i * rowHeight * 2,
            spacing,
          };
          patterns.push(pattern);
        }
      }
      return patterns;
    };

    const zigzagPatterns = generateZigzagPatterns();

    // Logic for drawing on the canvas
    const canvas = canvasRef.current;

    const ctx = canvas && canvas.getContext("2d");
    const color = (ctx.fillStyle = "black");

    if (!ctx) return;

    const drawZigzagPatterns = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      for (const pattern of zigzagPatterns) {
        createZigzag(
          points,
          pattern.startX,
          pattern.startY,
          pattern.spacing,
          lineWidth
        );
      }
    };

    drawZigzagPatterns();
  }, [lineWidth, rows, rowHeight, spacing]);

  // Separate useEffect for handling other effects related to lineWidth
  useEffect(() => {}, [lineWidth]);

  useEffect(() => {}, [rows]);

  const createZigzag = (points, startX, startY, spacing, lw) => {
    var x, y, lx, ly, mx, my;
    var height = 5;

    const ctx = canvasRef.current && canvasRef.current.getContext("2d");

    if (!ctx) return;

    ctx.beginPath();
    ctx.lineWidth = lw; // Set the line width

    for (var i = 0; i < points.length; i++) {
      x = points[i].x * spacing + startX;
      y = points[i].y + startY;

      if (i === 0) {
        ctx.moveTo(x, y);
        continue;
      }

      lx = points[i - 1].x * spacing + startX;
      ly = points[i - 1].y + startY;
      mx = (lx + x) / 2;
      my = (ly + y) / 2;

      my -= height;

      ctx.quadraticCurveTo(mx, my, x, y);
    }

    ctx.stroke();
  };

  return (
    <div className="canvas-container" style={{ marginLeft: "20px" }}>
      <h1>Zig Zag Art</h1>
      <canvas
        ref={canvasRef}
        width={6500}
        height={500}
        style={{ border: "1px solid #000" }}
      ></canvas>{" "}
      <Box sx={{ width: 300, marginTop: 2 }}>
        <Typography gutterBottom>Line Width</Typography>
        <Slider
          value={lineWidth}
          onChange={handleLineWidthChange}
          aria-label="Line Width"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box sx={{ width: 300, marginTop: 2 }}>
        <Typography gutterBottom>Rows</Typography>
        <Slider
          defaultValue={1}
          onChange={handleRow}
          aria-label="x values"
          valueLabelDisplay="auto"
          min={1} // Set the minimum value
          max={100} // Set the maximum value
        />
      </Box>
      <Box sx={{ width: 300, marginTop: 2 }}>
        <Typography gutterBottom>Row Height</Typography>
        <Slider
          defaultValue={1}
          onChange={handleRowHeight}
          aria-label="x values"
          valueLabelDisplay="auto"
          max={10}
          min={-20}
        />
      </Box>{" "}
      <Box sx={{ width: 300, marginTop: 2 }}>
        <Typography gutterBottom>Spacing</Typography>
        <Slider
          defaultValue={0}
          onChange={handleSpacing}
          aria-label="x values"
          valueLabelDisplay="auto"
          min={0}
          max={2.5}
        />
      </Box>{" "}
    </div>
  );
};

export default Shade;
