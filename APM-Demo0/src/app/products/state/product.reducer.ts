import { state } from "@angular/animations";
import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "../../state/app.state"
import * as ProductActions from "./product.actions"
import { ProductService } from "../product.service";

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: false,
    currentProductId: null,
    products: [],
    error: ''
}

//Serialization of consts matter 
// Ln28 => Selects the "product" feature from Store
// Ln26 => Selects the specified state from the product feature
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) =>
        currentProductId == 0 ?
            {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            } :
            currentProductId ?
                state.products.find(p => p.id === currentProductId) :
                null
);
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);
export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toogleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),

    on(ProductActions.setCurrentProduct, (state, actions): ProductState => {
        return {
            ...state,
            currentProductId: actions.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state) : ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.product,
            error: ''
        };
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState =>{
        return {
            ...state,
            products: [],
            error : action.error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(p => p.id == action.product.id? action.product: p)
        return {
            ...state,
            products : updatedProducts,
            error: ''
        }
    }),
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(ProductActions.deleteProductSuccess, (state, action) : ProductState =>{
        return {
            ...state,
            currentProductId: null,
            products : state.products.filter(p => p.id != action.productId),
            error: ''
        }
    }),

    on(ProductActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(ProductActions.createProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: [...state.products, action.product],
            currentProductId: action.product.id,
            error: ''
        }
    }), 

    on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);