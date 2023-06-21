export default class ValidationError extends Error{
    private messageObject: Object;
    constructor(message: string, messageObject: Object){
        super(message);
        this.messageObject = messageObject;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}