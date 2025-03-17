import Image from "next/image";

const data = {
  name: "なまえ",
  imageUrl: "/next.svg",
  classes: ["class1", "class2"],
  imageWidth: 200,
  imageHeight: 200,
};

export default function TestPage() {
  return (
    <div>
      <Image src={data.imageUrl} alt={data.name} width={data.imageWidth} height={data.imageHeight} quality={75} className={["base", ...data.classes].join(" ")} />
    </div>
  );
}
