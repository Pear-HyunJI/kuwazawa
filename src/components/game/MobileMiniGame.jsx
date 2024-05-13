import React, { useEffect, useRef, useState } from "react";
import Matter, { Collision } from "matter-js";
import { Snack } from "@/components/game/Snack";
import styled from "styled-components";

const MiniGameBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const MiniGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      engine,
      canvas,
      options: {
        wireframes: false,
        background: "#fcecdc",
        width: 390,
        height: 520,
      },
    });
    const world = engine.world;

    // 캔버스 크기에 맞게 벽과 선 생성
    const leftWall = Matter.Bodies.rectangle(5, 260, 15, 520, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const rightWall = Matter.Bodies.rectangle(385, 260, 15, 520, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const ground = Matter.Bodies.rectangle(200, 520, 460, 30, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const topLine = Matter.Bodies.rectangle(250, 110, 500, 2, {
      name: "topLine",
      isStatic: true,
      render: { fillStyle: "#6e543a" },
      isSensor: true,
    });

    Matter.World.add(world, [leftWall, rightWall, ground, topLine]);

    Matter.Render.run(render);
    Matter.Runner.run(engine);

    let currentBody = null;
    let currentSnack = null;
    let disableAction = false;

    const addSnack = async () => {
      const index = Math.floor(Math.random() * 5);
      const snack = Snack[index];

      const body = Matter.Bodies.circle(195, 55, snack.radius, {
        index: index,
        isSleeping: true,
        render: {
          sprite: {
            texture: `/assets/image/game/${snack.name}.png`,
          },
        },
        restitution: 0.4,
      });

      currentBody = body;
      currentSnack = snack;

      Matter.World.add(world, body);
    };

    window.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      // 현재 스낵이 있는 경우에만 동작하도록
      if (currentBody) {
        // 터치한 X 좌표를 현재 스낵의 X 좌표로 설정
        Matter.Body.setPosition(currentBody, {
          x: x,
          y: currentBody.position.y,
        });

        // 현재 스낵의 이즈슬리핑 펄스 설정
        currentBody.isSleeping = false;
        disableAction = true;

        setTimeout(() => {
          addSnack();
          disableAction = false;
        }, 1000);
      }
    });

    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((collision) => {
        const { bodyA, bodyB } = collision;
        if (bodyA.index === bodyB.index) {
          const index = collision.bodyA.index;

          if (index === 8) {
            alert("You win!");
            return;
          }

          Matter.Composite.remove(world, [bodyA, bodyB]);

          const newSnack = Snack[index + 1];

          const newBody = Matter.Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newSnack.radius,
            {
              render: {
                sprite: { texture: `/assets/image/game/${newSnack.name}.png` },
              },
              index: index + 1,
            }
          );

          Matter.World.add(world, newBody);
        }

        if (
          !disableAction &&
          (collision.bodyA.name === "topLine" ||
            collision.bodyB.name === "topLine")
        ) {
          alert("Game over");
        }
      });
    });

    addSnack();

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(engine);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <MiniGameBlock>
      <canvas
        ref={canvasRef}
        width={500}
        height={680}
        style={{ background: "#fcecdc" }}
      ></canvas>
    </MiniGameBlock>
  );
};

export default MiniGame;
