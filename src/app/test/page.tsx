import LayoutTest from "@/app/components/layouts/LayoutTest";
import Greeting from "@/app/components/test/greeting/Greeting";
import For from "@/app/components/test/for/For";
import MyLink from "@/app/components/test/links/MyLink";
export default function TestPage() {
  return (
    <LayoutTest>
      <div>
        <Greeting message="Hello" initialCount={0} />
        <For />
        <MyLink />
      </div>
    </LayoutTest>
  );
}
