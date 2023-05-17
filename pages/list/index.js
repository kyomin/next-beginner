import { useState } from 'react';

export default function List() {
  const products = ['Tomatoes', 'Pasta', 'Coconut'];
  const [amounts, setAmounts] = useState({});

  return (
    <div>
      <h4 className='title'>상품목록</h4>
      {products.map((product, index) => {
        return (
          <div className='food' key={`product-${index}`}>
            <img className='food-img' src={`/food${index}.png`} alt={product} />
            <h4>{product} $40</h4>
            <span> {amounts[`product-${index}`] || 0} </span>
            <button
              onClick={() => {
                const temp = { ...amounts };
                const key = `product-${index}`;
                let amount = temp[key] || 0;
                amount += 1;
                temp[key] = amount;

                setAmounts(temp);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
