import LayoutTest2 from "@/app/components/layouts/LayoutTest2";
import Memo from "@/app/components/ng-ok/memo/Memo";

// コンポーネントをimportせずにこのファイルで作る例
const Profile = function () {
  return (
    <div>
      <p>即席コンポーネント</p>
    </div>
  );
};

export default function TestPage() {
  return (
    <LayoutTest2>
      <Profile />
      {/* useEffectとuseMemoの違いを検証 + /ng-ok/ディレクトリにはuseEffectが無限ループを発生させてしまうサンプルあり */}
      <Memo />
    </LayoutTest2>
  );
}
