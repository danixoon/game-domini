type SvgrComponent = React.FC<React.SVGAttributes<SVGElement>>;

declare module "*.svg" {
  const content: string;
  export const ReactComponent: SvgrComponent;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare type WithRandomId = {
  randomId?: string;
};

declare type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType[number];

declare type OverrideProps<F, T> = Omit<F, keyof T> & T;

declare type WithHookOnChange = {
  onChange: (e: {
    target: { name: string; type?: string; value: any };
  }) => void;
};

declare type QueryError = {
  message: string;
  code: number;
};

declare type QueryHook<T> = [
  T,
  { isFetching: boolean; error: null | QueryError[] }
];
