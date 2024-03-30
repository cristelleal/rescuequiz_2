export type ButtonType = {
  buttonText: string;
  handleClick?: any;
};

export type FormType = {
  handleFormSubmit: (email: string, password: string) => any;
  setFormErrorMessage: any;
  buttonText: string;
};

export type InputType = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
};

export type SignUpType = {
  browserSession: () => unknown;
  handleSignUp: () => unknown;
};

export type quizzType = {
  quizzData: {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    answer: number;
    advice: string;
  }[];
  title: string;
};
