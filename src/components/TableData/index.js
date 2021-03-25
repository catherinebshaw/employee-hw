import { useEffect, useState, useRef } from "react"
import API from '../../utils/API';
import "./style.css";


function TableData(){
    const [employees, setEmployees] = useState([]);
    const [order,setOrder] = useState('desc'); 
    const inputRef = useRef()
    
    function getEmployees(){
    API.fetchEmployees()
    .then(employees => {
    setEmployees(employees);
        })
        .catch(err => console.log(err));
    }
    
    function sortEmployee(){
        let newList = [ ...employees, ]
        newList.sort((a, b) => {
            let fa = a.firstName.toLowerCase(),
                fb = b.firstName.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0; 
        })
        if( order === 'desc' ) {
            setOrder('asc') 
        newList.reverse()
        } else {
            setOrder('desc')
        }
        setEmployees(newList);
    } 

    function filterEmployee(country){
        console.log(`the employees`, employees)
        const myInput = inputRef.current.value
        const newList = employees.filter( employee => employee.country.indexOf( myInput )> -1 )
        console.log(`this is the part that broke it all `, newList)
        setEmployees(newList);
    
    }

    function clearSearch(){
        document.querySelector("#country").value = "Enter Country";
        getEmployees()
    }
      
    useEffect(() => {
        getEmployees();
    }, []);
    
    return (
        <>
            <header>
                <h1>Employee Directory</h1>
                    <p>Click on 'Name' to sort alphabetically</p>
                    <div class="input-group mb-3">
                        <label for="countrySearch" class="form-label">Search by Country:</label>
                        <input id="country" type="text" class="form-control" ref={inputRef} placeholder="Enter Country"/>
                        <button class="btn btn-outline-primary"  onClick={()=>filterEmployee(inputRef.current.value)} type="button" id="button-addon2">Search</button>
                        <button class="btn btn-outline-primary"  onClick={()=>clearSearch()} type="button" id="button-addon2">Clear Search</button>
                    </div>
            </header>
            <table class="table" id="table">
                
                    <thead id="headings">
                        <tr>
                            <th onClick={sortEmployee}>Name</th>
                            <th>Image</th>
                            <th>Country</th>
                            <th>Email</th>
                            <th>Cell Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                        <tr >   
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td><img alt={employee.image} src={employee.image}/></td>
                            <td>{employee.country}</td>
                            <td>{employee.email}</td>
                            <td>{employee.cell}</td>
                        </tr>))}
                </tbody>
            </table>            
        </>     
        );  
};

export default TableData 