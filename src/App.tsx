import * as THREE from "three";
import CubeInformation from "./CubeInformation.tsx";
import { Canvas } from "@react-three/fiber";
import { makeObjectObservableDeeply } from "./makeObjectObservable.ts";
import { TransformControls } from "@react-three/drei";
import { useState } from "react";

const App = () => {
  const [scene, setScene] = useState<THREE.Scene>();
  const [cube, setCube] = useState<THREE.Object3D>();
  const [gizmoMode, setGizmoMode] = useState<"translate" | "rotate" | "scale">(
    "translate",
  );
  const [enteredCubeName, setEnteredCubeName] = useState<string>("");

  const downloadJSON = () => {
    if (!scene) return;
    const json = JSON.parse(JSON.stringify(scene.toJSON()));

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "scene.json";
    a.click();
  };

  return (
    <div>
      <div className={"h-[500px] bg-gray-600"}>
        <Canvas
          onCreated={({ scene }) => {
            const cube = new THREE.Mesh(
              new THREE.BoxGeometry(),
              new THREE.MeshBasicMaterial(),
            );
            cube.name = "큐브";
            cube.userData.greeting = "hi";
            makeObjectObservableDeeply(cube);
            setCube(cube);
            setScene(scene);

            scene.add(cube);
          }}
          camera={{
            position: [0, 3, 3],
          }}
        >
          <ambientLight />
          {cube && <TransformControls mode={gizmoMode} object={cube} />}
          <gridHelper />
        </Canvas>
        <div className={"fixed top-10 left-10 flex flex-col gap-2"}>
          <button
            onClick={() => setGizmoMode("translate")}
            className={"rounded border-gray-500 border w-28"}
          >
            translation
          </button>
          <button
            onClick={() => setGizmoMode("rotate")}
            className={"rounded border-gray-500 border w-28"}
          >
            rotation
          </button>
          <button
            onClick={() => setGizmoMode("scale")}
            className={"rounded border-gray-500 border w-28"}
          >
            scale
          </button>
          <div className={"flex gap-4"}>
            <input
              onChange={(e) => {
                setEnteredCubeName(e.target.value);
              }}
              className={"w-28"}
            />
            <button
              onClick={() => {
                if (cube) {
                  cube.name = enteredCubeName;
                }
              }}
              className={"rounded border-gray-500 border w-28"}
            >
              이름 변경
            </button>
          </div>
          <div className={"flex gap-4"}>
            <p>userData.greeting</p>
            <select
              onChange={(e) => {
                if (cube) {
                  cube.userData.greeting = e.target.value;
                }
              }}
              defaultValue={"hi"}
            >
              <option value="hi">hi</option>
              <option value="bye">bye</option>
            </select>
          </div>
          <button
            onClick={downloadJSON}
            className={"rounded border-gray-500 border"}
          >
            download JSON
          </button>
        </div>
      </div>

      {cube && <CubeInformation cube={cube} />}
    </div>
  );
};

export default App;
