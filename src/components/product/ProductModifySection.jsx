import React, { useState } from "react";
import styled from "styled-components";
import { kuwazawa_productDB, oStorage } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";

const ProductModifyBlock = styled.div`
  max-width: 500px;
  margin: 0 auto;
  h2 {
    padding: 50px 0;
    text-align: center;
  }
  div {
    display: flex;
    padding: 5px;
    margin: 5px;
    label {
      width: 100px;
      display: inline-block;
    }
    input,
    select,
    textarea {
      flex: 1;
      border: 1px solid #000;
    }
    input[type="text"],
    input[type="number"] {
      height: 30px;
      padding: 5px;
    }
    input[type="file"] {
      border: none;
    }
    select {
      height: 30px;
    }
    textarea {
      height: 200px;
      padding: 5px;
    }
    &.btn {
      justify-content: center;
      margin-top: 20px;
      button {
        padding: 10px 20px;
        background: #5a4620;
        color: #fff;
      }
    }
  }
`;

const OnlineShopModify = ({ item }) => {
  const navigate = useNavigate();
  const { category, name, price, description, inventory, photo, detailPhotos } =
    item;
  const [product, setProduct] = useState({
    category,
    name,
    price,
    description,
    inventory,
    photo,
    detailPhotos: [],
  });

  const [photoValue, setPhotoValue] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({ ...prevProduct, photo: file }));
    setPhotoValue(e.target.value);
  };

  const handleDetailFileChange = (e) => {
    const files = e.target.files;
    setProduct((prevProduct) => ({
      ...prevProduct,
      detailPhotos: Array.from(files),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const storageRef = oStorage.ref();
      if (product.photo) {
        const fileRef = storageRef.child(product.photo.name);
        await fileRef.put(product.photo);
        product.photo = await fileRef.getDownloadURL();
      }
      if (product.detailPhotos.length > 0) {
        const detailPhotoURLs = [];
        await Promise.all(
          product.detailPhotos.map(async (file, index) => {
            const fileName = `detailPhoto${index + 1}_${Date.now()}_${
              file.name
            }`;
            const detailFileRef = storageRef.child(fileName);
            await detailFileRef.put(file);
            detailPhotoURLs.push(await detailFileRef.getDownloadURL());
          })
        );
        product.detailPhotos = detailPhotoURLs;
      }
      await kuwazawa_productDB.child(item.key).update(product);
      navigate("/product");
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  return (
    <ProductModifyBlock>
      <h2>상품 수정</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="category">카테고리:</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="클래식상품">클래식상품</option>
            <option value="시즌한정상품">시즌한정상품</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">상품명:</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">가격:</label>
          <input
            required
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">요약설명:</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="inventory">재고:</label>
          <input
            required
            type="number"
            name="inventory"
            id="inventory"
            value={product.inventory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photo">상품사진:</label>
          <input
            type="file"
            name="photo"
            id="photo"
            value={photoValue}
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="detailPhoto">상세 상품사진:</label>
          <input
            type="file"
            name="detailPhoto"
            id="detailPhoto"
            onChange={handleDetailFileChange}
            multiple
          />
        </div>
        <div className="btn">
          <button type="submit">등록</button>
        </div>
      </form>
    </ProductModifyBlock>
  );
};

export default OnlineShopModify;
