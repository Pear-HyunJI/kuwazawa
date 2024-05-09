import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { fetchProducts } from "@/store/product";
import { useSelector, useDispatch } from "react-redux";
import { BsGiftFill, BsGift } from "react-icons/bs";
import { Link } from "react-router-dom";
import { kuwazawa_cartDB } from "@/assets/firebase";

const OnlineShopsectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UlBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-top: 50px;
`;

const ListBlock = styled.li`
  flex: 0 0 21%;
  margin: 20px 2%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  .photo {
    overflow: hidden;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    padding: 20px;

    p:first-child {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;

      a {
        color: #3d3115;
        text-decoration: none;

        &:hover {
          color: #5a4620;
        }
      }
    }

    p:last-child {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 10px;
    }

    button {
      background-color: #5a4620;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 8px 8px 8px 12px;
      font-size: 1.1rem;
      margin-right: 10px;
      cursor: pointer;

      svg {
        vertical-align: middle;
        margin-right: 5px;
      }
    }

    span {
      color: #5a4620;
      font-size: 1.1rem;
    }
  }
  @media (max-width: 768px) {
    flex: 0 0 46%;
    margin: 20px 2%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }

    .photo {
      overflow: hidden;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      padding: 20px;

      p:first-child {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;

        a {
          color: #3d3115;
          text-decoration: none;

          &:hover {
            color: #5a4620;
          }
        }
      }

      p:last-child {
        font-size: 1.1rem;
        color: #666;
        margin-bottom: 10px;
      }

      button {
        background-color: #5a4620;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 8px 8px 8px 12px;
        font-size: 1.1rem;
        margin-right: 10px;
        cursor: pointer;

        svg {
          vertical-align: middle;
          margin-right: 5px;
        }
      }

      span {
        color: #5a4620;
        font-size: 1.1rem;
      }
    }
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  button {
    background-color: transparent;
    color: #333;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: border-bottom-color 0.3s ease-in-out;

    &.on {
      border-bottom-color: #5a4620;
    }

    &:hover {
      color: #5a4620;
    }
  }
`;

const ProductInsert = styled.div`
  text-align: center;
  margin: 50px 0;

  a {
    padding: 10px 20px;
    background: #5a4620;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #3d3115;
    }
  }
`;

const OnlineShopsection = ({ title }) => {
  const dispatch = useDispatch();

  const manager = useSelector((state) => state.members.manager);

  const carts = useSelector((state) => state.products.carts);
  const allData = useSelector((state) => state.products.products);
  const [products, setProducts] = useState(allData);
  const sortType = [
    { type: "name", text: "상품명순" },
    { type: "price", text: "가격순" },
  ];

  const [changeSort, setChangeSort] = useState("");

  const [loading, setLoading] = useState(false);

  const sortFlag = useRef(false);

  const sortProduct = (keyname) => {
    if (!sortFlag.current) {
      setProducts((products) => {
        let sortProducts = [...products];
        return sortProducts.sort((a, b) => (a[keyname] < b[keyname] ? -1 : 1));
      });
    } else {
      setProducts((products) => {
        let sortProducts = [...products];
        return sortProducts.sort((a, b) => (a[keyname] > b[keyname] ? -1 : 1));
      });
    }
    sortFlag.current = !sortFlag.current;
  };

  const cartIdCount = (id) => {
    let item = carts.find((value) => value.id == id);
    if (item) {
      return item.qty;
    } else {
      return 0;
    }
  };
  const addToCart = async (id) => {
    try {
      const cartItemRef = kuwazawa_cartDB.child(id);
      const cartItemSnapshot = await cartItemRef.once("value");
      let quantity = 1;
      if (cartItemSnapshot.exists()) {
        quantity = cartItemSnapshot.val().qty + 1;
      }
      await cartItemRef.set({ id: id, qty: quantity });
    } catch (error) {
      console.log("오류메시지:", error);
    }
  };

  const [loging, setLoging] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      setLoading(true);
      if (title == "all") {
        setProducts(allData);
      } else {
        setProducts(allData.filter((item) => item.category == title));
      }
    }
  }, [allData, title]);

  useEffect(() => {
    setLoging(manager);
  }, [manager]);
  if (!loading) {
    return (
      <OnlineShopsectionBlock>
        <ProductInsert>
          <Link to="/productInsert">상품등록</Link>
        </ProductInsert>
      </OnlineShopsectionBlock>
    );
  }
  return (
    <OnlineShopsectionBlock className="row">
      <ButtonBlock>
        {sortType.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setChangeSort(item.type);
              sortProduct(item.type);
            }}
            className={changeSort == item.type && "on"}
          >
            {item.text}
          </button>
        ))}
      </ButtonBlock>
      <UlBlock>
        {products.map((item, index) => (
          <ListBlock key={index}>
            <div className="photo">
              <Link to={`/product/${item.id}`} state={{ item: item }}>
                <img src={item.photo} alt={item.name} />
              </Link>
            </div>
            <div className="info">
              <p>
                <a href="#">{item.name}</a>
              </p>
              <p>{parseInt(item.price).toLocaleString()}&yen;</p>
              {item.inventory != cartIdCount(item.id) ? (
                <button onClick={() => addToCart(item.id)}>
                  <BsGiftFill />
                </button>
              ) : (
                <button>
                  <BsGift />
                </button>
              )}
              {item.inventory != cartIdCount(item.id) ? (
                <span>{item.inventory - cartIdCount(item.id)}</span>
              ) : (
                <span style={{ color: "red" }}>sold out</span>
              )}
            </div>
          </ListBlock>
        ))}
      </UlBlock>
      {loging && (
        <ProductInsert>
          <Link to="/productInsert">상품등록</Link>
        </ProductInsert>
      )}
    </OnlineShopsectionBlock>
  );
};

export default OnlineShopsection;
