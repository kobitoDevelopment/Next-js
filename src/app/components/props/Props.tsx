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
};

export default function MyProps({ text = "propsの初期値" }: MyPropsType) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
