
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";




const Register = () => {
   const {createUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const email = data.email;
        const password = data.password
        createUser(email,password)
        .then(res=>{
            console.log(res.user)
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              });
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
            <h3 className="text-center text-xl mb-20">Registration</h3>
            <div className="mx-auto w-[400px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-20">

                    {/* name */}
                    <label>Name: </label><br></br>
                    <input type="text" placeholder="Enter your name" className="input input-bordered w-full max-w-xs"  {...register("name", {required: true})} /><br></br>

                    {/* photo */}

                    <label>Photo url: </label><br></br>
                    <input type="url" placeholder="Enter photo url" className="input input-bordered w-full max-w-xs"  {...register("photo", {required: true})} /><br></br>


                    {/* email */}
                    <label>Email: </label><br></br>
                    <input type="email" placeholder="Enter your email" className="input input-bordered w-full max-w-xs"  {...register("email", {required: true})} /><br></br>

                    {/* password */}
                    <label>Password: </label><br></br>
                    <input type="password" placeholder="Enter your password" className="input input-bordered w-full max-w-xs"  {...register("password", {required: true, minLength: {
                        value: 6,
                        message: "At least 6 character"
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        message: "Must include at least 1 uppercase, 1 lowercase, and 1 number"
                    }
                    })} /><br></br>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <button type="submit" className="btn bg-orange-400 text-white rounded-xl">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;