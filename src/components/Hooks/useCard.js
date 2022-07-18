import React, { useState, useContext } from 'react'
import AppContex from '../../Contex'

export const useCart = () =>{
	const {items_card_sneakers ,setItems_card_sneakers} = useContext(AppContex)
	const totalPrice = items_card_sneakers.reduce((sum, obj)=> Number(obj.price) + Number(sum) ,0)

	return {items_card_sneakers, setItems_card_sneakers, totalPrice}
}