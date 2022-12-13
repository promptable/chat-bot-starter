import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

export const AutoSaveInput = (props: {
  placeHolder?: string;
  onSubmit: (value: any) => void;
  onCancel: () => void;
  defaultValue?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<{ name: string }> = (
    data: { name: string },
    event?: React.BaseSyntheticEvent
  ) => {
    console.log("onsub");
    if (data.name.length) {
      props.onSubmit(data.name);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-2 pb-1">
      <input
        type="text"
        className="daisy-input-bordered daisy-input daisy-input-sm w-full max-w-xs"
        {...register("name")}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            props.onCancel();
          }
        }}
        placeholder={props.placeHolder}
        defaultValue={props.defaultValue || ""}
        autoFocus
        onBlur={() => {
          handleSubmit(onSubmit)();
        }}
      />
    </form>
  );
};
