import MyAccordion from "@/app/components/accordion/MyAccordion";

export default function Accordion() {
  return <MyAccordion buttonName="accordion-button-1" panelName="accordion-panel-1" title={<span>アコーディオンのタイトル</span>} icon={<span>▼</span>} content={<p>ここにアコーディオンの内容が入ります。</p>} />;
}
