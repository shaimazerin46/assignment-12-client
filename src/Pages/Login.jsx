import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const onSubmit = (data) => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        login(email,password)
        .then(res=>{
                    console.log(res.user);
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
    return (
        <div className="pt-50">
            <h3 className="text-center text-xl mb-20">Login</h3>
            <div className="mx-auto w-[400px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-20">
                 {/* email */}
                 <label>Email: </label><br></br>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"  {...register("email", {required: true})} /><br></br>

                    {/* password */}
                    <label>Password: </label><br></br>
                    <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"  {...register("password", {required: true})} /><br></br>
                    <p className="text-sm">Do not have an account?<Link className="text-blue-500" to='/register'>register</Link></p>

                    <button type="submit" className="btn bg-orange-400 text-white rounded-xl">Submit</button>
            </form>
            </div>

        </div>
    );
};

export default Login;