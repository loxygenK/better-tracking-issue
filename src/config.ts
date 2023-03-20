export type Config = {
  token: string;
  prefix: string;
};

export const defaultConfig = {
  prefix: "🚩 ",
} satisfies Partial<Config>;
