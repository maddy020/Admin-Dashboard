interface Iprops {
  type: string;
  placevalue: string;
  value?: string;
  vref: any;
}

export default function Input(props: Iprops) {
  return (
    <>
      <input
        type={props.type}
        defaultValue={props.value}
        placeholder={props.placevalue}
        className="w-full rounded-full border p-2 text-black"
        required
        ref={props.vref}
      />
    </>
  );
}
