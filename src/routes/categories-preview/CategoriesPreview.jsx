import React from 'react'
import { categoriesData } from '../../db/categoriesData'; 
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../../components/category-card/CategoryCard';
const CategoriesPreview = () => {
  const navigate = useNavigate();
  return (
    <div className='px-10 py-10 '>
        <div className='grid grid-cols-3 gap-2'>
        <CategoryCard categoriesData={categoriesData}/>
              
        </div>
    </div>
  )
}

export default CategoriesPreview