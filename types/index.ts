interface IPost {
  _id: string;
  title: string;
  desc: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
  categories?: [{ name: string }];
  _v: number;
}

interface ICat {
  _id: string;
  name: string;
}

export type { IPost, ICat };
