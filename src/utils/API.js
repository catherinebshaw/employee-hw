import axios from 'axios'

//export employee information
export default {
    fetchEmployees: function() {
        return axios
        .get("https://randomuser.me/api/?results=50")
        .then(res => {
            const employees = res.data.results;
            console.log(employees)
            return employees.map(employee => {
                return{
                    id: employee[0],
                    firstName: employee.name.first,
                    lastName: employee.name.last,
                    email: employee.email,
                    cell: employee.cell,
                    image: employee.picture.thumbnail,
                    country: employee.location.country
                };
            });
        }) ;
    }
};

