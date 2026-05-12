import React,{memo} from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({categoriesData}) => {
    const navigate = useNavigate()
  return (
    <>
      {categoriesData.map((category) => (
        <div
          key={category.id}
          onClick={() => navigate(category.route)}
          className="h-64 bg-cover bg-center rounded-lg flex justify-center items-center cursor-pointer"
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        >
          <div className="border border-black bg-[#ffffff6f] w-30 h-20 flex flex-col justify-around items-center uppercase ">
            <p>{category.title}</p>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(CategoryCard);
