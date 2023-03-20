export type Config = {
  token: string;
  tagPrefix: string;
};

export const defaultConfig = {
  tagPrefix: "🚩 ",
} satisfies Partial<Config>;
