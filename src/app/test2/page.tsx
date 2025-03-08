import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import MyLink from "@/app/components/test2/links/MyLink";
import LifeCycle from "@/app/components/test2/lifecycle/LifeCycle";
export default function TestPage() {
  return (
    <LayoutTest2>
      <div>
        <MyLink />
        <LifeCycle />
      </div>
    </LayoutTest2>
  );
}
