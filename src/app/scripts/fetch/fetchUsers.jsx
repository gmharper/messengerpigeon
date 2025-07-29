
import axios from 'axios'

function getUsers (
  setFn, setLoading, setError, 
  sort='subscribers', order='DESC', page=1, perPage=20
) {
  
  if (setLoading) setLoading(true)

  let queryString = `?sort_by=${sort}&order=${order}&p=${page}&limit=${perPage}` // injection is prevented on the db side

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/users'+queryString)
  .then((res) => {
    let users = res.data.users
    let usersCopy = [...users]

    // new property assignment
    usersCopy.forEach((user) => {
      user.type = 'user'
    })

    if (setFn) setFn(usersCopy)
  })
  .catch((err) => {
    setUsersLoading(false)
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getUsers