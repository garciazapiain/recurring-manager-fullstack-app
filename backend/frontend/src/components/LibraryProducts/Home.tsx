import { useNavigate } from 'react-router-dom'
import './style.css'

const Home = () => {
    let navigate = useNavigate();
    function categoriesPage() {
        navigate("/productcategories");
    }
    function userDashboard() {
        navigate("/userproducts");
    }
    return (
        <>
            <h1 className='m-5 text-4xl'>Home Page</h1>
            <div className='homePageButtonsContainer'>
                <button onClick={categoriesPage}>Product categories</button>
                <button onClick={userDashboard}>User products</button>
            </div>
        </>
    )
}

export default Home