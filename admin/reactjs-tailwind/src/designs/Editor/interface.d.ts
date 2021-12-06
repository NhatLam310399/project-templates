export type IEditorProps = {
  initValue?: string;
  label?: string;
  className?: string;
  onChange: (text: string) => void;
  errorMessage?: string;
} & (
  | {
      required: true;
      errorMessage?: string;
    }
  | {
      required?: false;
      errorMessage?: string;
    }
);
