/*
Profilerを使って、コンポーネントの描画にかかった時間を計測する
*/

"use client";

import { Profiler } from "react";
import MyProfiler from "@/app/components/profiler/MyProfiler";

function onRenderCallback(id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, endTime: number) {
  console.log("id:", id);
  console.log("phase:", phase);
  console.log("actualDuration:", actualDuration);
  console.log("baseDuration:", baseDuration);
  console.log("startTime:", startTime);
  console.log("endTime:", endTime);
}

export default function Parent() {
  return (
    <div>
      <Profiler id="MyProfilerProfiler" onRender={onRenderCallback}>
        <MyProfiler />
      </Profiler>
    </div>
  );
}
