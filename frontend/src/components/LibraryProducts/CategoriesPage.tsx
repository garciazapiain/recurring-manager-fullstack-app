import React, { useEffect } from 'react';
import '../../index.css'
import './style.css'
import data from './data/categories'
import { Link } from "react-router-dom";
// @ts-ignore
import Button from '../Elements/Button.tsx'

function CategoriesPage(props: any) {
    console.log(props)
    const CategoryCard = ({ name }: { name: string}) => (
        <>
            <Link to={`/${name.toLocaleLowerCase()}`}>
                <div className='category-banner' onClick={() => props.cardClicked(name)}>
                    <h2 className="p-5 text-5xl">{name}</h2>
                </div>
            </Link>
        </>
    );
    // const [categoriesData, setCategoriesData] = React.useState([])
    const [section, setSection] = React.useState([])
    // const sections = data.map((category) => <CategoryCard {...category} />);
    React.useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    // async function getCategoriesData() {
    //     await fetch(`http://127.0.0.1:8000/api/productcategories/`)
    //     .then(response => response.json())
    //     .then(response=>{
    //         setCategoriesData(response)
    //     })
    // }

    // useEffect(()=>{
    //     getCategoriesData()
    // },[])

    useEffect(()=>{
        console.log(data)
        // setSection((data.map((category) => <CategoryCard {...category} />)))
        if(props.categoriesData.length>0){
            setSection((props.categoriesData.map((category) => <CategoryCard {...category} />)))
        }
        if(props.categoriesData.length>0){
            setSection((props.categoriesData.map((category) => <CategoryCard {...category} />)))
        }
    },[props.categoriesData])

    const isSticky = (e) => {
        const footer = document.querySelector('.buttonFooterCategoriesPage')
        const scrollTop = window.scrollY
        scrollTop >= 20 ? footer.classList.add('ixs-sticky') : footer.classList.remove('is-sticky')
    }
    return (
        <>
            <h1 className="m-5 text-4xl">Categories</h1>
            <h2 className='m-5 text-lg'>See products by categories</h2>
            <div className='category-section'>
                {section}
            </div>
            <Link to="/all-products">
                <div className="buttonFooterGeneric">
                    <Button
                        onClick={()=>props.cardClicked("all-products")}
                        text="Select All"
                    />
                </div>
            </Link>
        </>
    )
}

export default CategoriesPage;