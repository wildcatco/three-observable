import * as THREE from "three";
import { makeAutoObservable, makeObservable, observable } from "mobx";

export function makeObjectObservableDeeply(object: THREE.Object3D) {
  object.traverse((o) => {
    makeObjectObservable(o);
  });
}

type Writable<T> = { -readonly [P in keyof T]: T[P] };

export function makeObjectObservable(object: Writable<THREE.Object3D>) {
  Object.defineProperty(object, "position", {
    writable: true,
    configurable: true,
  });
  Object.defineProperty(object, "rotation", {
    writable: true,
    configurable: true,
  });
  Object.defineProperty(object, "scale", {
    writable: true,
    configurable: true,
  });
  Object.defineProperty(object, "quaternion", {
    writable: true,
    configurable: true,
  });

  object.position = makeAutoObservable(object.position);
  object.rotation = makeAutoObservable(object.rotation);
  object.scale = makeAutoObservable(object.scale);
  object.quaternion = makeAutoObservable(object.quaternion);

  makeObservable(object, {
    name: observable,
    children: observable,
    position: observable,
    rotation: observable,
    scale: observable,
    quaternion: observable,
    userData: observable,
  });
}
