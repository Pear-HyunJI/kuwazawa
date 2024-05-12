import React, { useEffect, useRef, useState } from "react";
import Matter, { Collision } from "matter-js";
import { Snack } from "@/components/game/Snack";

const MiniGame = () => {
  const canvasRef = useRef(null);
  // const [snackImage, setSnackImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      engine,
      canvas,
      options: {
        wireframes: false,
        background: "#F7F4C8",
        width: 620,
        height: 850,
      },
    });
    const world = engine.world;

    const leftWall = Matter.Bodies.rectangle(15, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const rightWall = Matter.Bodies.rectangle(605, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const ground = Matter.Bodies.rectangle(310, 820, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });

    const topLine = Matter.Bodies.rectangle(310, 150, 620, 2, {
      name: "topLine",
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      isSensor: true,
    });

    Matter.World.add(world, [leftWall, rightWall, ground, topLine]);

    Matter.Render.run(render);
    Matter.Runner.run(engine);

    // const loadImage = (src) => {
    //   return new Promise((resolve, reject) => {
    //     const img = new Image();
    //     img.onload = () => resolve(img);
    //     img.onerror = reject;
    //     img.src = src;
    //   });
    // };

    let currentBody = null;
    let currentSnack = null;
    let disableAction = false;

    const addSnack = async () => {
      const index = Math.floor(Math.floor(Math.random() * 5));
      const snack = Snack[index];
      // const imagePath = `/assets/image/game/${snack.name}.png`;

      // const img = loadImage(imagePath);
      // setSnackImage(img);

      const body = Matter.Bodies.circle(300, 50, snack.radius, {
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

      //    Matter.Events.on(render, "afterRender", () => {
      //   Matter.World.add(world, body);
      // });

      Matter.World.add(world, body);
    };

    window.onkeydown = (event) => {
      switch (event.code) {
        case "KeyA":
          if (currentBody.position.x - currentSnack.radius > 30)
            //왼쪽벽 넘어가지 못하게
            Matter.Body.setPosition(currentBody, {
              x: currentBody.position.x - 10,
              y: currentBody.position.y,
            });
          break;
        case "KeyD":
          if (currentBody.position.x + currentSnack.radius < 590)
            // 오른쪽벽 넘어가지 못하게
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

          if (index === 9) {
            // 승리
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

        //패배
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
    <canvas
      ref={canvasRef}
      width={620}
      height={850}
      style={{ background: "#F7F4C8" }}
    ></canvas>
  );
};

export default MiniGame;
