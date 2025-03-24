// type MyPropsType = {
//   text?: string; // ?をつけることでこpropsを任意値にする
// };

// export default function MyProps({ text = "propsの初期値" }: MyPropsType) {
//   return (
//     <div>
//       <p>{text}</p>
//     </div>
//   );
// }

type MyPropsType = {
  text?: string;
  id: number;
};

export default function MyProps({ text = "propsの初期値", id }: MyPropsType) {
  return (
    <div>
      <p>
        {text}
        {id}
      </p>
    </div>
  );
}
