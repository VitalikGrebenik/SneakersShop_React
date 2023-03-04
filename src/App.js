import { Routes, Route} from "react-router-dom";
import { useEffect, useState} from 'react';
import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContex from './Contex';
import Order from './pages/Order';


function App() {

  // Ассортимент 
  const[arr_card_sneakers, setarr_card_sneakers] = useState([])

  // Корзина покупок
  const[items_card_sneakers, setItems_card_sneakers] = useState([])

  // Поиск
  const[search_sneakers, setsearch_sneakers] = useState('')

  // Закладки 
  const[favotrotes, setfavotrotes] = useState([])

  //Открытие корзины
  const [cartOpened, setcartOpened] = useState(false)
  
  // загрузка страницы
  const [isloading, setIsloading] = useState(true)

  const TestApi = [
    {
      "id": "1",
      "name": "Мужские Кроссовки Nike Blazer Mid Suede ",
      "price": "12999",
      "image": "/Img/Sneakers/image_1.jpg"
    },
    {
      "id": "2",
      "name": "Мужские Кроссовки Nike Air Max 270",
      "price": "11100",
      "image": "/Img/Sneakers/image_2.jpg"
    },
    {
      "id": "3",
      "name": "Кроссовки Puma X Aka Boku Future Rider",
      "price": "8499",
      "image": "/Img/Sneakers/image_3.jpg"
    },
    {
      "id": "4",
      "name": "Мужские Кроссовки Under Armour Curry 8",
      "price": "16499",
      "image": "/Img/Sneakers/image_4.jpg"
    },
    {
      "id": "5",
      "name": "Мужские Кроссовки Nike Kyrie 7",
      "price": "13499",
      "image": "/Img/Sneakers/image_5.jpg"
    },
    {
      "id": "6",
      "name": "Мужские Кроссовки Nike Kyrie 7",
      "price": "13499",
      "image": "/Img/Sneakers/image_5.jpg"
    },
    {
      "id": "7",
      "name": "Мужские Кроссовки Under Armour Curry 8",
      "price": "16499",
      "image": "/Img/Sneakers/image_2.jpg"
    }
    ,
    {
      "id": "8",
      "name": "Мужские Кроссовки Under Armour Curry 8",
      "price": "16499",
      "image": "/Img/Sneakers/image_4.jpg"
    },
    {
      "id": "9",
      "name": "Мужские Кроссовки Under Armour Curry 8",
      "price": "16499",
      "image": "/Img/Sneakers/image_5.jpg"
    }
  ]
// По очередная загрузка 
  useEffect(()=>{
    async function ferchData (){
      try{
        const favoriteRespons = await axios.get('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/Favorite'); // закладки
        const cardRespons = await axios.get('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card'); // покупки
        // const itemsRespons = await axios.get('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/items'); // accортимент
        setIsloading(false);

        setItems_card_sneakers(cardRespons.data);
        setfavotrotes(favoriteRespons.data);  
        setarr_card_sneakers(TestApi); 
      } catch (error){
        alert('Ошибка при запросе данных !')
        console.error(error);
      }
    }
    ferchData()
  },[])
 
  // App  в корзину
  const onAddToCart = async (obj)=>{
    try{
      const findItem = items_card_sneakers.find((item)=> Number(item.parentid) === Number(obj.id))
      if(findItem){
        setItems_card_sneakers((prev) =>prev.filter(item => Number(item.parentid) !== Number(obj.id)))
        axios.delete(`https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card/${findItem.id}`)
      }else{
        setItems_card_sneakers((prev) =>[...prev, obj])
        const data = axios.post('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card', obj)
        console.log(data)
        setItems_card_sneakers((prev) => prev.map(item => {
          if( item.parentid === data.parentid){
            return{
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error){
      alert('Ошибка при добавление в корзину !')
      console.error(error);
    }
  }


  // App закладки
  const onFavorite = async (obj)=>{
    try{
      if(favotrotes.find(fanobj=>Number(fanobj.id) === Number(obj.id))){
        setItems_card_sneakers((prev) =>prev.filter(item=>item.id !== obj.id))
        axios.delete(`https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/Favorite/${obj.id}`)
        setfavotrotes(prev =>prev.filter(item=> item.id !== obj.id))
      } else{
        const {data} = await axios.post('https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/Favorite', obj)
        setfavotrotes(prev =>[...prev, data])
      }
    } catch(error){
      alert('Не удалоась добавить !')
      console.error(error);
    }
  }

  // удаление из корзины карточку
  const onRemoveItem = async (id)=>{  
    try{
      setItems_card_sneakers((prev) =>prev.filter(item=> Number(item.id) !== Number(id)))
      axios.delete(`https://62b9c3b5ff109cd1dc9a8b95.mockapi.io/card/${id}`)
    } catch (error){
      console.error(error);
    }
  }

  // Поиск по Ассортименту
  const onChangeInputSearch = (event)=>{
    setsearch_sneakers(event.target.value);
  }

  // Проверка на добавление
  const getAddedItems = (id) =>{
    return items_card_sneakers.some((obj)=> Number(obj.parentid) === Number(id));
  }


  const addFavorite = (obj)=>{
    return onFavorite(obj)
  }

  const onclikCart_pop = ()=>{
    return setcartOpened(false)
  }
  console.log('items_card_sneakers', items_card_sneakers)
  

  return (
    <AppContex.Provider value={{
      favotrotes, 
      items_card_sneakers, 
      arr_card_sneakers, 
      getAddedItems,
      addFavorite,
      onAddToCart,
      onclikCart_pop,
      setItems_card_sneakers,
      }}> 
      <div className="wrapper">
        <Drawer 
          onRevuve={onRemoveItem} 
          items_card={items_card_sneakers} 
          onclikCart_pop={onclikCart_pop} 
          opened={cartOpened}
        />
        <Header onclikCart={()=>{setcartOpened(true)}}/>
        <Routes>
          <Route 
          path="/" 
          element={<Home
          items_card_sneakers={items_card_sneakers}
          search_sneakers ={search_sneakers}
          onChangeInputSearch ={onChangeInputSearch}
          isloading = {isloading}
          onAddToCart ={onAddToCart}
          onFavorite ={onFavorite}
          arr_card_sneakers={arr_card_sneakers} 
          setsearch_sneakers={setsearch_sneakers}
          />}
          ></Route>
          <Route path="/favorites" element={<Favorites/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
        </Routes>
      </div>
    </AppContex.Provider>
  );
}

export default App;
