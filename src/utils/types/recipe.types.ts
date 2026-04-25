export type RecipeType = {
    id: number
    product: number
    productName?: string
    description: string
    ingredients: IngredientType[]
}

export type IngredientType = {
    product: number | null
    quantity: number | null
}

export type CreateRecipeType = Nullable<RecipeType>

type Nullable<T> = {
    [K in keyof T]: T[K] | null
}
