import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
   const { signInWithGoogle } = useAuth();
   const navigate = useNavigate();
   const axiosPublic = useAxiosPublic();

   const handleGoogleLogin = async () => {
      await signInWithGoogle()
         .then(result => {
            if (result.user) {

               const postedUser = {
                  name: result?.user?.displayName,
                  email: result?.user?.email,
                  photo: result?.user?.photoURL,
                  role: 'general'
               }
               console.log(postedUser);

               axiosPublic.post(`/user?email=${result?.user?.email}`, postedUser).then(res => {
                  if (res.data.insertedId) {
                     toast.success('Sign in successful!')
                     navigate('/')
                     
                  }
               })
            }
            navigate('/')
            toast.success('Sign in successful!')

         })
         .catch(error => {
            if (error.message) {
               toast.error('Something went wrong!')
            }
         })
   }
   return (
      <div onClick={handleGoogleLogin} className="flex items-center justify-center space-x-2 bg-[#eeeded] p-2 cursor-pointer active:scale-[0.98] border rounded-lg">
         <FcGoogle className="text-3xl" />
         <span className="font-">Google</span>
      </div>
   );
};

export default GoogleLogin;