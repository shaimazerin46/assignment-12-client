import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hostuiin_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddMeal = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const date = new Date().toISOString().split('T')[0];
    

    const onSubmit = async (data) => {
        console.log(data);
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
                distributor: data.distributor,
                ingredients: data.ingredients.split(','),
                price: parseInt(data.price),
                image: res.data.data.display_url,
                post_time: date,
                rating: 0,
                like: 0,
                reviewCount: 0
            }
            const menuRes = await axiosPrivate.post('/meals',mealsItem)
            if(menuRes.data.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "Succesfully meal added",
                    icon: "success"
                  });
            }
        }
        
    }
    return (
        <div>
            <h3 className='py-10 text-center text-xl'>Add meal</h3>
            <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                         {...register("title", { required: true })} 
                         type="text" placeholder="enter meal title" className="input input-bordered" required />
                    </div>
                    {/* Category */}
                    <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select 
                        defaultValue={"default"}
                        {...register("category", { required: true })} 
                        className="select select-bordered w-full max-w-xs"
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
                          type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>

                    {/* Ingredients */}
                    <label className="label">
                            <span className="label-text">Ingredients</span>
                    </label>
                    <textarea 
                     {...register("ingredients", { required: true })} 
                    className="textarea textarea-bordered" placeholder="Enter ingredients seperating by comma"></textarea>

                    {/* description */}
                    <label className="label">
                            <span className="label-text">Description</span>
                    </label>
                    <textarea
                     {...register("description", { required: true })} 
                     className="textarea textarea-bordered" placeholder="Enter description"></textarea>

                    {/* price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                         {...register("price", { required: true})} 
                         type="number" placeholder="enter price " className="input input-bordered" required />
                    </div>

                    {/* distributor */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Distributor name</span>
                        </label>
                        <input
                         {...register("distributor", { required: true})} 
                         type="text" placeholder="enter distributor name" className="input input-bordered" required />
                    </div>


                    <div className="form-control mt-6">
                        <button className="btn bg-orange-400 rounded-2xl text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;