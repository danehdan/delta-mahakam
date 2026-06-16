"use client";

import React, { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeCanvas = canvas;
    const gl = (activeCanvas.getContext("webgl") || activeCanvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const activeGl = gl;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Create a deep navy gradient base
        vec3 color1 = vec3(0.02, 0.04, 0.1); // Deep Navy
        vec3 color2 = vec3(0.05, 0.08, 0.2); // Mid Navy
        vec3 gold = vec3(0.83, 0.69, 0.22); // Gold
        
        // Moving "energy streaks"
        float streaks = 0.0;
        streaks += sin(uv.x * 10.0 + u_time * 0.5) * 0.5 + 0.5;
        streaks *= cos(uv.y * 5.0 - u_time * 0.3) * 0.5 + 0.5;
        
        // Add noise-like gold flickers
        float goldFlicker = pow(abs(sin(uv.x * 20.0 + uv.y * 20.0 + u_time)), 50.0) * 0.5;
        
        vec3 finalColor = mix(color1, color2, uv.y);
        finalColor += gold * streaks * 0.05; // Subtle streaks
        finalColor += gold * goldFlicker * 0.1; // Golden highlights
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(ctx: WebGLRenderingContext, type: number, src: string) {
      const s = ctx.createShader(type);
      if (!s) return null;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      return s;
    }

    // Check compilation status
    const vertexShader = compileShader(activeGl, activeGl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(activeGl, activeGl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = activeGl.createProgram();
    if (!prog) return;
    activeGl.attachShader(prog, vertexShader);
    activeGl.attachShader(prog, fragmentShader);
    activeGl.linkProgram(prog);
    activeGl.useProgram(prog);

    const buf = activeGl.createBuffer();
    activeGl.bindBuffer(activeGl.ARRAY_BUFFER, buf);
    activeGl.bufferData(activeGl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), activeGl.STATIC_DRAW);

    const pos = activeGl.getAttribLocation(prog, "a_position");
    activeGl.enableVertexAttribArray(pos);
    activeGl.vertexAttribPointer(pos, 2, activeGl.FLOAT, false, 0, 0);

    const uTime = activeGl.getUniformLocation(prog, "u_time");
    const uRes = activeGl.getUniformLocation(prog, "u_resolution");

    let animationFrameId: number;

    const syncSize = () => {
      const w = activeCanvas.clientWidth || 1280;
      const h = activeCanvas.clientHeight || 720;
      if (activeCanvas.width !== w || activeCanvas.height !== h) {
        activeCanvas.width = w;
        activeCanvas.height = h;
        activeGl.viewport(0, 0, w, h);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
    });
    resizeObserver.observe(activeCanvas);
    syncSize();

    function render(t: number) {
      activeGl.viewport(0, 0, activeCanvas.width, activeCanvas.height);
      if (uTime) activeGl.uniform1f(uTime, t * 0.001);
      if (uRes) activeGl.uniform2f(uRes, activeCanvas.width, activeCanvas.height);
      activeGl.drawArrays(activeGl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
    />
  );
}
