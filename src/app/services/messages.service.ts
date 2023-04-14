import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(public primengMessageService: MessageService) { }

    public showMessage(message: string, type: 'warn' | 'error' | 'success', sticky: boolean = false, header: string = '') {
        this.primengMessageService.add({ severity: type, summary: header, detail: message, sticky: sticky });
    }


}
