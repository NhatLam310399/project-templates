export interface IInputContact {
  name?: string;
  email?: string;
  title?: string;
  description?: string;
}

export interface ICreateContact {
  contactInput: IInputContact;
}
