import Breadcrumb from '@/components/Breadcrumb';
import { IMAGE_URL, PATH } from '@/config/path';
import { useAppSelector } from '@/hooks/useRedux';
import { selectCartItems, selectCartTotalAmount } from '@/store/cart/cartSlice';
import { ICartItem } from '@/types/cart.type';
import { formatCurrency } from '@/utils/common';
import { Link } from 'react-router-dom';
import { OrderStyle } from './Order.styled';

const Order = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);

  return (
    <OrderStyle>
      <Breadcrumb />
      <div className="cart">
        <div className="container-ct">
          <div className="cart__head">
            <div className="cart__head-0"></div>
            <div className="cart__head-1">Sản phẩm</div>
            <div className="cart__head-2">Số lượng</div>
            <div className="cart__head-3">Tổng tiền</div>
            <div className="cart__head-4">Xoá</div>
          </div>
          <div className="cart__list">
            {cartItems.map((item: ICartItem) => (
              <div className="clitem" key={item.id}>
                <div className="clitem__space"></div>
                <div className="clitem__infor">
                  <div className="clitem__infor-img">
                    <a href="/">
                      <img
                        src={`${IMAGE_URL}/${item.id}/${item.thumbnail}`}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="clitem__infor-title">
                    <a href="/">{item.title}</a>
                    <p>
                      <span>Giá: </span>
                      {item.price}$
                    </p>
                  </div>
                </div>
                <div className="clitem__number">
                  <div className="number-count">
                    <span className="num-decrease">
                      <i className="fas fa-minus"></i>
                    </span>
                    <input type="number" value={item.quantity} />
                    <span className="num-increase">
                      <i className="fas fa-plus"></i>
                    </span>
                  </div>
                  <div className="number-remove">
                    <a href="/">Xoá</a>
                  </div>
                </div>
                <div className="clitem__price">
                  {formatCurrency(
                    (item.price * item.quantity * item.discount) / 100
                  )}
                  $
                </div>
                <div className="clitem__remove">
                  <a href="/">
                    <i className="fas fa-times"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="total">
        <div className="container-ct">
          <div className="total-wrap1"></div>
          <div className="total-wrap">
            <div className="total__money">
              Tổng tiền <span>{cartTotalAmount}$</span>
            </div>
            <div className="total__btn">
              <Link to={PATH.products}>Tiếp tục mua hàng</Link>
              <Link to={PATH.payment}>Tiến hành thanh toán</Link>
            </div>
          </div>
        </div>
      </div>
    </OrderStyle>
  );
};

export default Order;