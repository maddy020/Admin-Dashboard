interface Iprops {
  type: string;
  placevalue: string;
  value?: string;
  vref: any;
}

export default function Input(props: Iprops) {
  return (
    <>
      <textarea
        defaultValue={props.value}
        placeholder={props.placevalue}
        className="w-full rounded-lg border-2 border-slate-300 p-2 text-black focus:border-blue-700 focus:outline-none "
        required
        ref={props.vref}
      />
    </>
  );
}
