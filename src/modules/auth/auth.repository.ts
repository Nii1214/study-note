import { supabase } from "@/lib/supabase";

export const authRepository = {
    async signup(name: string, email: string, password: string) {
        //Userをsupabaseに登録
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name }},
        });
        //「エラーが返ってきた」または「ユーザー情報が取れなかった」なら異常として扱う
        if (error != null || data.user == null) throw new Error (error?.message);
        return {
            ...data.user,
            userName: data.user.user_metadata.name,
        }
    },
}

