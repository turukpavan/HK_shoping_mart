import React from 'react'
import CategoryCard from '../../components/category-card/CategoryCard';
import { useSelector } from 'react-redux';
const CategoriesPreview = () => {
  const categoriesData = useSelector(state=>state.Categories.categories);
  
  
  return (
    <div className='px-10 py-10 '>
        <div className='grid grid-cols-3 gap-2'>
        <CategoryCard categoriesData={categoriesData}/>
              
        </div>
    </div>
  )
}

export default CategoriesPreview