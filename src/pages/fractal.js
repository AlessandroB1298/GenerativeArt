import React, { useRef, useEffect, useState } from "react";

const Fractal = () => {
  const canvasRef = useRef();
  const [numParticles, setNumParticles] = useState(1);
  const [size, setSize] = useState(15);
  const [life, setLife] = useState({ min: 5, max: 200 });
  const [base, setBase] = useState(3);
  const [colorRandomness, setColorRandomness] = useState(100);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");

    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);
    let rid = null; // request animation id
    ctx.fillStyle = "rgb(252, 250, 249)";

    function getRandomColor() {
      const randomR = Math.floor(Math.random() * 1000);
      const randomG = Math.floor(Math.random() * 1000);
      const randomB = Math.floor(Math.random() * 100);
      return `rgb(${randomR}, ${randomG}, ${randomB})`;
    }

    class Particle {
      constructor() {
        this.pos = { x: Math.random() * cw, y: Math.random() * ch };
        this.vel = { x: 0, y: 0 };
        this.base = (1 + Math.random()) * base;
        this.life = randomIntFromInterval(life.min, life.max);
        this.color = getRandomColor();
        this.history = [];
      }

      update() {
        this.history.push({ x: this.pos.x, y: this.pos.y });
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
      }

      show() {
        this.life--;
        ctx.beginPath();
        let last = this.history.length - 1;
        ctx.moveTo(this.history[last].x, this.history[last].y);
        for (let i = last; i > 0; i--) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }

        ctx.strokeStyle = this.useAlternateColor
          ? this.alternateColor
          : this.color;
        ctx.stroke();

        if (this.history.length > this.life) this.history.splice(0, 1);
      }

      edges() {
        if (
          this.pos.x > cw ||
          this.pos.x < 0 ||
          this.pos.y > ch ||
          this.pos.y < 0
        ) {
          this.pos.y = Math.random() * ch;
          this.pos.x = Math.random() * cw;
          this.history.length = 0;
        }
        if (this.life <= 0) {
          this.pos.y = Math.random() * ch;
          this.pos.x = Math.random() * cw;
          this.life = randomIntFromInterval(life.min, life.max);
          this.history.length = 0;
        }
      }

      follow() {
        let x = Math.floor(this.pos.x / size);
        let y = Math.floor(this.pos.y / size);
        let index = x + y * cols;

        let angle = flowField[index];

        this.vel.x = this.base * Math.cos(angle + 5); //-1
        this.vel.y = this.base * Math.sin(angle - 5); //+13
      }
    }

    let particles = [];

    let rows = Math.floor(ch / size) + 2;
    let cols = Math.floor(cw / size) + 2;

    let flowField = [];

    function getFlowField(rows, cols) {
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x < cols; x++) {
          let index = x + y * cols;
          let a = getAngle(x * size, y * size);

          flowField[index] = a;
        }
      }
    }

    function getAngle(x, y) {
      return ((Math.cos(x * 0.01) + Math.cos(y * 0.01)) * Math.PI) / 2;
    }

    getFlowField(rows, cols);

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function frame() {
      rid = requestAnimationFrame(frame);

      ctx.fillRect(0, 0, cw, ch);

      particles.forEach((p) => {
        p.follow();
        p.update();
        p.show();
        p.edges();
      });
    }

    function Init() {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;

      ctx.fillStyle = "#f0f0f0";

      rows = Math.floor(ch / size) + 2;
      cols = Math.floor(cw / size) + 2;

      flowField = new Array(rows * cols);
      getFlowField(rows, cols);

      if (rid) {
        window.cancelAnimationFrame(rid);
        rid = null;
      }
      frame();
    }

    function randomIntFromInterval(mn, mx) {
      return Math.floor(Math.random() * (mx - mn + 1) + mn);
    }

    Init();
    window.addEventListener("resize", Init, false);

    return () => {
      window.removeEventListener("resize", Init, false);
    };
  }, [numParticles, size, life.min, life.max, base, colorRandomness]);

  return (
    <div>
      <h1>Gum Drop</h1>
      <h2>Click, don't drag, still buggy</h2>

      <div>
        <label htmlFor="numParticles">Number of Particles:</label>
        <input
          type="range"
          defaultValue={0}
          id="numParticles"
          name="numParticles"
          min="0"
          max="5000"
          value={numParticles}
          onChange={(e) => setNumParticles(parseInt(e.target.value))}
        />
        <span>{numParticles}</span>
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="range"
          id="size"
          name="size"
          min="5"
          max="50"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        />
        <span>{size}</span>
      </div>
      <div>
        <label htmlFor="life">Life:</label>
        <input
          type="range"
          id="life"
          name="life"
          min="5"
          max="200"
          value={life.min}
          onChange={(e) => setLife({ ...life, min: parseInt(e.target.value) })}
        />
        <span>{life.min}</span>
      </div>
      <div>
        <label htmlFor="base">Speed:</label>
        <input
          type="range"
          id="base"
          name="base"
          min="1"
          max="10"
          value={base}
          onChange={(e) => setBase(parseInt(e.target.value))}
        />
        <span>{base}</span>
      </div>
      <div></div>
      <canvas ref={canvasRef} className="cool_canvas"></canvas>
    </div>
  );
};

export default Fractal;
