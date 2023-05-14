export default function List() {
  const products = ['Tomatoes', 'Pasta', 'Coconut'];

  return (
    <div>
      <h4 className='title'>상품목록</h4>
      {products.map((product, index) => {
        return (
          <div className='food' key={`product-${index}`}>
            <img className='food-img' src={`/food${index}.png`} alt={product} />
            <h4>{product} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
