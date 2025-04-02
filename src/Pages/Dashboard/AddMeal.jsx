import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import useUser from "../../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hostuiin_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();
    const [users] = useUser();
    const {user} = useContext(AuthContext)

    const date = new Date().toISOString().split('T')[0];
    

    const onSubmit = async (data) => {
        const currentUser = users.find(u => u.email === user?.email);
        if(!currentUser || currentUser.role !== 'admin'){
              toast("You are not admin",{
                duration: 1000,
                style: {color:'black', fontSize:"20px"},
                icon: '❌'
            })
              return;
        }
        else{
            const imageFile = {
                image: data.image[0]
            }
            const res = await axiosPublic.post(image_hostuiin_api,imageFile,{
                headers: {
                    'content-Type' : 'multipart/form-data'
                }
            })
            if(res.data.success){
                const mealsItem = {
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    distributor: user.displayName,
                    email: user.email,
                    ingredients: data.ingredients.split(','),
                    price: parseFloat(data.price),
                    image: res.data.data.display_url,
                    post_time: date,
                    rating: 0,
                    like: 0,
                    reviewCount: 0,

                }
                const menuRes = await axiosPrivate.post('/meals',mealsItem)
                if(menuRes.data.insertedId){
                      toast('Successfully meal added',{
                        duration: 1000,
                        style: {color:'black', fontSize:"20px"},
                        icon: '✅'
                    })
                   
                      reset();
                }
            }
           
        }
        
    }
    return (
        <div className="min-h-screen">
            <Heading text={"Add meal"}></Heading>
            <div className="card mx-auto bg-white  max-w-sm shrink-0 shadow-2xl ">
                <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                         {...register("title", { required: true })} 
                         type="text" placeholder="enter meal title" className="input bg-white input-bordered" required />
                    </div>
                    {/* Category */}
                    <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select 
                        defaultValue={"default"}
                        {...register("category", { required: true })} 
                        className="select bg-white select-bordered w-full max-w-xs"
                        required
                    >
                        <option value="default" disabled>Choose a category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>

                    {/* image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        {/* <input
                           {...register("image", { required: true })} 
                         type="url" placeholder="enter image url" className="input input-bordered" required /> */}
                         <input
                           {...register("image", { required: true })}
                          type="file" className="file-input bg-white file-input-bordered w-full max-w-xs" />
                    </div>

                    {/* Ingredients */}
                    <label className="label">
                            <span className="label-text">Ingredients</span>
                    </label>
                    <textarea 
                     {...register("ingredients", { required: true })} 
                    className="textarea textarea-bordered bg-white" placeholder="Enter ingredients seperating by comma"></textarea>

                    {/* description */}
                    <label className="label">
                            <span className="label-text">Description</span>
                    </label>
                    <textarea
                     {...register("description", { required: true })} 
                     className="textarea textarea-bordered bg-white" placeholder="Enter description"></textarea>

                    {/* price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                         {...register("price", { required: true})} 
                         type="number" placeholder="enter price " className="input input-bordered bg-white" required />
                    </div>

                    

                    <div className="form-control mt-6">
                        <button className="btn prime_bg rounded-2xl text-white border-0">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;