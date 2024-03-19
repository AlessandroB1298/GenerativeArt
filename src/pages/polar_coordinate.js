import React, { useEffect } from "react";
import p5 from "p5";

const Polar = () => {
  let phase = 0;
  let zoff = 0;
  let slider;

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.angleMode(p.DEGREES);
    };

    p.draw = () => {
      p.background(250);
      var x = p.width / 2;
      var y = p.height / 2;
      p.stroke(0);
      p.strokeWeight(8);
      p.point(x, y);

      var angle = p.map(p.mouseX, 0, p.width, -90, 90);
      var r = 100;

      var dx = r * p.cos(angle);
      var dy = r * p.sin(angle);

      p.point(x + dx, y + dy);
      p.line(x, y, x + dx, y + dy);
    };
  };

  useEffect(() => {
    new p5(sketch);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Polar</h1>
    </div>
  );
};

export default Polar;
