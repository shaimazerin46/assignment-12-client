
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";

import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Heading from "../Components/SmallComponents/Heading";
import toast from "react-hot-toast";




const Register = () => {
    const { createUser, updateUserProfile, googleSignin } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';
    const onSubmit = (data) => {
        // console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photo = data.photo;
        const userInfo = {
            name, photo, email, badge: "Bronze"
        }
        createUser(email, password)
            .then(() => {

                updateUserProfile(name, photo)
                    .then(() => {
                        axiosPrivate.post('/users', userInfo)
                            .then(() => {
                                
                               
                                toast('Successfully registered',{
                                    duration: 1000,
                                    style: {color:'black', fontSize:"20px"},
                                    icon: '✅'
                                })
                                reset();
                                navigate(from, {replace: true})
                            })
                            .catch(err => {
                              
                                toast('registration failed!',err,{
                                    duration: 1000,
                                    style: {color:'black', fontSize:"20px"},
                                    icon: '❌'
                                })
                            })

                    })

            })
            .catch(err => {
                toast('registration failed!',err,{
                    duration: 1000,
                    style: {color:'black', fontSize:"20px"},
                    icon: '❌'
                })
            })
    }
    const handleGoggleLogin = () => {
        googleSignin()
        .then(res=>{
            updateUserProfile(res.user.displayName, res.user.photoURL)
            .then(()=>{
                const userInfos = {
                name: res.user.displayName,  
                photo: res.user.photoURL,   
                email: res.user.email,      
                badge: "Bronze"
                }
                axiosPrivate.post('/users', userInfos)
                .then(() => {
                    toast('Successfully signin',{
                        duration: 1000,
                        style: {color:'black', fontSize:"20px"},
                        icon: '✅'
                    })
                    navigate(from, {replace: true})
            })

            })
        })
        
    }
    return (
        <div className="md:mt-30 mt-40 pb-10 md:pb-20 bg-[#f2f3f7] px-3 md:px-0 md:min-h-screen my-auto">
            <div>
                <Heading text={"Register"}
                >

                </Heading>
            </div>
            <div style={{boxShadow: "0px 0px 20px gray"}}
            className="mx-auto md:w-[400px] bg-[#f2f3f7] md:p-15 p-10 rounded-[50px] md:mb-20 mb-5">
                 <h3 className="text-xl mb-5">Register here</h3>
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5 ">

                    {/* name */}
                   
                    <input type="text" placeholder="Enter your name" className="input outline-0 border-0 border-b-[1px] bg-transparent focus:outline-0 rounded-none w-full max-w-xs"  {...register("name", { required: true })} /><br></br>

                    {/* photo */}

                   
                    <input type="url" placeholder="Enter photo url" className="input outline-0 border-0 border-b-[1px] bg-transparent focus:outline-0 rounded-none w-full max-w-xs" {...register("photo", { required: true })} /><br></br>


                    {/* email */}
                   
                    <input type="email" placeholder="Enter your email" className="input outline-0 border-0 border-b-[1px] bg-transparent focus:outline-0 rounded-none w-full max-w-xs"  {...register("email", { required: true })} /><br></br>

                    {/* password */}
                   
                    <input type="password" placeholder="Enter your password" className="input outline-0 border-0 border-b-[1px] bg-transparent focus:outline-0 rounded-none w-full max-w-xs" {...register("password", {
                        required: true, minLength: {
                            value: 6,
                            message: "At least 6 character"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: "Must include at least 1 uppercase, 1 lowercase, and 1 number"
                        }
                    })} /><br></br>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <p className="text-sm">Already have an account?<Link className="text-blue-500" to='/login'>login</Link></p>
                    <div className="flex gap-5">

                        <button type="submit"  style={{boxShadow: "0px 0px 10px gray"}}
                    className="btn border-0 bg-[#f2f3f7] rounded-2xl">Submit</button>
                        <button onClick={handleGoggleLogin} className=" border-0 rounded-2xl">
                            <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className="w-7" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;