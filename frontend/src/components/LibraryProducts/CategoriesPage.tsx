/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import '../../index.css'
import './style.css'
import { Link } from "react-router-dom";
// @ts-ignore
import Button from '../Elements/Button.tsx'

function CategoriesPage(props: any) {
    const CategoryCard = ({ name }: { name: string}) => (
        <>
            <Link to={`/${name.toLocaleLowerCase()}`}>
                <div className='category-banner' onClick={() => props.cardClicked(name)}>
                    <h2 className="p-5 text-5xl">{name}</h2>
                </div>
            </Link>
        </>
    );
    const [section, setSection] = React.useState([])
    React.useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    useEffect(()=>{
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
                        class="button-generic"
                    />
                </div>
            </Link>
        </>
    )
}

export default CategoriesPage;