import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import MyImage from "@/app/components/test3/MyImage/MyImage";
import MyHook from "@/app/components/test3/MyHook/MyHook";
import MyUtils from "@/app/components/test3/MyUtils/MyUtils";

// <head>の中に代入したい値を設定
export const metadata = {
  title: "Test3",
  description: "Test3",
};

export default function TestPage() {
  return (
    <LayoutTest2>
      <div>
        <MyImage />
        <MyHook />
        <MyUtils />
      </div>
    </LayoutTest2>
  );
}
