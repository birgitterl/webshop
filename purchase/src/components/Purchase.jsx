import React, {Suspense} from 'react';

const ProductDetail = React.lazy(() => import ("product/ProductDetail"));
const Cart = React.lazy(() => import("cart/Cart"));

const Purchase = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail/>
                <Cart/>
            </Suspense>
        </div>
    )
}

export default Purchase;