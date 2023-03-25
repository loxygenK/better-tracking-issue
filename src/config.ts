export type Config = {
  token: string;
  numberTagPrefix: string;
  titleTagPrefix: string;
  titleTagStrategy:
    | "fixed-lowest"
    | "fixed-highest"
    | "latest-lowest"
    | "latest-highest";
};

export const defaultConfig = {
  numberTagPrefix: "🚩 ",
  titleTagPrefix: "🚩 ",
  titleTagStrategy: "latest-lowest",
} satisfies Partial<Config>;
