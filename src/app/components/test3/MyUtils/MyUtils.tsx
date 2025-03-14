import { formatDate } from "@/app/utils/formatDate";
export default function MyImage() {
  const today = new Date();
  return (
    <div>
      <p>今日は: {formatDate(today)}</p>
    </div>
  );
}
