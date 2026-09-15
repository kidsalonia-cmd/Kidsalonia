import type { BlogPost } from "@/data/blogs";
import firstHaircutImage from "@/assets/first-haircut-tips-blog.jpg";
import nailImage from "@/assets/kids-nail-art-blog.jpg";
import hairImage from "@/assets/summer-haircuts-blog.jpg";
import careImage from "@/assets/lice-treatment-kids-blog.jpg";

const DAY=86400000;
const START=new Date("2026-09-16T00:00:00+05:30");
const locations=["Sector 67, Gurugram","Sector 68, Gurugram","Golf Course Extension Road, Gurugram","Sohna Road, Gurugram","Airia Mall & JMD Suburbio 2, Gurugram","Badshahpur, Gurugram"];
const topics=[
 {service:"Kids Haircut",category:"Hair Care",image:hairImage,path:"/kids-haircut-gurgaon",angle:"comfortable boys and girls haircuts, styling choices and simple maintenance tips"},
 {service:"Baby First Haircut",category:"First Haircut",image:firstHaircutImage,path:"/book",angle:"how parents can prepare babies and toddlers for a calm first salon visit"},
 {service:"Mundan Ceremony",category:"Mundan",image:firstHaircutImage,path:"/mundan-gurgaon",angle:"planning a hygienic, comfortable Mundan experience and what parents should carry"},
 {service:"Kids Nail Art",category:"Nail Care",image:nailImage,path:"/nail-art-gurgaon",angle:"age-appropriate nail colours, fun designs and nail-care habits"},
 {service:"Manicure & Pedicure",category:"Nail Care",image:nailImage,path:"/nail-art-gurgaon",angle:"clean nail care, trimming, moisturising and salon hygiene for kids and families"},
 {service:"Lice Treatment",category:"Hair Care",image:careImage,path:"/hair",angle:"signs parents notice, gentle salon care and ways to reduce reinfestation"},
 {service:"Hair Spa & Hair Care",category:"Hair Care",image:hairImage,path:"/hair",angle:"dryness, tangles and practical hair-care routines for Gurugram weather"},
 {service:"Party Hair Styling",category:"Styling",image:hairImage,path:"/hair",angle:"easy party-ready hairstyles for birthdays, school functions and family events"},
];
const pad=(n:number)=>String(n).padStart(2,"0");
const dateLabel=(d:Date)=>d.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"Asia/Kolkata"});
const slugDate=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

export function getDailyLocalInsights(now=new Date()):BlogPost[]{
 const days=Math.max(0,Math.floor((now.getTime()-START.getTime())/DAY));
 return Array.from({length:days+1},(_,i)=>{
   const d=new Date(START.getTime()+i*DAY); const topic=topics[i%topics.length]; const location=locations[Math.floor(i/topics.length)%locations.length];
   const title=`${topic.service} in ${location}: Parent Guide`;
   return {slug:`daily-${topic.service.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}-${slugDate(d)}`,image:topic.image,date:dateLabel(d),title,excerpt:`Today's KidSalonia local guide covers ${topic.angle} for families around ${location}.`,author:"KidSalonia Editorial Team",category:topic.category,readTime:"4 min read",content:`Families searching for **${topic.service.toLowerCase()} in ${location}** usually want three things: a child-friendly experience, clear hygiene standards and a service that suits their child's age and comfort level. KidSalonia at A-19, Ground Floor, JMD Suburbio 2, Sector 67, Gurugram focuses on exactly that.\n\n## Today's ${topic.service} guide\n\nThis guide focuses on ${topic.angle}. Every child is different, so our team adjusts the experience rather than rushing through a fixed routine.\n\n## What parents can do before the visit\n\n- Choose a time when your child is rested and comfortable.\n- Tell the stylist about sensitivities, previous experiences or the look you want.\n- Bring a favourite small toy or show for younger children if it helps them settle.\n- Ask questions about after-care before leaving the salon.\n\n## Visiting KidSalonia from ${location}\n\nKidSalonia is located at **A-19, Ground Floor, JMD Suburbio 2, Sector 67, Gurugram**, close to Airia Mall. We serve families from Sector 67 and surrounding Gurugram neighbourhoods.\n\n## Book ${topic.service}\n\nExplore the [related KidSalonia service](${topic.path}) or [book an appointment](/book). Call **+91 8130307036** or **+91 9773864949** for availability.\n\n*This daily local guide is informational. Service suitability and final pricing can vary by the selected service and individual requirements.*`};
 }).reverse();
}
