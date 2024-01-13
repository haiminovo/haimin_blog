import siteData from "@/data/siteData"

export const loginApi =async (params:any)=>{
    const res=await fetch(siteData.serverURL+'/admin/login',{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(params),
    }) 
    return res;
}