import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const clearCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    function generateHslaColors(hMin, hMax, sMax, sMin, lMax, lMin, am) {
      let colors = [];
      let lightnessDelta = (lMax - lMin) / am;

      for (let i = 0; i < am; i++) {
        let lightness = lMin + i * lightnessDelta;
        colors.push(
          `hsla(${getRandomInt(hMin, hMax)},${getRandomInt(
            sMin,
            sMax
          )}%,${lightness}%,1)`
        );
      }

      return colors;
    }

    let happyExpressionColors = [];
    let sadExpressionColors = [];
    let angryExpressionColors = [];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const draw = (ctx) => {
      ctx.fillStyle = generateHslaColors(1, 360, 600, 600, 32, 80, 1); //These settings are for angry color pallete
      //   ctx.fillStyle = generateHslaColors(1, 360, 100, 120, 10, 40, 1);
      //   ctx.fillStyle = generateHslaColors(1, 360, 10, 50, 50, 90, 1);

      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;

      const width = 50;
      const height = 30;

      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fill();
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const spawnRectangles = () => {
      draw(context);
      setTimeout(spawnRectangles, 1000);
    };

    spawnRectangles();

    return () => {
      clearTimeout(spawnRectangles);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
