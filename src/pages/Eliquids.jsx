import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import CardVaper from '../components/CardVaper';
import eliquidsActions from '../redux/actions/eliquidsAction';

export default function Eliquids() {
  const dispatch = useDispatch();
  let { eliquids, category } = useSelector((store) => store.eliquidsReducer);
  let [check, setCheck] = useState([])
  let [inp, setInp] = useState("")
  useEffect(() => {
    const data = { name: "", category: "" }
    dispatch(eliquidsActions.getEliquids(data))
    dispatch(eliquidsActions.getCategories())
  }, [])

  const search = (e) => {

    setInp(e.target.value)
    const data = { name: e.target.value, category: check.toString() }
    dispatch(eliquidsActions.getEliquids(data))
  }
  const categ = (e) => {
    if (check.includes(e)) {
      let i = check.indexOf(e)
      check.splice(i, 1)
      setCheck(check)
    }
    else {
      check.push(e)
      setCheck(check)
    }
    const y = check.toString()
    const data = { name: inp, category: y }
    dispatch(eliquidsActions.getEliquids(data))
    console.log(check)
  }
  console.log(eliquids)
  return (
    <div className="bg-black body-container-products d-flex flex-column flex-wrap gap-3 justify-content-center">
      <div className='filter-container d-flex flex-wrap gap-5 justify-content-center align-items-center'>
        <div className='box'>
          <div class="search-box">
            <input type="text" placeholder='Search' onChange={search} />
            <label class="icon">
              <img src="https://cdn-icons-png.flaticon.com/512/8915/8915520.png" alt="" />
            </label>
          </div>
        </div>

        <div>
          <label className='gap-4 d-flex'>
            {category.map(e => <><input type="checkbox" onClick={e => categ(e.target.value)} value={e} />
              <span>{e}</span></>)}
          </label>
        </div>
      </div>
      <h1 className='title-products'>E-liquids</h1>
      <div className='d-flex flex-wrap gap-5 justify-content-center pt-4 pb-4'>
        {eliquids.length === 0 ? ("NOT FOUND") : (eliquids.map(e => <CardVaper name={e.name} description={e.description} price={e.price} img={e.photo} cont={e.amount} id={e._id} type={"liquids"} />))}
      </div>
    </div>
  )
}