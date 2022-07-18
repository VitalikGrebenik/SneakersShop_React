import React, { useState } from 'react'
import classes from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContex from '../../Contex'


// favorite - поумалочанию false , при передачи меняется на true
function Card({
  id, name, price, image, add, addFavorite, favorite = false, loading=false,
}) {

  const itemsObj = {id, parentid: id, name, price, image }

  // Проверка на пряму о добавление в корзину
  const {getAddedItems} = React.useContext(AppContex)

  // добавить в корзину
  const onClickapp = () => {
    add(itemsObj);
  };
  const chek = getAddedItems(id) ? '/Img/chek/chek_app.svg' : '/Img/chek/chek_pop.svg';

  // добавить в закладку
  const [bookmark, setbookmark] = useState(favorite);
  const onClick_setbookmark = () => {
    addFavorite(itemsObj);
    setbookmark(!bookmark);
  };
  const chek_setbookmark = bookmark ? '/Img/Like/Group 90.svg' : '/Img/Like/Like_chek.svg';

  return (
    <div className={classes.Card}>
      {loading ? <ContentLoader
        speed={2}
        width={200}
        height={180}
        viewBox="0 0 200 180"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="35" y="2" rx="12" ry="12" width="140" height="82" />
        <rect x="35" y="98" rx="12" ry="12" width="140" height="19" />
        <rect x="39" y="127" rx="12" ry="12" width="70" height="14" />
        <rect x="127" y="152" rx="32" ry="32" width="49" height="23" />
      </ContentLoader>
        :
        <>
          <div className={classes.favorite}>
            {addFavorite&&<img onClick={onClick_setbookmark} width={32} height={32} src={chek_setbookmark} alt='like' />}
          </div>
          <img width={160} height={145} src={image} alt='#' />
          <h5>{name}</h5>
          <div className={classes.Card_bottom}>
            <div className={classes.Card_bottom_price}>
              <span>Цена:</span>
              <p>{price} руб.</p>
            </div>
            {add &&<button onClick={onClickapp}><img width={30} height={30} src={chek} alt='#' /></button>}
          </div>
        </>}
    </div>
  );
}

export default Card