import React from 'react'
import Card from '../components/Card/Card'
// import AppContex from '../Contex';

function Home({
	search_sneakers,
	onChangeInputSearch,
	setsearch_sneakers,
	arr_card_sneakers,
	isloading,
	onAddToCart,
	onFavorite,
}){
	// 
	const Carditem = ()=>{
			const itemLoadin = arr_card_sneakers.filter((item) => item.name.toLowerCase().includes(search_sneakers))
				return (isloading ? [...Array(25)] : itemLoadin).map((item, index)=>( 
				<Card
				loading = {isloading}
				key={index}
				addFavorite={(obj)=> onFavorite(obj)} // Добавить закладку
				add={(obj)=>onAddToCart(obj) } // добавить в корзину
				{...item} 
				/>
				))
		}

  return (
	<div className='Content'>
		<div className='Content_title'>
		<h1>{search_sneakers ? `Поиск по запросу "${search_sneakers}"`:'Все кроссовки'}</h1>
		<div className='Content_search'>
			<img src='/Img/Search/search.svg' alt='search'/>
			<input onChange={onChangeInputSearch} value={search_sneakers} placeholder='Поиск...'/>
			{search_sneakers && <img onClick={()=>{setsearch_sneakers('')}} width={42} height={42} className='Content_search_remuve' src='/Img/Cart/remuve_button.svg' alt='remuve'/>}
		</div>
		</div>
		<div className='Sneakers'>
			{Carditem()}
		</div>          
  	</div>
  )
}

export default Home
