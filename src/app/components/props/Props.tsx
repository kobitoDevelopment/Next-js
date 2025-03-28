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
