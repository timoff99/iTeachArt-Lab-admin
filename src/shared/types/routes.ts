export enum ApiUrl {
  dev = "http://localhost:5000",
}

export enum ApiRoutes {
  login = "auth/login",
  addImage = "image/create",

  getAllCookbookCollection = "cookbook-collection/get-all",
  getOneCookbookCollection = "cookbook-collection/get",
  createCookbookCollection = "cookbook-collection/create",
  deleteCookbookCollection = "cookbook-collection/delete-collection",
  deleteCookbookCollectionFiled = "cookbook-collection/delete-collection-filed",

  getAllRecipeCollection = "recipe-collection/get-all",
  getOneRecipeCollection = "recipe-collection/get",
  createRecipeCollection = "recipe-collection/create",
  deleteRecipeCollection = "recipe-collection/delete-collection",
  deleteRecipeCollectionFiled = "recipe-collection/delete-collection-filed",

  getAllUsers = "user/get-all-users",
  getUser = "user/get-user",
  updateUserStatus = "user/update-user-status",
  updateUser = "user/update-user",
  getUserStatistics = "user/get-user-statistics",
  deleteUser = "user/delete",

  getAllCookBooks = "cookbook/get-all",
  getCookbook = "cookbook/get",
  getCookbookStatistics = "cookbook/get-cookbook-statistics",
  getAllSortedCookbooks = "cookbook/get-all-sorted-cookbooks",
  deleteCookbook = "cookbook/delete",
  deleteCookbookComment = "cookbook-comments/delete",
  deleteCookbookCommentsId = "cookbook/delete-comments-id",

  getAllRecipes = "recipe/get-all",
  getRecipe = "recipe/get",
  getRecipeStatistics = "recipe/get-recipe-statistics",
  getAllSortedRecipes = "recipe/get-all-sorted-recipes",
  deleteRecipe = "recipe/delete",
  deleteRecipeComment = "recipe-comments/delete",
  deleteRecipesCommentsId = "recipe/delete-comments-id",
}

export enum CookiesType {
  token = "token",
}
