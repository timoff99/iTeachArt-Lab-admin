export enum ApiUrl {
  dev = "http://localhost:5000/api",
}

export enum ApiRoutes {
  login = "auth/login",
  addImage = "image/create",
  getAllCookbookCollection = "cookbook-collection/get-all",
  getOneCookbookCollection = "cookbook-collection/get",
  createCookbookCollection = "cookbook-collection/create",
  deleteCookbookCollection = "cookbook-collection/delete-collection",
  deleteCookbookCollectionFiled = "cookbook-collection/delete-collection-filed",
  getAllUsers = "user/get-all-users",
  getUser = "user/get-user",
  updateUserStatus = "user/update-user-status",
  updateUser = "user/update-user",
  getAllCookBooks = "cookbook/get-all",
  getAllRecipes = "recipe/get-all",
  getCookbook = "cookbook/get",
  getRecipe = "recipe/get",
  getCookbookStatistics = "cookbook/get-cookbook-statistics",
  getRecipeStatistics = "recipe/get-recipe-statistics",
  getUserStatistics = "user/get-user-statistics",
  getAllSortedCookbooks = "cookbook/get-all-sorted-cookbooks",
  getAllSortedRecipes = "recipe/get-all-sorted-recipes",
  deleteCookbook = "cookbook/delete",
  deleteRecipe = "recipe/delete",
  deleteUser = "user/delete",
  deleteCookbookComment = "cookbook-comments/delete",
  deleteRecipeComment = "recipe-comments/delete",
  deleteCookbookCommentsId = "cookbook/delete-comments-id",
  deleteRecipesCommentsId = "recipe/delete-comments-id",
}

export enum CookiesType {
  token = "token",
}
