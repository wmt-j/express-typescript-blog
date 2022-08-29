export class CustomError {
    messages!: string[]
    status!: number

    constructor(messages: string[], status: number = 500) {
        this.messages = messages
        this.status = status
    }
}