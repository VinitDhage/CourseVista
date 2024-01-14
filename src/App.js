import {useEffect, useState} from 'react' // another hook in react
import './App.css';
import Navber from './components/Navber';
import Filter from './components/Filter';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import {apiUrl,filterData} from './data'
import { toast } from 'react-toastify';



function App() {

  const [courses, setCourses]= useState(null);
  const [loading,setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title)

  async function fetchData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output= await response.json();

      setCourses(output.data);
      
    }
    catch(error){
      toast.error("Data went wrong.")
    }
    setLoading(false);
  }

  useEffect( ()=>{
    fetchData();
  },[])




  return (
    <div className=' min-h-screen flex flex-col bg-[#312e81]' >
      <div>
        <Navber></Navber>
      </div>

      <div>
        <div>
          <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
        </div>
        <div className=' w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
          {
            loading? (<Spinner></Spinner>):(<Cards courses={courses} category={category}></Cards>)
          }
        </div>
      </div>
    </div>
  );
}



export default App;





// function App() {
//   const [text,setText] = useState('');


//   // Varaition 1 ---> Every Render.
//   // useEffect(()=>{
//   //   console.log("UI rendering done")
//   // })

//   // Varaition 2 ---> First Render.
//   // useEffect(()=>{
//   //   console.log("UI rendering done")
//   // },[])

//   // Varaition 3 ---> First Render + Whenever dependency changes.
//   // useEffect(() => {
//   //   console.log("Change Observed");
//   // }, [text]);


//   // Varaition 4 ---> First Render + to handle unmounting of component
//   // in this ---1)"a" 2) after every render "b" then "a".

//   useEffect(() => {
//     //Listener Added
//     console.log("Listener Added"); //a
    
//     //Listeener Removed
//     return ()=>{
//       console.log('listener removed'); //b
//     }
//   }, [text]);





//   function changeHandler(event){
//     setText(event.target.value);
//     console.log(text);
//   }

//   return (
//     <div className="App">
//        <input type="text" onChange={changeHandler} ></input>
//     </div>
//   );
// }

// export default App;
