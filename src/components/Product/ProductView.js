import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductView = () => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    axios
      .get(`/get-product/62cef442e425d578a0f215a0`)
      .then((data) => {
        console.log(data.data.price);
        // let newImage = '/' + data.data.image;
        console.log(data.data.image);
        setImageData(data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Product Details</h3>
      <img src={`${imageData}`} height={250} width={250} />
    </div>
  );
};

export default ProductView;
