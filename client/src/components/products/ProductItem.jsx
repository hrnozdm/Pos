import React from 'react'

const ProductItem = ({product,index}) => {
  return (
    <div>
    <div className="product-item border rounded-md hover:shadow-lg cursor-pointer select-none transition-all" key={index}>
    <div className="product-img">
      <img
        src={product.img}
        alt=""
        className="h-28 object-cover w-full"
      />
    </div>

    <div className="product-info flex flex-col p-3">
      <span className="font-bold">{product.title}</span>
      <span>{product.price}₺</span>
    </div>
  </div>
    </div>
  
  )
}

export default ProductItem
