import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Heading from "../Components/SmallComponents/Heading";

const Login = () => {
    const { register, handleSubmit} = useForm();
    const {login,googleSignin,updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPrivate = useAxiosPrivate()

    const onSubmit = (data) => {
        // console.log(data);
        const email = data.email;
        const password = data.password;
        login(email,password)
        .then(()=>{
                   
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully logged in!",
                        icon: "success"
                      });
                    navigate(from, {replace: true})
                })
                .catch(err=>{
                    Swal.fire({
                        title: "Registration failed",
                        text: (err.message),
                        icon: "error"
                      });
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
                        // console.log(res.data);
                        Swal.fire({
                            title: "Good job!",
                            text: "Successfully logged in!",
                            icon: "success"
                        });
                        navigate(from, {replace: true})
                })
    
                })
            })
            
        }
    return (
        <div className="mt-30 md:min-h-screen">
           <Heading text={"Login"}></Heading>
            <div className="mx-auto w-[400px] shadow-xl p-5 md:mb-20 mb-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
                 {/* email */}
                 <label>Email: </label><br></br>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"  {...register("email", {required: true})} /><br></br>

                    {/* password */}
                    <label>Password: </label><br></br>
                    <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"  {...register("password", {required: true})} /><br></br>
                    <p className="text-sm">Do not have an account?<Link className="text-blue-500" to='/register'>register</Link></p>

                   <div className="flex gap-5">
                   <button type="submit" className="btn prime_bg text-white rounded-2xl">Submit</button>
                   <button onClick={handleGoggleLogin} className=" rounded-2xl">
                        <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className="w-7"/>
                   </button>
                   </div>
            </form>
            </div>

        </div>
    );
};

export default Login;