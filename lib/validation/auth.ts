import z from "zod";


export const registerSchema = z.object({
    name:z.string().min(2,'نام باید حداقل 2 کاراکتر باشد'),
    email : z.email('ایمیل معتبر نیست'),
    password : z.string().min(6,'رمز عبور باید حداقل 6 کاراکتر باشد')
})

export type RegisterFormData = z.infer<typeof registerSchema>