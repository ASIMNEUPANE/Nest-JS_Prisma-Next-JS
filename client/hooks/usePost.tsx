import API from "@/utils/API"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { boolean } from "zod"

// Get QueryClient from the context



const usePost = (qkey: string) => {
    const queryClient = useQueryClient()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const { mutate: postMutation, isError, isSuccess, data } = useMutation({

        mutationFn: async (payload: any) => {
            console.log(payload, 'payload')
            const { data } = await API.post(payload.urls, { ...payload.data });
            return data;



        },
        onError(error) {
            setSuccess(false)
            setError((error as any).response.data.message)
            setTimeout(() => {
                setError(false);
            }, 2000);
        },
        onSuccess: async () => {
            setSuccess(true)

            if (qkey != 'false')
                await queryClient.invalidateQueries({ queryKey: [qkey] });
        },

    })
    console.log(data)
    return { postMutation, isError, isSuccess, data, error, success }
}

export default usePost;



