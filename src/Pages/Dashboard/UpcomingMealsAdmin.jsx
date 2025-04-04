import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import Heading from "../../Components/SmallComponents/Heading";
import toast from "react-hot-toast";

const UpcomingMealsAdmin = () => {
  const [upcomingMeals, setUpcomungMeals] = useState();
  const [publishedMeals, setPublishedMeals] = useState([]);
  const [isModalOpen,setIsmodalOpen] = useState(false)
  const {user} = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const { register, handleSubmit, reset } = useForm();
  const date = new Date().toISOString().split('T')[0];

  const image_hosting_key = import.meta.env.VITE_IMAGE_KEY;
const image_hostuiin_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

  useEffect(() => {
    axiosPublic.get('/upcomingMeals')
      .then(res => {
        const sortedMeals = res.data.sort((a, b) => b.like - a.like);
        setUpcomungMeals(sortedMeals)
      })
  }, []);

  const onSubmit = async (data) => {
    const imageFile = {
      image: data.image[0]
  }
  const res = await axiosPublic.post(image_hostuiin_api,imageFile,{
      headers: {
          'content-Type' : 'multipart/form-data'
      }
  })
  if(res.data.success){
    const mealData = {
      title: data.title,
      image: res.data.data.display_url,
      rating: data.rating,
      category: data.category,
      price: data.price,
      distributor: user.displayName,
      description: data.description,
      ingredients: data.ingredients,
      post_time: date,
      like: 0
    }
    axiosPrivate.post('/upcomingMeals',mealData)
    .then(res=>{
      // console.log(res)
      if(res.data.insertedId){
       
        toast('Upcoming meal successfully added',{
          duration: 1000,
          style: {color:'black', fontSize:"20px"},
          icon: '✅'
      })
        reset();
        
      }
    })
  }
    
  }

  const handleAddMeal = () =>{
    setIsmodalOpen(true)
  }

  const handleCloseModal = ()=>{
    setIsmodalOpen(false)
  }

  const handlePublish = (id) => {
    const filteredMeal = upcomingMeals?.find(upcomingMeal => upcomingMeal._id === id)
    const mealItem = {
      category: filteredMeal?.category,
      description: filteredMeal?.description,
      distributor: filteredMeal?.distributor,
      image: filteredMeal?.image,
      ingredients: filteredMeal?.ingredients,
      like: filteredMeal?.like,
      post_time: filteredMeal?.post_time,
      price: filteredMeal?.price,
      rating: filteredMeal?.rating,
      title: filteredMeal?.title

    }
    axiosPrivate.post('/meals', mealItem)
      .then(res => {
        // console.log(res.data)
        if (res.data.insertedId) {
          toast('Meal published!',{
            duration: 1000,
            style: {color:'black', fontSize:"20px"},
            icon: '✅'
        })
          setPublishedMeals(prevState => [...prevState, id]);
        }
      })
  }
  return (
    <div className="min-h-screen">
    <Heading text={"Upcoming meals"}></Heading>

      <div className="overflow-x-auto">
        <table className="table bg-white">
          {/* head */}
          <thead>
            <tr className="text-black bg-white">
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Like</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              upcomingMeals?.map((upcomingMeal, idx) => <tr key={upcomingMeal._id} className="bg-white">
                <th>{idx + 1}</th>
                <td>{upcomingMeal?.title}</td>
                <td>{upcomingMeal?.price}</td>
                <td>{upcomingMeal?.category}</td>
                <td>{upcomingMeal?.like}</td>
                <td>
                  <button
                    onClick={() => handlePublish(upcomingMeal._id)}
                    className="btn button-bg text-white"
                    disabled={publishedMeals.includes(upcomingMeal._id)}
                  >
                    {publishedMeals.includes(upcomingMeal._id) ? "Published" : "Publish"}
                  </button>
                </td>
              </tr>)
            }


          </tbody>
        </table>
      </div>

      {/* add upcoming meal */}
      <button onClick={handleAddMeal} className="btn mt-5 button-bg text-white border-0">Add upcomming meal</button>

      {/* modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] ">
      <h2 className="text-lg font-semibold mb-4 text-center">Add Upcoming Meal</h2>

      <div className="card mx-auto w-full shrink-0 ">
        <form className="card-body max-h-[60vh]  overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter meal title"
              className="input bg-white input-bordered"
              required
            />
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

          {/* Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input bg-white file-input-bordered w-full max-w-xs"
            />
          </div>

          {/* Ingredients */}
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <textarea
            {...register("ingredients", { required: true })}
            className="textarea bg-white textarea-bordered"
            placeholder="Enter ingredients separated by commas"
          ></textarea>

          {/* Description */}
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea bg-white textarea-bordered"
            placeholder="Enter description"
          ></textarea>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Enter price"
              className="input bg-white input-bordered"
              required
            />
          </div>

          
          {/* Submit Button */}
          <div className="form-control mt-4">
            <button className="btnrounded-2xl text-white">Submit</button>
          </div>
        </form>
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-4 pb-2">
        <button onClick={handleCloseModal} className="btn bg-white btn-outline">Close</button>
      </div>
    </div>
  </div>
)}

</div>
)};

export default UpcomingMealsAdmin;