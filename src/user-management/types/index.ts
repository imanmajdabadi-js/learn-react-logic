export interface UserType {
  name: string;
  id: string;
  email: string;
  isAdmin: boolean;
  isVip: boolean;
  note?: string;
}

export interface InputType {
  key: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
