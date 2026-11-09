export type PortalUser={username:string;role:'admin'|'customer';displayName:string};
export type Staff={code:string;qualification:string;display_order:number};
export type DayAvailability={state:'frei'|'besetzt';windows:{startMin:number;endMin:number}[]};
export type RequestedSlot={day:string;startMin:number;endMin:number};

const siteOrigin='https://veles-med-design.ekaterinakuropiatnik.chatgpt.site';
export const portalOrigin=()=>typeof window!=='undefined'&&window.location.hostname.endsWith('github.io')?siteOrigin:'';

export async function portalGet<T>(view:string,token:string,params:Record<string,string>={}):Promise<T>{
 const query=new URLSearchParams({view,...params});
 const response=await fetch(`${portalOrigin()}/api/portal?${query}`,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
 const data=await response.json() as T&{error?:string};
 if(!response.ok)throw new Error(data.error||'Der Dienst ist zurzeit nicht erreichbar.');
 return data;
}

export async function portalPost<T>(action:string,payload:Record<string,unknown>,token=''):Promise<T>{
 const response=await fetch(`${portalOrigin()}/api/portal`,{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},body:JSON.stringify({action,...payload})});
 const data=await response.json() as T&{error?:string};
 if(!response.ok)throw new Error(data.error||'Der Dienst ist zurzeit nicht erreichbar.');
 return data;
}
