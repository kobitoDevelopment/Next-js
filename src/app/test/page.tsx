import LayoutTest from "@/app/components/layouts/LayoutTest";
import Greeting from "@/app/components/test/greeting/Greeting";
import For from "@/app/components/test/for/For";
export default function TestPage() {
  return (
    <LayoutTest>
      <div>
        <Greeting message="Hello" initialCount={0} />
        <For />
      </div>
    </LayoutTest>
  );
}
