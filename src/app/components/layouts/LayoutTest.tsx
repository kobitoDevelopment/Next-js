/* 使用するコンポーネントをimport */
import Header from "@/app/components/common/header/Header";
import Footer from "@/app/components/common/footer/Footer";

/* export default function コンポーネント名({ children }: { children: React.ReactNode })で、
 *   children(slot)を受け取り、HeaderとFooterを表示するコンポーネントを定義
 */
export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <Header />
      <main className="main">
        {/* children = Nuxtでいう所のslot */}
        {children}
      </main>
      <Footer>
        {{
          logo: <div>Logo</div>,
        }}
      </Footer>
    </div>
  );
}
