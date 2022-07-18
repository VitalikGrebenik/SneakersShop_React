import React, { useContext } from 'react'
import Card from '../components/Card/Card';
import AppContex from '../Contex';

function Favorites() {


	const { favotrotes ,addFavorite} = React.useContext(AppContex);


	return (
		<div className='Content'>
			<div className='Content_title'>
				<h1>Мои Закладки</h1>
			</div>
			<div className='Sneakers_favorite'>
				{favotrotes.length > 0 ?
					favotrotes.map((obj, index) => (
						<Card
							key={index}
							{...obj}
							favorite={true}
							addFavorite={addFavorite} />))
					: <div className='empty_basket'>
						<img src='/Img/basket/bascket_empty/image 8.png' width={120} height={120} alt='#' />
						<h2>Корзина пустая</h2>
						<p>Добавьте хотя бы одну пару кроссовок</p>
					</div>}

			</div>
		</div>
	);
}

export default Favorites
