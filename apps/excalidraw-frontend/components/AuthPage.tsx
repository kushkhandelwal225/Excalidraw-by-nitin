"use client"

export function AuthPage({isSignin}: {
    isSignin : boolean 
}){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-4 m-2 bg-white rounded flex flex-col gap-2">
                <span className="text-black ">Email</span>
                <input type="text" placeholder="Email" className="border-2 border-black p-2 "/>
                <span className="text-black">password </span>
                <input type="password" placeholder="password" className="border-2 border-black  p-2" />
                <button className="border-2 boredr-black text-black mt-4">
                    {isSignin ? "Sign in" : "Sign up"}
                </button>
            </div>
        </div>
    )
}