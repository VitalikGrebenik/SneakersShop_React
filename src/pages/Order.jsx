import React, { useState,useContext, useEffect } from 'react'
import Card from '../components/Card/Card';
import axios from 'axios';
import AppContex from '../Contex';

function Order() {
 
	// const{onAddToCart, onFavorite}=useContext(AppContex)
	const[orders, setorders] = useState([])
	const[isloading, setIsloading] = useState(true)

	useEffect(()=>{
		(async ()=>{
			try{
				const {data} = await axios.get('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/order'); 
				// console.log(data.map((obj)=> obj.items).flat())
				setorders((data.reduce((prev, obj)=>[...prev,...obj.items],[])))
				setIsloading(false)
			} catch(error){
				alert('Ошибка')
				console.error(error);
			}
		})()
	},[])


	return (
		<div className='Content'>
			<div className='Content_title'>
				<h1>Мои Заказы</h1>
			</div>
			<div className='Sneakers_favorite'>
				{(isloading ? [...Array(10)] : orders).map((item, index) => (
					<Card
						loading = {isloading}
						key={index}
						{...item} 
				/>))}
			</div>
		</div>
	);
}

export default Order
