export interface tableData {
  _id: string;
  title: string;
  author: string;
  views: string;
  likes: string[];
  comments: string[];
  image: string;
  user_id: {
    username: string;
    image: string;
  };
}
