export default function Cart() {
  const products = ['Tomatoes', 'Pasta', 'Coconut'];

  return (
    <div>
      <h4 className='title'>장바구니</h4>
      {products.map((product, index) => {
        return (
          <CartItem key={`cart-${index}`} product={product} amount={index + 1} />
        );
      })}
    </div>
  );
}

function CartItem(props) {
  return (
    <div className='cart-item'>
      <p>{props.product}</p>
      <p>$40</p>
      <p>{props.amount}개</p>
    </div>
  );
}
