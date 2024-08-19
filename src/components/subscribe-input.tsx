import { ApiErrorResponse } from "@/pkg/api/response";
import { BlogstrapsApi } from "@/repositories/blogstraps-api";
import { useState } from "react";
import { Button, Input, Join, Loading } from "react-daisyui";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SubscribeInput = () => {
    const [submitting, set_submitting] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, resetField } = useForm<{email: string}>({ mode: 'all' });
    const onSubmitHandler = async (data: {email: string}) => {
      try {
        set_submitting(true);
        await BlogstrapsApi.SubscribeComingSoon(data.email)
        toast.success("Successfully join the waiting list. We will notify you the updates");
        resetField("email")
      } catch (error) {
        if (error as ApiErrorResponse) {
          const err_api=(error as ApiErrorResponse)
          toast.error(err_api.message);
        } else {
            console.log("Unknown error:", error);
            toast.error("Internal Error");
        }
      } finally {
        set_submitting(false)
      }
    };
  
    return <>
    <form key="subscribe-form" onSubmit={handleSubmit(onSubmitHandler)} >
      <Join className="mb-2">
        <Input {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })} type="email" inputMode="email" className="join-item" placeholder="Email Address" required />
        <Button type="submit" className="join-item" color="accent" disabled={submitting}>Notify Me {submitting && <Loading />}</Button>
      </Join>
    </form>
    </>
}

export default SubscribeInput