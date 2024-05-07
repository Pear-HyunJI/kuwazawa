import React, {useState} from 'react';
import styled from 'styled-components'
import { kuwazawa_productDB, oStorage } from '@/assets/firebase'
import { useNavigate } from "react-router-dom";

const OnlineShopInsertSectionBlock = styled.div`
  max-width: 500px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }

  .content {
    background: #ddd;
    border: 1px solid #5a4620;
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

const OnlineShopInsertSection = () => {

    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name:"",
        price:"",
        description:"",
        inventory:"",
        photo:"",
        detailPhotos: [],
    })

    const [photoValue, setPhotoValue] = useState("")
    const [detailPhotos, setDetailPhotos] = useState([]);

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
      setDetailPhotos(Array.from(files));
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      const addProduct = { ...product, id: Date.now() };
      try {
        const storageRef = oStorage.ref();
        if (product.photo) {
          const fileRef = storageRef.child(product.photo.name);
          await fileRef.put(product.photo);
          addProduct.photo = await fileRef.getDownloadURL();
        }
        if (detailPhotos.length > 0) {
          const detailPhotoURLs = [];
          await Promise.all(
            detailPhotos.map(async (file, index) => {
              const fileName = `detailPhoto${index + 1}_${Date.now()}_${
                file.name
              }`;
              const detailFileRef = storageRef.child(fileName);
              await detailFileRef.put(file);
              detailPhotoURLs.push(await detailFileRef.getDownloadURL());
            })
          );
          addProduct.detailPhotos = detailPhotoURLs;
        }
        await kuwazawa_productDB.push(addProduct);
        setProduct({
          name: "",
          price: "",
          description: "",
          inventory: "",
          photo: "",
          detailPhotos: [],
        });
        setPhotoValue("");
        setDetailPhotos([]);
        navigate("/product");
      } catch (error) {
        console.log("오류 : ", error);
      }
    };

    

  return (
    <OnlineShopInsertSectionBlock>
      <h2>상품 등록</h2>
      <div className="content">
        <form onSubmit={onSubmit}>
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
            <label htmlFor="photo">대표 상품사진:</label>
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
      </div>
    </OnlineShopInsertSectionBlock>
  );
};

export default OnlineShopInsertSection;
