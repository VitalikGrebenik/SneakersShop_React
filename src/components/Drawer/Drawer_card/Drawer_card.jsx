import React from 'react'

export const Drawer_card = (props) => {
  return (
	<div className='cartItem'>
		<div style={{ backgroundImage: `url(${props.image})`}} className='cart_item_img'></div>
		<div className='cartItem_title'>
			<p>{props.name}</p>
			<span>{props.price}</span>
		</div>
		<img width={42} height={42} onClick={props.onRemuve} className='remuveBtn' src='/Img/Cart/remuve_button.svg' alt='remuve'/>
	</div>	
  )
}

export default Drawer_card;
