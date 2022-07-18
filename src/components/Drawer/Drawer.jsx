import React, { useState, useContext } from 'react'
import Drawer_card from './Drawer_card/Drawer_card'
import Info from '../Info/Info'
import axios from 'axios';
import { useCart } from '../Hooks/useCard';

import styles from './Drawer.module.scss'


const delay = (ms)=>{
	new Promise((resolve)=> setTimeout(resolve, ms));
}

const Drawer = (props) => {
	// кастомный хук
	const{items_card_sneakers, setItems_card_sneakers, totalPrice} = useCart();

	const [orderId, setOrderId] = useState(null)
	const [orderCopmlete, setOrderComplete] = useState(false);
	const [loading, setLoading] = useState(false)



	// c помощью контекста очищаем 
	const onClickOrder = async()=>{
		setLoading(true);
		try{
		const{data} = await axios.post('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/order', {
			items: items_card_sneakers
		});
		// await axios.put('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card', [])
		setOrderId(data.id)
		setOrderComplete(true)
		setItems_card_sneakers([]) // корзина покупок

		// костыль для удаление сформированного заказа из корзины
		for(let i= 0; i< items_card_sneakers.length ; i++){
			const item = items_card_sneakers[i];
			await axios.delete('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card/'+item.id );
			await delay(1000);
		}

		} catch (error){
			alert('Не удалось создать заказ !')
		}
		setLoading(false)
	}

  return (
	<div className={`${styles.overlay} ${props.opened ? styles.overlayVisible : ''}`}>
		<div className={styles.drawer}>
			<h2>Корзина <img onClick={props.onclikCart_pop} width={42} height={42} className='remuveBtn' src='/Img/Cart/remuve_button.svg' alt='remuve'/></h2>
			{
			props.items_card.length > 0 ?
				<>
					<div className='drawer_item'>
						{props.items_card.map((obj, index)=>(
							<Drawer_card onRemuve={()=>props.onRevuve(obj.id)} key={index} id={obj.id} name={obj.name} price={obj.price} image={obj.image}/>
						))} 
					</div>
					<div className='card_total_block'>
						<ul>
							<li className='drawer_check_li'>
								<span>Итог:</span>
								<div></div>
								<p>{totalPrice} руб.</p>
							</li>
							<li className='drawer_check_li'>
								<span>Налог 5%:</span>
								<div></div>
								<p>{(totalPrice/100*5)} руб.</p>
							</li>
						</ul>
						<button disabled={loading} onClick={onClickOrder} className='greenbutton'>Оформить заказ<img src='/Img/arrow.svg' alt='arrow'/></button>
					</div> 
				</>
				 :
				<Info 
				title={orderCopmlete ? 'заказ оформлен!' : 'Корзина пустая'}
				description={orderCopmlete? `Номер заказа # ${orderId}`:'Добавьте хотя бы одну пару кроссовок'}
				image={orderCopmlete? '/Img/basket/order_placed/image 8.jpg':'/Img/basket/bascket_empty/image 8.png'}	
				/>
			}
  		</div>
	</div>
  )
}

export default Drawer