
import axios from 'axios'

function getUserById (
  id,  
  setFn, setLoading, setError, 
) {
  
  if (setLoading) setLoading(true)

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/users/'+id)
  .then((res) => {
    let user = res.data.user[0]

    if (setFn) setFn(user)
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getUserById