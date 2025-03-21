
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Heading from "../Components/SmallComponents/Heading";




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
                                // console.log(res.data);
                                Swal.fire({
                                    title: "Good job!",
                                    text: "Successfully registered!",
                                    icon: "success"
                                });
                                reset();
                                navigate(from, {replace: true})
                            })
                            .catch(err => {
                              
                                Swal.fire({
                                    icon: "error",
                                   
                                    text: (err.message),
                                    
                                  });
                            })

                    })

            })
            .catch(err => {
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
                        text: "Successfully registered!",
                        icon: "success"
                    });
                    navigate(from, {replace: true})
            })

            })
        })
        
    }
    return (
        <div className="pt-30">
            <div>
                <Heading text={"Register"}
                >

                </Heading>
            </div>
            <div className="mx-auto w-[400px] shadow-xl ">
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-3 md:mb-20 mb-5">

                    {/* name */}
                    <label>Name: </label><br></br>
                    <input type="text" placeholder="Enter your name" className="input input-bordered w-full max-w-xs"  {...register("name", { required: true })} /><br></br>

                    {/* photo */}

                    <label>Photo url: </label><br></br>
                    <input type="url" placeholder="Enter photo url" className="input input-bordered w-full max-w-xs"  {...register("photo", { required: true })} /><br></br>


                    {/* email */}
                    <label>Email: </label><br></br>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"  {...register("email", { required: true })} /><br></br>

                    {/* password */}
                    <label>Password: </label><br></br>
                    <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"  {...register("password", {
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

                        <button type="submit" className="btn prime_bg text-white rounded-xl">Submit</button>
                        <button onClick={handleGoggleLogin} className=" rounded-2xl">
                            <img src="https://img.icons8.com/?size=48&id=17949&format=png" alt="" className="w-7" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;