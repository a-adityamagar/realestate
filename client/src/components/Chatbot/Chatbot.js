import React,{useEffect,useState} from 'react'; 
import axios from 'axios'; 

function Chatbot() { 
   const [messages,setMessages]=useState([]); 
   const [inputValue,setInputValue]=useState('');

   useEffect(()=>{ fetchMessages(); },[]);

   const fetchMessages=async()=>{ 
       try{ 
           const response=await axios.get('http://localhost:5000/api/chat'); 
           setMessages(response.data); 
       }catch(error){ console.error("Error fetching messages!",error); }
   };

   const sendMessageHandler=async()=>{ 
       if(!inputValue.trim()) return; 

       await axios.post('http://localhost:5000/api/chat',{ userId:'user123',message:inputValue }); 

       setInputValue('');
       fetchMessages(); // Refresh messages after sending one.
   };

   return (
       <div> 
           <div className="chat-window"> 
               <div className="chat-messages"> 
                   {messages.map((msg)=>(<div key={msg._id}>{msg.message}</div>))}
               </div> 
               <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Type your message..." /> 
               <button onClick={sendMessageHandler}>Send</button> 
           </div> 
       </div> 
   ); 
}

export default Chatbot;