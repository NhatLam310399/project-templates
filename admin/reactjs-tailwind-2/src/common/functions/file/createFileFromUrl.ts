export async function createFile(url: string) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
        type: "image/jpeg",
    };
    let file = new File([data], "new image", metadata);
    return { file };
}
