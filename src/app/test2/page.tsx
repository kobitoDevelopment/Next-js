import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import MyLink from "@/app/components/test2/links/MyLink";
import LifeCycle from "@/app/components/test2/lifecycle/LifeCycle";
import MyLoading from "@/app/components/test/loading/MyLoading";

// <head>の中に代入したい値を設定
export const metadata = {
  title: "Test2",
  description: "Test2",
};

export default function TestPage() {
  return (
    <LayoutTest2>
      <div>
        <MyLoading />
        <MyLink />
        <LifeCycle />
      </div>
    </LayoutTest2>
  );
}
