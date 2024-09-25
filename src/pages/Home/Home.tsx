import Banner from "../../components/Home/Banner/Banner"
import Category from "../../components/Home/Category/Category"
import Products from "../../components/Home/Products/Products"
import Title from "../../components/ui/Title"

const Home= () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <Title title="Categories" />
      <Category />
      <Title title="Products" />
      <Products />
    </div>
  )
}

export default Home
