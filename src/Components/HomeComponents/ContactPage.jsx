import { AiOutlineSend } from "react-icons/ai";
import Heading from "../SmallComponents/Heading";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";





const ContactPage = () => {
    const {user} = useContext(AuthContext)
    
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        const mailInfo ={
            name: user.displayName,
            message: data.message
        }
        emailjs
        .send(
            "contact_service", 
            "template_qs4ecxz", 
            mailInfo,
            "Q0wGHAYPZtgl_MkzK" 
        )
        .then(
            () => {
                Swal.fire("Message sent!");
                reset(); 
            },
            (error) => {
                Swal.fire("Something wrong",error);
            }
        );
    }
    return (
        <div>

            <div className="md:w-[700px] md:mb-20 mb-5 shadow-2xl mx-auto  px-10 md:pb-20 pb-5">
               
                <div className="col-span-2">
                    <Heading text={"Get in touch"}></Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                         <textarea {...register('message')} 
                         className="textarea resize-none bg-white w-full border-b-[1px] border-0 focus:outline-none pl-5" placeholder="Enter your message"></textarea>
                         <button className="flex gap-1 items-center pt-3" type="submit">
                            <span>
                            <AiOutlineSend />
                            </span>
                            send</button>
                    </form>
                </div>
               
               
           
            </div>
          
        </div>
    );
};

export default ContactPage;