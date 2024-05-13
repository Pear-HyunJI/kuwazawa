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
        width: 500,
        height: 680,
      },
    });
    const world = engine.world;

    // 캔버스 크기에 맞게 벽과 선 생성
    const leftWall = Matter.Bodies.rectangle(10, 340, 30, 680, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const rightWall = Matter.Bodies.rectangle(490, 340, 30, 680, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const ground = Matter.Bodies.rectangle(250, 670, 500, 30, {
      isStatic: true,
      render: { fillStyle: "#6e543a" },
    });

    const topLine = Matter.Bodies.rectangle(250, 145, 500, 1, {
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
      const index = Math.floor(Math.random() * 6);
      const snack = Snack[index];

      const body = Matter.Bodies.circle(250, 68, snack.radius, {
        index: index,
        isSleeping: true,
        render: {
          sprite: {
            texture: `/assets/image/game/${snack.name}.png`,
          },
        },
        restitution: 0.2,
      });

      currentBody = body;
      currentSnack = snack;

      Matter.World.add(world, body);
    };

    window.onkeydown = (event) => {
      switch (event.code) {
        case "KeyA":
          if (currentBody.position.x - currentSnack.radius > 30)
            Matter.Body.setPosition(currentBody, {
              x: currentBody.position.x - 10,
              y: currentBody.position.y,
            });
          break;
        case "KeyD":
          if (currentBody.position.x + currentSnack.radius < 470)
            Matter.Body.setPosition(currentBody, {
              x: currentBody.position.x + 10,
              y: currentBody.position.y,
            });
          break;
        case "KeyS":
          currentBody.isSleeping = false;
          disableAction = true;

          setTimeout(() => {
            addSnack();
            disableAction = false;
          }, 1000);
          break;
      }
    };

    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((collision) => {
        const { bodyA, bodyB } = collision;
        if (bodyA.index === bodyB.index) {
          const index = collision.bodyA.index;

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

          if (index === 9) {
            alert("You win!");
            return;
          }
        }

        if (
          !disableAction &&
          (collision.bodyA.name === "topLine" ||
            collision.bodyB.name === "topLine")
        ) {
          alert("Game over");
          currentBody = null;
          currentSnack = null;
          disableAction = false;
          Matter.Composite.allBodies(world).forEach((body) => {
            if (body.label === "Circle Body") {
              Matter.World.remove(world, body);
            }
          });
          addSnack();
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
