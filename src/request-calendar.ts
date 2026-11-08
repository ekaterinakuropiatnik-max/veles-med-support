export function todayInVienna(now = new Date()): string {
 const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
 return ['year','month','day'].map(t=>p.find(v=>v.type===t)!.value).join('-');
}
export function dateKey(year: number, month: number, day: number) { return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`; }
export function monthCells(year:number,month:number){ return {offset:(new Date(year,month,1).getDay()+6)%7,days:new Date(year,month+1,0).getDate()}; }
export function dateLabel(value:string){ return new Intl.DateTimeFormat('de-AT',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(value+'T12:00:00')); }
export function toggleDay(days:string[],day:string,today:string){ if(day<today)return days; return days.includes(day)?days.filter(d=>d!==day):[...days,day].sort(); }
export function validPhone(value:string){ return /^[+\d\s()\-]{7,30}$/.test(value)&&value.replace(/\D/g,'').length>=7; }
