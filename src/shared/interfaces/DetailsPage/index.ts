export interface IRecipe {
  title: string;
  author: string;
  description: string;
  image: string;
  likes: string[];
  comments: string[];
  views: number;
}

export interface IUser {
  _id: string;
  username: string;
  image: string;
}

export interface IComment {
  _id: string;
  user_id: IUser;
  time: Date;
  message: string;
}

export interface ICommentProps {
  comments: IComment[];
  handleOpenMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: string, commentId: string) => void;
  anchorElOption: HTMLElement | null;
  openOption: boolean;
  userId: string;
  commentId: string;
  handleCloseMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleDeleteComment: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, _id: string) => void;
  handleBlockUser: (_id: string, user_status: string) => void;
}

export interface cookbookData {
  _id: string;
  title: string;
  description: string;
  author: string;
  views: number;
  likes: string[];
  recipes: IRecipe[];
  comments: IComment[];
  image: string;
  user_id: string;
  cloudinary_id: string;
}
export interface recipeData {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  author: string;
  views: number;
  likes: string[];
  recipes: IRecipe[];
  comments: IComment[];
  image: string;
  user_id: string;
  cookbook_id: string;
  cloudinary_id: string;
}
