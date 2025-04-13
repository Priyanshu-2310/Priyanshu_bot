import React from "react";
import avtaar from '../images/avtaar.png'
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { data } from "autoprefixer";


const Sign = ({handlename}) => {
    const {register,handleSubmit,reset}=useForm()
    const navigate = useNavigate()
 
  
    const submit=(data)=>{
        const {name} = data;
        handlename(name)
        navigate('/chatbot')
        reset()
        
    }
    
  return (
    <div className=" p-4 h-[100vh] w-[100vw] flex  items-center justify-center">
      <div className="h-[50vh] w-[400px] rounded-md md:w-[600px] flex flex-col items-center justify-center bg-zinc-100">
            <div className='h-[200px] w-[200px] rounded-full bg-white'>
                <img src={avtaar} />
            </div>
            <div className="flex gap-10  items-center justify-center">
                <form onSubmit={handleSubmit(submit)}>
                <input {...register('name')} placeholder="Enter Your Message Here" type="text" className="mt-10 mr-5 w-[300px] px-5 py-2" />
                <button  type="submit" className="mt-10 bg-red-600 px-2 py-1 text-white rounded-sm">Lets Start</button>
                </form>
            </div>
      </div>
    </div>
  );
};

export default Sign;
