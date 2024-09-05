import * as THREE from "three";
import { observer } from "mobx-react-lite";

const CubeInformation = observer(({ cube }: { cube: THREE.Object3D }) => {
  return (
    <div className={"flex-col mt-10 border-2 w-[300px]"}>
      <h1 className={"text-2xl"}>큐브 정보</h1>
      <div>
        <span>Name:</span>
        <span className={"absolute left-[160px]"}>{cube.name}</span>
      </div>
      <div>
        <span>Position:</span>
        <span className={"absolute left-[160px]"}>
          ({cube.position.x.toFixed(1)}, {cube.position.y.toFixed(1)},{" "}
          {cube.position.z.toFixed(1)})
        </span>
      </div>
      <div>
        <span>Rotation:</span>
        <span className={"absolute left-[160px]"}>
          ({cube.rotation.x.toFixed(1)}, {cube.rotation.y.toFixed(1)},{" "}
          {cube.rotation.z.toFixed(1)})
        </span>
      </div>
      <div>
        <span>Scale:</span>
        <span className={"absolute left-[160px]"}>
          ({cube.scale.x.toFixed(1)}, {cube.scale.y.toFixed(1)},{" "}
          {cube.scale.z.toFixed(1)})
        </span>
      </div>
      <div>
        <span>userData.greeting:</span>
        <span className={"absolute left-[160px]"}>
          {cube.userData.greeting}
        </span>
      </div>
    </div>
  );
});

export default CubeInformation;
