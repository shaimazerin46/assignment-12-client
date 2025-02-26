import { useNavigate, useParams } from "react-router-dom";
import useMeals from "../../hooks/useMeals";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const UpdateMeal = () => {
    const { id } = useParams(); 
    const [meals,refetch] = useMeals();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosPrivate();
    const filteredMeal = meals.find(meal=>meal._id===id);
    const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hostuiin_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
// console.log("Image Hosting Key:", image_hosting_key);

    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        let imageUrl = filteredMeal?.image; 
    
        if (data.image && data.image.length > 0) { 
            const formData = new FormData();
            formData.append("image", data.image[0]);
    
          
                const res = await axiosPublic.post(image_hostuiin_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
    
                if (res.data.success) {
                    imageUrl = res.data.data.display_url; 
                } else {
                    Swal.fire({ icon: "error", title: "Image upload failed" });
                    return;
                }
            } 
        
    
     
        const menuItem = {
            title: data.title,
            category: data.category,
            description: data.description,
            ingredients: data.ingredients.split(','),
            price: parseInt(data.price),
        };
    
        
        if (imageUrl !== filteredMeal?.image) {
            menuItem.image = imageUrl;
        }
    
        try {
            const res = await axiosSecure.patch(`/meals/${id}`, menuItem);
    
            if (res.data.modifiedCount > 0) {
                Swal.fire({ icon: "success", title: "Successfully updated" });
                refetch();
                navigate('/dashboard/allMeals');
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: err.message });
        }
    };
    
    

    return (
        <div>
             <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    {/* title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                        defaultValue={filteredMeal?.title}
                         {...register("title")} 
                         type="text" placeholder="enter meal title" className="input input-bordered"  />
                    </div>
                    {/* Category */}
                    <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select 
                        defaultValue={filteredMeal?._category}
                        {...register("category")} 
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
                        <p>{filteredMeal?.image}</p>
                        <input
                        {...register('image')} type="file" className="file-input w-full my-6" />
                       
                       
                    </div>

                    {/* Ingredients */}
                    <label className="label">
                            <span className="label-text">Ingredients</span>
                    </label>
                    <textarea 
                     defaultValue={filteredMeal?.ingredients}
                     {...register("ingredients")} 
                    className="textarea textarea-bordered" placeholder="Enter ingredients seperating by comma"></textarea>

                    {/* description */}
                    <label className="label">
                            <span className="label-text">Description</span>
                    </label>
                    <textarea
                     defaultValue={filteredMeal?.description}
                     {...register("description")} 
                     className="textarea textarea-bordered" placeholder="Enter description"></textarea>

                    {/* price */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                         defaultValue={filteredMeal?.price}
                         {...register("price")} 
                         type="number" placeholder="enter price " className="input input-bordered" required />
                    </div>

                    {/* distributor */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Distributor name</span>
                        </label>
                        <input
                         defaultValue={filteredMeal?.distributor}
                         {...register("distributor")} 
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

export default UpdateMeal;