
import axios from 'axios'

async function getUserByUsername (
  username,  
  setFn, setLoading, setError, 
) {
  
  if (setLoading) setLoading(true)
  if (setError) setError(null)

  return axios
  .get('https://nc-news-seedingproject.onrender.com/api/users/'+username)
  .then((res) => {
    const userCopy = {...res.data.user}

    if (setFn) setFn(userCopy)
    return userCopy
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
      if (setLoading) setLoading(false)
  })
}

export default getUserByUsername