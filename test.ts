interface Logger {
    log: (message: string) => void,
}

class test implements Logger {
    log = (message: string) => { console.log(message) }
}
const testObj = new test()

const logger: Logger = {
    log: (message: string) => {
        console.log(message);
    }
}