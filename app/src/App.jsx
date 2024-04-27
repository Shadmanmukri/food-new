import {useState} from "react"
import {useEffect} from "react"
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://127.0.0.1:9000"
const App = () => {
  const [data,setdata]= useState(null)
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const[filteredData,setFilteredData]=useState(null)
  const[selectedBtn, setSelectedBtn]= useState("all")

  useEffect(()=>{
    const fetchFoodData =async() =>{
      setLoading(true)

      try{
        const response = await fetch(BASE_URL)
        const json = await response.json()
        setdata(json)
        setFilteredData(json)
        setLoading(false)
  
      } catch (error){
        setError("Unable to fetch data")
      }
  
     
    }
  
    fetchFoodData();

  }, []);


  const searchFood=(e)=>{
    const searchValue =e.target.value

    console.log(searchValue);

    if(searchValue === ""){
      setFilteredData(null)
    }

    const filter = data?.filter((food) =>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );

    setFilteredData(filter)
  }

  const filterFood=(type)=>{
    if (type=== "all"){
      setFilteredData(data);
      setSelectedBtn("all")
      return
    }

    const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectedBtn(type);

  }

  const filterBtns=[
    {
      name:"ALL",
      type:"all"
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ]


  

  if (error) return <div> {error}</div>
  if (loading) return <div>loading...</div>

  return(
    <>
   <Container>
  <TopContainer>
  <div className="logo">
    <img src="./logo(1).svg" alt="logo" />
  </div>

  <div className="search">
    <input onChange={searchFood} type="text" placeholder="Search Food.." />
  </div>

  </TopContainer>

  <FilterContainer>
  {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}

  </FilterContainer>


  
  </Container>
  <SearchResult data={filteredData}/>

  </>
  )
};

export default App;

export const Container=styled.div`
margin: 0 auto;
max-width: 1200px;
`
const TopContainer=styled.div`
min-height: 140px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0px 10px;

  }
 
}
@media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`

const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 12px;
color: white;
padding-bottom: 40px;
`

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;