export type Issue = {
  id: number;
  title: string;
  tracking: Array<number>;
  trackedBy: number | "not-tracked" | "unknown";
};
