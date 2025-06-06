import LayoutTest from "@/app/components/layouts/LayoutTest";
import Greeting from "@/app/components/test/greeting/Greeting";
import For from "@/app/components/test/for/For";
import MyLink from "@/app/components/test/links/MyLink";
import MyLoading from "@/app/components/test/loading/MyLoading";

// <head>の中に代入したい値を設定
export const metadata = {
  title: "Test1",
  description: "Test1",
};

export default function TestPage() {
  return (
    <LayoutTest>
      <div>
        <MyLoading />
        <Greeting message="Hello" />
        <For />
        <MyLink />
      </div>
    </LayoutTest>
  );
}
