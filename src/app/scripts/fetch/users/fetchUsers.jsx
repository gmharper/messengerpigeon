import axios from 'axios'

async function getUsers (
  setFn, setLoading, setError, 
  sort='name', order='DESC', page=0, per_page=20, only=''
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    const params = {
      sort: sort, order: order, p: page, limit: per_page
    }

    if (only) params.only = only

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/users', { params: params })
    .then((res) => {
      const usersCopy = [...res.data.users]

      if (setFn) setFn(usersCopy)
      return usersCopy
    })
    .catch((err) => {
      if (setError) setError(err)
      console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getUsers