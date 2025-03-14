import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import Effect from "@/app/components/ng-ok/effect/Effect";

// <head>の中に代入したい値を設定
export const metadata = {
  title: "Test4",
  description: "Test4",
};

export default function TestPage() {
  return (
    <LayoutTest2>
      <Effect />
    </LayoutTest2>
  );
}
