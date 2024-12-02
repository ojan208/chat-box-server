export interface Response {
    status: number, 
    message: string,
    error: boolean,
    data?: any
}

export const ResponseSuccess = (
    data?: any, 
    message: string = "Success", 
    code: number = 200
) => {
    const response: Response = {
        status: code,
        error: false,
        message: message,
    }

    if (data) {
        response.data = data
    }

    return response
}

export const ResponseError = (error: any, code: number = 500) => {
    const response: Response = {
        status: code,
        error: true,
        message: error.message || error
    }

    return response;
}