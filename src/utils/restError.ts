

interface restErrorDef {
    status: string
    message: string
};

export default function restError(message): restErrorDef {
    const errorDef: restErrorDef = { status: "error", message: message };
    return errorDef;
}


