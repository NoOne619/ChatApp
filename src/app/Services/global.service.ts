import { Injectable } from '@angular/core';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  sender:string='';
  items :any[]= [
    // { message: "Hello, my name is Abdullah Mehmood. Who are you?", person: 'client' },
    // { message: "I am a support agent.", person: 'agent' },
    // { message: "How can I help you today?", person: 'agent' },
    // { message: "I need some information about your services.", person: 'client' },
    // { message: "Sure, I can help with that. What do you need to know?", person: 'agent' },
    // { message: "Can you tell me about your pricing?", person: 'client' },
    // { message: "Our pricing varies based on the services you require.", person: 'agent' },
    // { message: "Can I get a detailed list?", person: 'client' },
    // { message: "Absolutely, I will send you a document with all the details.", person: 'agent' },
    // { message: "Thank you!", person: 'client' },
    // { message: "You're welcome! Is there anything else I can assist with?", person: 'agent' },
    // { message: "No, that's all for now. Thanks again.", person: 'client' },
    // { message: "Have a great day!", person: 'agent' }
  ];

  constructor(private data:DataService) { }
}
