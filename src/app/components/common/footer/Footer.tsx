/* Nuxtでいう所の名前付きslot的なことをしたい場合はpropsで行う */
type FooterProps = {
  children: {
    logo: React.ReactNode;
    copyright?: React.ReactNode; // ?をつけるとpropsを任意値にできる(省略可能になる)
  };
};

export default function Footer({
  children = { logo: null, copyright: "© 2025 All rights reserved" }, // propsにデフォルト値を指定する場合の作法
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="logo">{children.logo}</div>
      <div className="copyright">{children.copyright || "© 2025 All rights reserved"}</div>
    </footer>
  );
}
