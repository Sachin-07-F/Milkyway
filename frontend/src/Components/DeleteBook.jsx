import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteBook = () => {
 
  const navigate = useNavigate()
  const {id} = useParams()
  useEffect(()=>{
    axios.delete(`${process.env.REACT_APP_Backend_Url}/book/book/`+id)
    .then(res=>{
        if(res.data.deleted){
          toast.success('Cow Deleted successfully!',{
            position:'top-center',
            autoClose:'2000'
          });
            navigate('/books')
        }
    }).catch(err=>console.log(err))
  },[])

}

export default DeleteBook


