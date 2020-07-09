interface data {
  ticker: string;
  address: string;
  link: string;
  balance: string;
}

export enum tokens {
  ginandjuice,
  jolene,
  sonnet,
}

export type tokenDataObj = {
  [token: number]: data;
};

export type dataTableProps = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  tokenBalance: string[];
};

export type metamaskProps = {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setConnection: React.Dispatch<React.SetStateAction<boolean>>;
};
