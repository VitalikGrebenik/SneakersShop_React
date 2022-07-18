import React, { useContext } from 'react'
import AppContex from '../../Contex'

const Info = ({title, image, description}) => {

	const {onclikCart_pop} = useContext(AppContex)

  return (
	<div className='empty_basket'>
		<img src={image} width={120} height={120} alt='#'/>
		<h2>{title}</h2>
		<p>{description}</p>
		<button onClick={onclikCart_pop}  className='greenbutton'>
			<img src='/Img/basket/bascket_empty/Group.svg' alt='#'/>
			Вернуться назад
		</button>
	</div>
  )
}


export default Info