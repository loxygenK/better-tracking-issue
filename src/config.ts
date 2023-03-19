export type Config = {
  token: string;
  tag: string;
};

export const defaultConfig = {
  tag: "[🚩 << id >>]: ",
} satisfies Partial<Config>;
