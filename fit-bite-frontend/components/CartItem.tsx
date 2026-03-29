export default function CartItem({ item, updateQuantity, removeFromCart }: any) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
      <div className="flex-1 font-bold">{item.name}</div>
      <div className="flex gap-2">
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </div>
      <div>₹{item.price * item.quantity}</div>
      <button onClick={() => removeFromCart(item._id)} className="text-red-500">Remove</button>
    </div>
  );
}